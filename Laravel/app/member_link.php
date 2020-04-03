<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class member_link extends Model
{
    //
    protected $table = 'memberlink';
    public $timestamps = false;

    protected $fillable = [
        'user_id_fk', 'project_id_fk', 'pending'
    ];

    public function members(){
        return $this->hasManyThrough('App\User', 'App\project');
    }
}
