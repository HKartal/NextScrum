<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ticket_assignee extends Model
{

    protected $table = 'ticket_assignee';
    public $timestamps = false;
    protected $fillable = [
        'ticket_fk_id', 'user_fk_id'
    ];
}
