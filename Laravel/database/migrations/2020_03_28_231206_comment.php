<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Comment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->increments("comment_id");
            $table->unsignedInteger("parent_comment_id")->unsigned()->nullable();
            $table->text("content");
            $table->unsignedInteger('created_by');
            $table->timestamps();
        });

        Schema::table('comment', function($table){
            $table->foreign("parent_comment_id")->references("comment_id")->on('comment');
            $table->foreign('created_by')->references('id')->on('users');
           
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment');
    }
}
