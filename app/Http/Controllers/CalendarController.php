<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Calendar;
use App\ClassRoom;
use Carbon\Carbon;
use Entrust;
use App\User;
use App\Department;

class CalendarController extends Controller
{
    public function fullCalendar()
    {
		$units = ClassRoom::join('class_room_units', 'class_room_units.class_room_id', '=', 'class_rooms.id')
							->select('class_rooms.name as class_name', 'unit', 'class_room_units.name as unit_name',
                                    'class_room_units.start_date as start_date_unite', 'class_rooms.id as class_room_id', 'class_rooms.teacher_id as teacher_id',
                                    'class_rooms.department_id')
							->get();
		foreach ($units as $unit) {

			$unit->teacher_id = User::where('id', $unit->teacher_id)->first()->name;
			$unit->department_id = Department::where('id', $unit->department_id)->first()->name;
			$learn_time = array();
			$start = Carbon::createFromFormat('Y-m-d H:i:s', $unit->start_date_unite);
			// 2 là 2 giờ
			$end = Carbon::createFromFormat('Y-m-d H:i:s', $unit->start_date_unite)->addHours(2);
			$learn_time[] = Calendar::event(
											// false la dung full chức năng ,$start là thời gian bắt đầu ,$end thơi gian kết thúc
										    "Lớp $unit->class_name \n Unit $unit->unit - $unit->unit_name",
										    false,
										    $start,
                                            $end,
											$unit->id,
											[
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
						             	console.log(event);
						             	console.log(element);
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
// dd($calendar);
		return view('fullCalendar.index', [
			"calendar" => $calendar,
		]);
    }
}
