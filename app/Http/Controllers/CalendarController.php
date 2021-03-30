<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Calendar;
use App\Models\ClassRoom;
use App\Models\UserClassRoom;
use App\Models\StudyGroup;
use Carbon\Carbon;
use Entrust;

class FullCalendarController extends Controller
{
	public function __construct() {
        $this->middleware('auth');

        $this->middleware('permission:administrator-finance')->only(['fullCalendar']);
    }

    public function fullCalendar()
    {

		// 1 trạng thái lớp đang diễn ra
		$units = ClassRoom::join('class_room_units', 'class_room_units.class_room_id', '=', 'class_rooms.id')
							->where('class_room_units.status', 1)
							->whereNull('class_room_units.deleted_at')
							->whereNotNull('class_room_units.learn_time')
							->select('class_name', 'unit', 'unit_name', 'learn_time', 'class_rooms.id as class_room_id')
							->get();
		
		foreach ($units as $unit) {

			// 1 trạng thái lớp đang diễn ra
			$unit->teacher = UserClassRoom::join('users', 'user_class_rooms.user_id', '=', 'users.id')
											->where('class_room_id', $unit->class_room_id)
											->where('users.id', '<>', 1)
											->select('users.name', 'user_class_rooms.type', 'user_class_rooms.deleted_at')
											->get();

			$unit->tutor = 'Trợ giảng: ';
			foreach ($unit->teacher as $value) {

				// 1 là type giảng viên
				if ($value->type == 1 && $value->deteled_at == Null) {
					$unit->teacher = 'Giảng viên: '.$value->name;
				} else {

					// 4 là type giảng viên tạm thời
					if ($value->type != 4 && $value->type != 3) {
						$unit->tutor .= $value->name . ', ';
					}
					
				}
			}
			
			$learn_time = array();

			$start = Carbon::createFromFormat('Y-m-d H:i:s', $unit->learn_time);
			// 2 là 2 giờ
			$end = Carbon::createFromFormat('Y-m-d H:i:s', $unit->learn_time)->addHours(2);
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
		// Calendar các buổi học nhóm
		$units_group = StudyGroup::whereNotNull('learn_time')
	                             ->join('class_rooms', 'class_rooms.id', '=', 'class_room_study_group.class_room_id')
	                             ->select('subject', 'learn_time', 'class_rooms.class_name', 'class_room_id')
	                             ->get();

        foreach ($units_group as $unit_group) {
        		// lấy tất cả các buổi học nhóm có thời gian học không rỗng
                $unit_group->tutors = UserClassRoom::join('users', 'user_class_rooms.user_id', '=', 'users.id')
						                            ->where('class_room_id', $unit_group->class_room_id)
						                            ->where('users.id', '<>', 1)
						                            ->select('users.name', 'user_class_rooms.type', 'user_class_rooms.deleted_at')
						                            ->get();
                $unit_group->tutor = ' Trợ giảng : ';
                // foreach lấy danh sách trợ giảng
                foreach ($unit_group->tutors as $value) {
                	// 2 là type trợ giảng
                    if ($value->type == 2) {
                        $unit_group->tutor .= $value->name . ', ';
                    }
                }
                $unit_group->tutor = trim($unit_group->tutor, ', ');
                $learn_time = array();
				$start = Carbon::createFromFormat('Y-m-d H:i:s', $unit_group->learn_time);
				// 2 là 2 giờ
				$end = Carbon::createFromFormat('Y-m-d H:i:s', $unit_group->learn_time)->addHours(2);
				$learn_time[] = Calendar::event("Lớp $unit_group->class_name \n Tên buổi học : $unit_group->subject",
											    false,
											    $start,
											    $end,
												$unit->id,
												[
													'color' => '#69bb63',
								                    'description' => date('H:i', strtotime($start)) . " - " . date('H:i',strtotime($end)) . "<br>Lớp $unit_group->class_name / Tên buổi học : $unit_group->subject <br> $unit_group->tutor <br> ",
								                ]
											);

				$calendar = Calendar::setId('zent')
									->addEvents($learn_time)
									->setCallbacks([
									    //set fullcalendar callback options (will not be JSON encoded)
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


		return view('fullcalendar.index', [
			"calendar" => $calendar,
		]);
    }
}
