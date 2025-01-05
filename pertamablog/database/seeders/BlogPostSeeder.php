<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run()
    {
        // Create Blog Posts with meaningful titles and content
        BlogPost::create([
            'user_id' => 1,  // Admin User
            'title' => 'Welcome to Pertama Blog!',
            'content' => 'This is our first post to welcome you to the Pertama Blog platform. We are excited to have you here!',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 2,  // Editor User
            'title' => '5 Tips to Boost Your Productivity',
            'content' => 'Looking to get more done in less time? Here are 5 tips to help you boost your productivity and achieve your goals!',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 2,  // Editor User
            'title' => 'The Future of Web Development',
            'content' => 'Explore the latest trends and technologies shaping the future of web development. Stay ahead of the curve!',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 3,  // Editor User
            'title' => 'Healthy Eating Habits',
            'content' => 'Discover the importance of healthy eating habits and how to incorporate them into your daily life.',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 4,  // Reader User
            'title' => 'Travel Destinations for 2025',
            'content' => 'Looking to travel in 2025? Check out these must-visit travel destinations for an unforgettable experience.',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 5,  // Reader User
            'title' => 'Why Mental Health Matters',
            'content' => 'Mental health is just as important as physical health. Learn more about how to take care of your mental well-being.',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 1,  // Admin User
            'title' => 'How to Start a Blog',
            'content' => 'Ever thought of starting a blog? Here is a step-by-step guide to help you start your blogging journey.',
            'status' => 'published',
        ]);

        BlogPost::create([
            'user_id' => 2,  // Editor User
            'title' => 'Top 10 Programming Languages in 2025',
            'content' => 'Wondering which programming languages to learn in 2025? Here are the top 10 languages to keep an eye on.',
            'status' => 'draft',
        ]);

        BlogPost::create([
            'user_id' => 3,  // Editor User
            'title' => 'Fitness Tips for Busy Professionals',
            'content' => 'Find out how to stay fit and healthy, even with a busy schedule. These tips will keep you on track!',
            'status' => 'draft',
        ]);

        BlogPost::create([
            'user_id' => 4,  // Reader User
            'title' => 'Exploring Space: The Final Frontier',
            'content' => 'The world of space exploration is expanding rapidly. Let’s take a look at what’s next in space exploration.',
            'status' => 'published',
        ]);
    }
}
