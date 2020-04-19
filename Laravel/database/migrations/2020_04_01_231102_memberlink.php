<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MemberLink extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memberlink', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->unsignedInteger('user_fk_id');
            $table->unsignedInteger('project_fk_id');
            $table->boolean('accepted');
            $table->timestamps();
          
        });

        Schema::table('memberlink', function($table){
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->foreign('project_fk_id')->references('project_id')->on('project');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_link');
    }
}
