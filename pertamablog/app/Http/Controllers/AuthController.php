<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $request->input('role', 'reader'),
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function redirectToGitHub()
    {
        return Socialite::driver('github')->stateless()->redirect();
    }

    public function handleGitHubCallback()
    {
        try {
            $githubUser = Socialite::driver('github')->stateless()->user();
            $user = User::where('email', $githubUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $githubUser->getName(),
                    'email' => $githubUser->getEmail(),
                    'password' => bcrypt(str()->random(24)),
                    'role' => 'reader', // default role for GitHub users
                ]);
            }

            $token = $user->createToken('authToken')->plainTextToken;

            return redirect("http://localhost:3000/auth/login?token={$token}");
        } catch (\Exception $e) {
            Log::error("GitHub Authentication Failed: " . $e->getMessage());
            return response()->json(['error' => 'Authentication failed.'], 401);
        }
    }
    
}
