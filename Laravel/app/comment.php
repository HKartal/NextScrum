<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    protected $fillable = [
        'parent_comment_id', 'content', 'created_by'
    ];

    
}
