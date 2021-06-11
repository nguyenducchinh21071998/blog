<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\ClassRoomUnit;
use App\Course;
use App\ClassRoom;

class Export implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $class = ClassRoomUnit::all();
        $data = [];
        foreach ($class as $key => $value) {
            $data[$key]['unit'] = $value['unit'];
            $data[$key]['name'] = $value['name'];
            $data[$key]['class_room_name'] = ClassRoom::where('id', $value['class_room_id'])->first()->name;
            $data[$key]['course_name'] = Course::where('id', $value['course_id'])->first()->name;
            if ($value['status_class_unit'] == 1) {
                $data[$key]['status_class'] = 'Chưa diễn ra';
            } else {
                $data[$key]['status_class'] = 'Đã hoàn thành';
            }
            $data[$key]['start_date'] = $value['start_date'];
            $data[$key]['note'] = $value['note'];
        }
        return collect($data);
    }
    public function headings() :array {
    	return ["Buổi", "Tên buổi học", "Lớp", "Khóa học", 'Trạng thái buổi học', 'Ngày dạy'];
    }
}
