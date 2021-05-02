<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassRoomUnit extends Model
{
    protected $fillable = [
        'name', 'unit', 'class_room_id','course_id', 'status_class_unit', 'start_date'
    ];
}
