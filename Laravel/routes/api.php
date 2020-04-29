<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth'
], function(){
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function(){
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'prefix' => 'project'
], function(){
    Route::group([
        'middleware' => 'auth:api'
    ], function(){
        Route::post('create', 'ProjectController@create');
        Route::post('invite', 'ProjectController@invite');
        Route::delete('invite', 'ProjectController@deleteInvite');
        Route::get('members', 'ProjectController@getMembers');
        Route::get('projects', 'ProjectController@getUserProjects');
        Route::get("invites", 'projectController@getInvitedList');
        Route::delete('project', 'projectController@deleteProject');
    });
   
});

Route::group([
    'prefix' => 'invites'
], function(){
    Route::group([
        'middleware' => 'auth:api'
    ], function(){
        Route::post('accept', 'ProjectController@acceptInvite');
        Route::post('decline', 'ProjectController@declineInvite');
    });
   
});

Route::group([
    'prefix' => 'board'
], function(){
    Route::group([
        'middleware' => 'auth:api'
    ], function(){
        Route::post('ticket', 'TicketController@createTicket');
        Route::put('ticket', 'TicketController@updateTicket');
        Route::delete('ticket', 'TicketController@deleteTicket');
        Route::get('tickets', 'TicketController@getTickets');
        Route::get('ticket', 'TicketController@getTicket');
        Route::post("assign", 'TicketController@addAssignee');
        Route::delete("assign", 'TicketController@removeAssignee');
        Route::get('board', 'TicketController@getBoard');
        Route::put('move', 'TicketController@moveTicket');
        // Route::post("column", 'TicketC')
    });
   
});