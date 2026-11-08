<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

/**
 * Sample Blog posts (posts.type = 4) matching the Blog page design.
 * Safe to run more than once: it skips when sample blogs already exist.
 *
 *   php artisan db:seed --class=BlogSeeder
 */
class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $title = 'The Healthy Foodie Restaurant';
        $short = 'Explore the latest insights on hospitality, tourism, lifestyle, and investment opportunities.';

        if (Post::where('type', 4)->where('name', $title)->where('status', '<>', 'temp')->exists()) {
            $this->command?->info('Sample blogs already exist – skipped.');
            return;
        }

        // Poster images (same ones used by the News & Events posts), in screenshot order.
        $images = [
            'medies/Apr_2025/1745752395.680e114b20473.jpg', // family / safe future
            'medies/Apr_2025/1745751503.680e0dcf076a8.jpg', // trusted investment
            'medies/Apr_2025/1745752123.680e103b771c3.jpg', // annual profit
        ];

        $folder = 'medies/' . Carbon::now()->format('M_Y');
        File::ensureDirectoryExists(public_path($folder));

        $authorId = \App\Models\User::where('admin', 1)->value('id');
        $now = Carbon::now();

        for ($i = 0; $i < 6; $i++) {
            $source = $images[$i % 3];

            $post = new Post();
            $post->type = 4;
            $post->name = $title;
            $post->short_description = $short;
            $post->description = '<p>' . $short . ' Stay informed with expert perspectives, industry trends, and updates from Defender Hotels &amp; Resorts.</p>';
            $post->status = 'active';
            $post->fetured = 0;
            $post->addedby_id = $authorId;
            $post->editedby_id = $authorId;
            // Newest first on the page, so the first card gets the latest time.
            $post->created_at = $now->copy()->subMinutes($i);
            $post->save();

            // Unique slug across News & Events (1) and Blog (4) posts
            $slug = Str::slug($title) . '-' . $post->id;
            while (Post::whereIn('type', [1, 4])->where('slug', $slug)->where('id', '<>', $post->id)->exists()) {
                $slug .= '-b';
            }
            $post->slug = $slug;
            $post->save();

            // Each blog gets its own copy of the image, so deleting a blog
            // never removes the file used by a News & Events post.
            if (File::exists(public_path($source))) {
                $ext = pathinfo($source, PATHINFO_EXTENSION);
                $rename = time() . '.' . uniqid() . '.' . $ext;
                $target = $folder . '/' . $rename;
                File::copy(public_path($source), public_path($target));

                $media = new Media();
                $media->src_id = $post->id;
                $media->src_type = 1;
                $media->use_Of_file = 1;
                $media->file_name = basename($source);
                $media->file_rename = $rename;
                $media->alt_text = $title;
                $media->file_url = $target;
                $media->file_size = (string) File::size(public_path($target));
                $media->file_type = 1;
                $media->file_path = $folder;
                $media->mine_type = 'image/' . ($ext === 'jpg' ? 'jpeg' : $ext);
                $media->addedby_id = $authorId;
                $media->save();
            }

            $this->command?->info("Blog #{$post->id} created ({$post->slug})");
        }
    }
}
