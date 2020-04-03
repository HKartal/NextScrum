<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class column extends Model
{
    protected $fillable = [
        'columnName', 'position', 'type', 'visible',
        'project_id_fk'
    ];
}
