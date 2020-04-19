<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Column extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('column', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->increments("column_id");
            $table->string('columnName', 150);
            $table->integer("position");
            $table->enum("type", ['todo','doing','done', 'backlog', 'other']);
            $table->boolean("visible");
            $table->unsignedInteger('project_fk_id');
        });

        Schema::table('column', function($table){
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
        Schema::dropIfExists('column');
    }
}
