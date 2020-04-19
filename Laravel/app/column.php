<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class column extends Model
{
    protected $table = 'column';
    public $timestamps = false;
    protected $fillable = [
        'columnName', 'position', 'type', 'visible',
        'project_fk_id'
    ];
}
