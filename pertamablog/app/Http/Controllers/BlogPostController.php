<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('user:id,name')->paginate(6);

        return response()->json([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'total' => $posts->total(),
            ],
        ]);
    }



    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'big_content' => 'required|string',
        ]);

        $post = BlogPost::create([
            'title' => $request->title,
            'content' => $request->content,
            'big_content' => $request->big_content,
            'user_id' => Auth::id(),
        ]);

        // Notify subscribers via email
        $this->notifySubscribers($post);

        return response()->json(['message' => 'Post created successfully!', 'data' => $post]);
    }

    // Function to notify subscribers
    private function notifySubscribers($post)
    {
        $subscribers = Subscriber::all();

        foreach ($subscribers as $subscriber) {
            Mail::raw("A new blog post titled '{$post->title}' has been published. Check it out now at http://localhost:3000/auth/login ", function ($message) use ($subscriber, $post) {
                $message->to($subscriber->email)
                    ->subject('New Blog Post: ' . $post->title);
            });
        }

        Log::info("Subscribers notified about new blog post: " . $post->title);
    }


    // update blog post admin/editor role
    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);

        $user = Auth::user();

        // 🔒 Authorization check for admin, editor, or post owner
        if (!in_array($user->role, ['admin', 'editor']) && $post->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate title, content, and big_content
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'big_content' => 'required',
        ]);

        // Update the post, including big_content
        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'big_content' => $request->big_content,
        ]);

        return response()->json(['message' => 'Post updated successfully!', 'data' => $post]);
    }


    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $user = Auth::user();

        // Check if the authenticated user is allowed to delete the post
        if ($user->role === 'admin' || $post->user_id === $user->id) {
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully!']);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function show($id)
    {
        // Fetch the blog post with the associated user (author)
        $post = \App\Models\BlogPost::with('user')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'big_content' => $post->big_content,
            'authorName' => $post->user->name,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at,
        ]);
    }
}
