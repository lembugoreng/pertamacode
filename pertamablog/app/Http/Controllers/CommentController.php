<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)
            ->with('user:id,name') // Include the user relationship
            ->get();
    
        return response()->json([
            'data' => $comments
        ]);
    }

    // ✅ Add a comment to a specific post
    public function store(Request $request, $postId)
    {
        $request->validate([
            'comment_text' => 'required|string',
        ]);

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => Auth::id(),
            'comment_text' => $request->comment_text,
        ]);

        return response()->json(['message' => 'Comment added successfully!', 'comment' => $comment]);
    }
}
