<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ticket extends Model
{
    protected $table = 'ticket';

    public $timestamps = false;

    protected $fillable = [
        'ticketTitle', 'ticketDescription', 'priority',
        'status', 'storyPoints', 'ticketNumber', 'created_by',
        'project_fk_id', 'sprint_fk_id', 'column_fk_id'
    ];
}
