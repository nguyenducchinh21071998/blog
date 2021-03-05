<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    protected $table = 'class_rooms';
    protected $fillable = [
        'course_id', 'teacher_id', 'name', 'class', 'type_class', 'status_class', 'department_id', 
        'schedule', 'start_date', 'end_date', 'total_student'
    ];
}
