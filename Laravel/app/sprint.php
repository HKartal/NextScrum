<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sprint extends Model
{
    protected $fillable = [
        'sprintNumber', 'sprintDuration', 'project_id_fk'
    ];
}
