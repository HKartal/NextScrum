<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/*
Route::get('/hello', function () {
   return 'hello';
    
});
*/

/*

Route::get('/users/{id}/{name}', function($id, $name){
   return 'this is user '.$name. 'with an id of '.$id;
    
});
*/


Route::get('/', 'PagesController@index');


Route::get('/about', function(){
   return view('pages.about'); 
    
});
    
        
Route::get('/register', function(){
        return view ('register');
});

Route::get('/login', function(){
        return view ('login');
});
    
    
    
  
    



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
