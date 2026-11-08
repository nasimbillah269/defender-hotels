<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

/**
 * Sample Videos (posts.type = 5) for the /videos page.
 * Replace the links with YouTube links from Admin > Videos.
 * Safe to run more than once: skips when videos already exist.
 *
 *   php artisan db:seed --class=VideoSeeder
 */
class VideoSeeder extends Seeder
{
    public function run(): void
    {
        if (Post::where('type', 5)->where('status', '<>', 'temp')->exists()) {
            $this->command?->info('Videos already exist – skipped.');
            return;
        }

        $samples = [
            ['title' => 'Bella Maris — Where Luxury Meets Timeless Value', 'url' => '/images/Videos/DHRL%20Video%201.mp4', 'thumb' => 'images/new/design/video-thumb-1.png'],
            ['title' => "Bella Maris — Inani, Cox's Bazar",               'url' => '/images/Videos/DHRL%20Video%202.mp4', 'thumb' => 'images/new/design/video-thumb-2.png'],
        ];

        $folder = 'medies/' . Carbon::now()->format('M_Y');
        File::ensureDirectoryExists(public_path($folder));
        $authorId = User::where('admin', 1)->value('id');

        for ($i = 0; $i < 8; $i++) {
            $s = $samples[$i % 2];

            $video = new Post();
            $video->type = 5;
            $video->name = $s['title'];
            $video->search_key = $s['url'];
            $video->view = $i + 1; // display order
            $video->status = 'active';
            $video->addedby_id = $authorId;
            $video->editedby_id = $authorId;
            $video->created_at = Carbon::now();
            $video->save();
            $video->slug = 'video-' . $video->id;
            $video->save();

            // Own copy of the thumbnail (deleting a video removes only its copy)
            if (File::exists(public_path($s['thumb']))) {
                $ext = pathinfo($s['thumb'], PATHINFO_EXTENSION);
                $rename = time() . '.' . uniqid() . '.' . $ext;
                $target = $folder . '/' . $rename;
                File::copy(public_path($s['thumb']), public_path($target));

                $media = new Media();
                $media->src_id = $video->id;
                $media->src_type = 1;
                $media->use_Of_file = 1;
                $media->file_name = basename($s['thumb']);
                $media->file_rename = $rename;
                $media->alt_text = $s['title'];
                $media->file_url = $target;
                $media->file_size = (string) File::size(public_path($target));
                $media->file_type = 1;
                $media->file_path = $folder;
                $media->mine_type = 'image/' . $ext;
                $media->addedby_id = $authorId;
                $media->save();
            }

            $this->command?->info("Video #{$video->id} created");
        }
    }
}
