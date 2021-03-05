<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeacherClassReplace extends Model
{
    protected $table = 'teacher_class_replaces';
    protected $fillable = [
        'class_room_id', 'teacher_id', 'teacher_replace_id', 'user_confirm_id', 'status', 'replacement_day', 'reason'
    ];
}
