<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TicketAssignee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_assignee', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->unsignedInteger('ticket_id_fk');
            $table->unsignedInteger('user_id_fk');
            $table->timestamps();
          
        });

        Schema::table('ticket_assignee', function ($table) {
            $table->foreign('ticket_id_fk')->references('ticket_id')->on('ticket');
            $table->foreign('user_id_fk')->references('id')->on('users');
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
