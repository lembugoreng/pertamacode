<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SubscriberController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:subscribers,email',
        ]);

        Subscriber::create([
            'email' => $request->input('email'),
        ]);

        return response()->json([
            'message' => 'Subscription successful!',
        ]);
    }

    public function notifySubscribers($blogPost)
    {
        $subscribers = Subscriber::all();

        foreach ($subscribers as $subscriber) {
            Mail::raw("A new blog post titled '{$blogPost->title}' has been published. Check it out now!", function ($message) use ($subscriber) {
                $message->to($subscriber->email)
                    ->subject('New Blog Post Alert!');
            });
        }

        Log::info("Subscribers notified about new blog post.");
    }
}

