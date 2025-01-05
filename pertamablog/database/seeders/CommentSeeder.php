<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // Comments for Post ID 1: Welcome to Pertama Blog!
        Comment::create([
            'post_id' => 1,
            'user_id' => 4,
            'comment_text' => 'This is a great initiative! Looking forward to more posts.',
        ]);

        Comment::create([
            'post_id' => 1,
            'user_id' => 5,
            'comment_text' => 'Thank you for starting this blog. I’m excited to be part of this community.',
        ]);

        // Comments for Post ID 2: 5 Tips to Boost Your Productivity
        Comment::create([
            'post_id' => 2,
            'user_id' => 6,
            'comment_text' => 'I’ve been looking for ways to improve my productivity. These tips are helpful!',
        ]);

        Comment::create([
            'post_id' => 2,
            'user_id' => 3,
            'comment_text' => 'Great post! I’ll definitely try some of these tips.',
        ]);

        // Comments for Post ID 3: The Future of Web Development
        Comment::create([
            'post_id' => 3,
            'user_id' => 4,
            'comment_text' => 'Web development is changing rapidly. This post provides some good insights.',
        ]);

        // Comments for Post ID 4: Healthy Eating Habits
        Comment::create([
            'post_id' => 4,
            'user_id' => 5,
            'comment_text' => 'I’m trying to eat healthier, and this post gave me some good ideas. Thanks!',
        ]);

        // Comments for Post ID 5: Travel Destinations for 2025
        Comment::create([
            'post_id' => 5,
            'user_id' => 6,
            'comment_text' => 'I love traveling! Adding these destinations to my bucket list.',
        ]);

        // Comments for Post ID 6: Why Mental Health Matters
        Comment::create([
            'post_id' => 6,
            'user_id' => 3,
            'comment_text' => 'Mental health is such an important topic. Thanks for sharing this post.',
        ]);

        // Comments for Post ID 7: How to Start a Blog
        Comment::create([
            'post_id' => 7,
            'user_id' => 2,
            'comment_text' => 'This guide is very helpful. I’m planning to start my own blog soon.',
        ]);
    }
}
