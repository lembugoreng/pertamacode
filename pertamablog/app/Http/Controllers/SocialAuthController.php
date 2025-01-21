<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SocialAuthController extends Controller
{
    // Redirect to GitHub
    public function redirectToGitHub()
    {
        return Socialite::driver('github')->stateless()->redirect();
    }

    // Handle GitHub callback
    public function handleGitHubCallback()
    {
        $githubUser = Socialite::driver('github')->stateless()->user();

        // Check if user already exists
        $user = User::where('email', $githubUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $githubUser->getName(),
                'email' => $githubUser->getEmail(),
                'password' => bcrypt(uniqid()), // Set random password
                'role' => 'reader', // Default role
            ]);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return redirect("http://localhost:3000/auth/login?token=$token");
    }
}
