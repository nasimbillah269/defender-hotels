<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

/**
 * Ownership packages for the "Category of Ownership" dropdown on the Invest Now form
 * (posts.type = 6, kept separate from the Services / type 3 pages).
 *   name              → package name
 *   short_description → label shown in the dropdown
 *   share_price       → price per ownership in BDT (Villa/Suite: starting price)
 *   share_quantity    → ownership available
 *   view              → display order
 *
 * Safe to run more than once: updates packages by slug.
 *   php artisan db:seed --class=OwnershipPackageSeeder
 */
class OwnershipPackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            ['name' => 'Prime',       'category' => 'Entry-Level Ownership',  'units' => '1 Unit',        'available' => 2000, 'price' => 500000,   'price_label' => '500,000'],
            ['name' => 'Prestige',    'category' => 'Mid-Level Ownership',    'units' => '3 Units',       'available' => 500,  'price' => 1500000,  'price_label' => '1,500,000'],
            ['name' => 'Elite',       'category' => 'High-End Ownership',     'units' => '5 Units',       'available' => 500,  'price' => 2500000,  'price_label' => '2,500,000'],
            ['name' => 'Royal',       'category' => 'Luxury Ownership',       'units' => '10 Units',      'available' => 400,  'price' => 5000000,  'price_label' => '5,000,000'],
            ['name' => 'Signature',   'category' => 'Boutique Ownership',     'units' => '20 Units',      'available' => 400,  'price' => 10000000, 'price_label' => '10,000,000'],
            ['name' => 'Villa/Suite', 'category' => 'Villa/Suite Ownership',  'units' => '73–411 Units',  'available' => 200,  'price' => 36500000, 'price_label' => '36,500,000–205,500,000'],
        ];

        $authorId = User::where('admin', 1)->value('id');

        foreach ($packages as $i => $p) {
            $slug = 'ownership-' . \Str::slug($p['name']);
            $post = Post::where('type', 6)->where('slug', $slug)->first() ?? new Post();

            $post->type              = 6;
            $post->slug              = $slug;
            $post->name              = $p['name'];
            $post->short_description = "{$p['name']} ({$p['category']}) — {$p['units']} — BDT {$p['price_label']}";
            $post->share_price       = $p['price'];
            $post->share_quantity    = $p['available'];
            $post->view              = $i + 1;
            $post->status            = 'active';
            $post->addedby_id        = $post->addedby_id ?: $authorId;
            $post->editedby_id       = $authorId;
            if (!$post->exists) {
                $post->created_at = Carbon::now()->subMinute();
            }
            $post->save();

            $this->command?->info("#{$post->id} {$post->short_description}");
        }
    }
}
