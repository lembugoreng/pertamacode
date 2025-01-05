<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;

// Public Routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// ✅ Add this route to get details of a specific user (if needed)
Route::get('users/{id}', function ($id) {
    $user = \App\Models\User::find($id);
    if ($user) {
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
        ]);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
});

// ✅ Add this route to fetch the authenticated user's details
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'name' => $request->user()->name,
        'email' => $request->user()->email,
        'role' => $request->user()->role,
    ]);
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Blog Post Routes
    Route::get('blog-posts', [BlogPostController::class, 'index']);
    Route::post('blog-posts', [BlogPostController::class, 'store'])->middleware('role:admin,editor');
    Route::put('blog-posts/{id}', [BlogPostController::class, 'update'])->middleware('role:admin,editor');
    Route::delete('blog-posts/{id}', [BlogPostController::class, 'destroy'])->middleware('role:admin,editor');
    Route::get('blog-posts/{id}', [BlogPostController::class, 'show']);

    // Comment Routes
    Route::get('blog-posts/{id}/comments', [CommentController::class, 'index']);
    Route::post('blog-posts/{id}/comments', [CommentController::class, 'store']);
});
