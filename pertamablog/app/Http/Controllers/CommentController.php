<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Log;


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

    // add a comment to a specific post
    public function store(Request $request, $postId)
    {
        $request->validate([
            'comment_text' => 'required|string',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $userId,
            'comment_text' => $request->comment_text,
        ]);

        // Log the execution command
        Log::info("Executing sentiment analysis for comment: " . $comment->comment_text);

        // Set environment variables explicitly within the Laravel process
        $env = [
            'NLTK_DATA' => 'C:\\Users\\User\\AppData\\Roaming\\nltk_data',
            'HOME' => 'C:\\Users\\User',
        ];
        $pythonPath = 'C:\\Users\\User\\gpt4all_env\\Scripts\\python.exe';
        $pythonScript = base_path('scripts/sentiment_analysis.py');

        // Run the process
        $process = new Process([$pythonPath, $pythonScript, $comment->comment_text]);
        $process->setEnv($env);
        $process->run();

        if (!$process->isSuccessful()) {
            Log::error("Sentiment analysis failed: " . $process->getErrorOutput());
            return response()->json(['message' => 'Comment added, but sentiment analysis failed.', 'comment' => $comment]);
        }

        $sentiment = trim($process->getOutput());

        // Update the comment with sentiment analysis result
        $comment->sentiment = $sentiment;
        $comment->save();

        Log::info("Sentiment analysis successful: " . $sentiment);

        return response()->json(['message' => 'Comment added successfully!', 'comment' => $comment]);
    }
}
