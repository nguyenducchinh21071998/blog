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

Route::get('/class-room', 'ClassRoomController@index');
Route::get('/class-room/list', 'ClassRoomController@getListClass');
Route::post('/class-room/delete', 'ClassRoomController@delete');
Route::post('/class-room/store', 'ClassRoomController@store');
Route::get('/class-room/edit/{id}', 'ClassRoomController@edit');
Route::post('/class-room/update', 'ClassRoomController@update');

Route::get('/get-course-by-semester/{id}', 'ClassRoomController@getCourseBy');

Route::get('/teach-class-replace', 'TeacherClassReplaceController@index');
Route::get('/teach-class-replace/list', 'TeacherClassReplaceController@getListTeacherClass');
Route::post('/teach-class-replace/delete', 'TeacherClassReplaceController@delete');
Route::post('/teach-class-replace/store', 'TeacherClassReplaceController@store');
Route::get('/teach-class-replace/edit/{id}', 'TeacherClassReplaceController@edit');
Route::post('/teach-class-replace/update', 'TeacherClassReplaceController@update');
Route::post('/teach-class-replace/update-replace', 'TeacherClassReplaceController@updateReplace');
Route::get('/calendar', 'CalendarController@fullCalendar');

Route::get('/{id}', 'ClassRoomUnitController@index');
Route::get('/class-room-unit/list/{id}', 'ClassRoomUnitController@getListClass');
Route::post('/class-room-unit/delete', 'ClassRoomUnitController@delete');
Route::post('/class-room-unit/store', 'ClassRoomUnitController@store');
Route::get('/class-room-unit/edit/{id}', 'ClassRoomUnitController@edit');
Route::post('/class-room-unit/update', 'ClassRoomUnitController@update');
Route::post('/class-room-unit/update-status', 'ClassRoomUnitController@updateStatus');

// hienj taij chua export dc do dang trung router voi list unit thay router 1 trong 2 laf ok
Route::get('export', 'ExportController@export')->name('export');
