<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sprint extends Model
{
    protected $table = 'sprint';
    public $timestamps = false;

    protected $fillable = [
        'sprintNumber', 'sprintDuration', 'project_fk_id'
    ];
}
