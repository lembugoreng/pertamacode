<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'post_id' => BlogPost::inRandomOrder()->first()->id ?? BlogPost::factory(),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'comment_text' => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
