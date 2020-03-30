<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Ticket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        /**
         * TODO: add creator column as foreign key to user id;
         * TODO: add color column;
         */

        Schema::create('ticket', function (Blueprint $table) {
            $table->bigIncrements("ticket_id");
            $table->string("ticketTitle", 240);
            $table->text("ticketDescription");
            $table->enum("priority", ['normal', 'medium','high', 'highest']);
            $table->enum("status", ['todo', 'doing','done']);
            $table->integer("storypoints");
            $table->integer("ticketNumber");
            $table->foreign("project_fk_id")->references("project_id")->on("project");
            $table->foreign("sprint_fk_id")->references("sprint_id")->on("sprint");
            $table->foreign("column_id_fk")->references("column_id")->on("column");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket');
    }
}
