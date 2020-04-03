<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ticket extends Model
{
    protected $fillable = [
        'ticketTitle', 'ticketDescription', 'priority',
        'status', 'storyPoints', 'ticketNumber', 'created_by',
        'project_fk_id', 'sprint_fk_id', 'column_id_fk'
    ];
}
