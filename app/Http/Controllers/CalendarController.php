<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Calendar;
use App\ClassRoom;
use Carbon\Carbon;
use Entrust;
use App\User;
use App\Department;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function fullCalendar()
    {
        $user = Auth::user();
        if ($user->position == 1) {
            $units = ClassRoom::join('class_room_units', 'class_room_units.class_room_id', '=', 'class_rooms.id')
                                ->select('class_rooms.name as class_name', 'unit', 'class_room_units.name as unit_name',
                                        'class_room_units.start_date as start_date_unite', 'class_rooms.id as class_room_id', 'class_rooms.teacher_id as teacher_id',
                                        'class_rooms.department_id')
                                ->get();
        } else {
            $units = ClassRoom::join('class_room_units', 'class_room_units.class_room_id', '=', 'class_rooms.id')
                                ->where('class_rooms.teacher_id', '=', $user->id)
                                ->select('class_rooms.name as class_name', 'unit', 'class_room_units.name as unit_name',
                                        'class_room_units.start_date as start_date_unite', 'class_rooms.id as class_room_id', 'class_rooms.teacher_id as teacher_id',
                                        'class_rooms.department_id')
                                ->get();
        }

		foreach ($units as $unit) {

			$unit->teacher_id = User::where('id', $unit->teacher_id)->first()->name;
			$unit->department_id = Department::where('id', $unit->department_id)->first()->name;
			$learn_time = array();
			$start = Carbon::createFromFormat('Y-m-d H:i:s', $unit->start_date_unite);
			// 2 là 2 giờ
			$end = Carbon::createFromFormat('Y-m-d H:i:s', $unit->start_date_unite)->addHours(2);
			$learn_time[] = Calendar::event(
											// false la dung full chức năng ,$start là thời gian bắt đầu ,$end thơi gian kết thúc
										    "$unit->class_name\n$unit->teacher_id\n$unit->department_id\nBuổi $unit->unit",
										    false,
										    $start,
                                            $end,
											$unit->id,
											[
                                                'color' => 'red',
                                                'background-color' => 'red',
							                    'description' => date('H:i',strtotime($start)) . " - " . date('H:i', strtotime($end)) . "<br>Lớp $unit->class_name / Unit $unit->unit - $unit->unit_name <br> $unit->teacher <br> " . trim($unit->tutor, ", "),
							                ]
			);

			$calendar = Calendar::setId('zent')
								->addEvents($learn_time)
								->setCallbacks([ //set fullcalendar callback options (will not be JSON encoded)
							        'eventRender' => 'function(event, element) {
							           	element.qtip({
								            content: event.description,
								            position: {
										        my: "bottom center",
										        at: "top center",
										    },
										    style: {
										        classes: "qtip-blue qtip-rounded"
										    },
								        });
							         }',
							         'eventClick' => 'function(event, element) {
						             	console.log(123, event);
							         }',
							         "eventDrop" =>" function(event, delta) {
										console.log(event.end.format());
								  	}"
							    ])
								->setOptions([
											  "timeFormat" => 'H:mm',
											  "locale" => "vi",
											  "eventLimitClick " => "popover",
											  "editable" => true,
								]);

		}
		return view('fullCalendar.index', [
			"calendar" => $calendar,
		]);
    }
}
