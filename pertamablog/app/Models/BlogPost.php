<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content','big_content', 'status', 'user_id'];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
