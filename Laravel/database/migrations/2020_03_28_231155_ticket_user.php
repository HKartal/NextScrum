<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TicketUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * TODO: add user_id_fk column as foreign key to user id;
         * 
         */

        Schema::create("ticket_user", function (Blueprint $table) {
          $table->foreign("ticket_id_fk")->references("ticket_id")->on("ticket");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_user');
    }
}
