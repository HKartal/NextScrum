<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class member_link extends Model
{
    //
    protected $table = 'memberlink';
    public $timestamps = false;

    protected $fillable = [
        'user_fk_id', 'project_fk_id', 'accepted'
    ];

    public function members(){
        return $this->hasManyThrough('App\User', 'App\project');
    }
}
