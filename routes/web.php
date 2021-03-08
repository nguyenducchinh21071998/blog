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

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/semester/list', 'UserController@getListSemester');

Route::get('/user', 'UserController@index');
Route::post('/user/list', 'UserController@getListUser');
Route::post('/user/delete', 'UserController@delete');
Route::post('/user/store', 'UserController@store');
Route::get('/user/edit/{id}', 'UserController@edit');
Route::post('/user/update', 'UserController@update');

Route::get('/course', 'CourseController@index');
Route::get('/course/list', 'CourseController@getListCourse');
Route::post('/course/delete', 'CourseController@delete');
Route::post('/course/store', 'CourseController@store');
Route::get('/course/edit/{id}', 'CourseController@edit');
Route::post('/course/update', 'CourseController@update');
