<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create Admin Users
        User::create([
            'name' => 'Alice Johnson',
            'email' => 'alice.johnson@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Michael Smith',
            'email' => 'michael.smith@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create Editor Users
        User::create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password'),
            'role' => 'editor',
        ]);

        User::create([
            'name' => 'Jane White',
            'email' => 'jane.white@example.com',
            'password' => Hash::make('password'),
            'role' => 'editor',
        ]);

        User::create([
            'name' => 'Chris Brown',
            'email' => 'chris.brown@example.com',
            'password' => Hash::make('password'),
            'role' => 'editor',
        ]);

        // Create Reader Users
        User::create([
            'name' => 'Emma Watson',
            'email' => 'emma.watson@example.com',
            'password' => Hash::make('password'),
            'role' => 'reader',
        ]);

        User::create([
            'name' => 'Oliver Davis',
            'email' => 'oliver.davis@example.com',
            'password' => Hash::make('password'),
            'role' => 'reader',
        ]);

        User::create([
            'name' => 'Sophia Wilson',
            'email' => 'sophia.wilson@example.com',
            'password' => Hash::make('password'),
            'role' => 'reader',
        ]);
    }
}
