<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Files extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->increments('file_id');
            $table->text('originalName');
            $table->text('diskName');
            $table->string('mimetype', 255);
            $table->unsignedInteger('ticket_fk_id');

            $table->timestamps();
        });

        Schema::table('files', function($table){
            $table->foreign('ticket_fk_id')->references('ticket_id')->on('ticket');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
