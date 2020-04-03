<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Sprint extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sprint', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->increments("sprint_id");
            $table->integer("sprintNumber");
            $table->integer("sprintDuration");
            $table->unsignedInteger("project_id_fk");
           
            
        });

        Schema::table('sprint', function($table){
            $table->foreign("project_id_fk")->references("project_id")->on("project");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sprint');
    }
}
