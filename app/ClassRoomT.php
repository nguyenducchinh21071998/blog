<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\ClassRoomUnitTheory;
use App\Models\ClassRoomUnitExercise;
use App\Models\RoleUser;
use App\Models\Role;
use Calendar;
use Carbon\Carbon;
use Auth;

class ClassRoom extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'class_name', 'orientation_time', 'time_table', 'number_of_unit', 'tuition', 'status', 'course_id', 'icon', 'tuition_policy', 'max_tuition_policy', 'policy', 'facebook_group', 'slack_webhook_url', 'conf_attendance', 'conf_exercise', 'branch_id'
    ];

    /**
     * get users
     * @return objects
     */
    public function users()
    {
        return $this->belongsToMany('App\Models\User', 'user_class_rooms', 'class_room_id', 'user_id');
    }

    /**
     * get attendences
     * @return objects
     */
    public function attendences()
    {
        return $this->hasMany('App\Models\Attendence', 'class_room_id');
    }

    /**
     * get class_room_units
     * @return objects
     */
    public function class_room_units()
    {
        return $this->hasMany('App\Models\ClassRoomUnit', 'class_room_id');
    }

    public function class_room_unit_exercises()
    {
        return $this->hasMany("ClassRoomUnitExercise", "class_room_id");
    }


    public function course()
    {
        return $this->belongsTo("App\Models\Course");
    }

    public function payments()
    {
        return $this->morphMany('App\Models\PaymentVoucher', 'paymentable');
    }
 /**
 * format data request
 * @return objects 
*/
    public static function format_data($dataInput)
    {
        foreach ($dataInput as &$data) {
            if ($data == '') {
                $data = null;
            }
        }
        return $dataInput;
    }
 /**
 * add class room
 * @return objects 
*/
    public static function add_new_class($data_request){
        $data=ClassRoom::format_data($data_request);
        $data['orientation_time']=date('Y-m-d', strtotime($data['orientation_time']));
         $classRoom= new ClassRoom;
         $classRoom->code=$data['code'];
         $classRoom->class_name=$data['class_name'];
         $classRoom->orientation_time=$data['orientation_time'];
         $classRoom->time_table=$data['time_table'] ;
         $classRoom->tuition=$data['tuition'] ;
         $classRoom->status=$data['status'] ;
         $classRoom->course_id=$data['course_id'] ;
         $classRoom->tuition_policy=$data['tuition_policy'] ;
         $classRoom->max_tuition_policy=$data['max_tuition_policy'] ;
         $classRoom->facebook_group=$data['facebook_group'] ;
         $classRoom->number_of_unit=$data['number_of_unit'] ;
         $classRoom->save();
         return $classRoom;

    }
    public static function store($request) {
        $classRoom= ClassRoom::find($request->editID);
        $classRoom->code=$request->code;
        $classRoom->class_name=$request->class_name;
        $classRoom->orientation_time=$request->orientation_time;
        $classRoom->time_table=$request->time_table;
        $classRoom->number_of_unit=$request->number_of_unit;
        $classRoom->tuition=$request->tuition;
        $classRoom->course_id=$request->course_id;
        $classRoom->icon=$request->editIcon;
        $classRoom->tuition_policy=$request->tuition_policy;
        $classRoom->max_tuition_policy=$request->max_tuition_policy;
        $classRoom->policy=$request->editPolicy;
        $classRoom->facebook_group=$request->facebook_group;
        $classRoom->status=$request->status;
        $classRoom->save();
    }


     /**
     * get get StudentClassRoom
     * @return objects 
    */
    public function StudentClassRoom() {
        return $this->hasMany('App\Models\ClassRoomUnit', 'class_room_id');
    }


    public static function getClassRoomInfo($user_id){

        //hiep add at: july 06 2017
        
        //find super admin
        $role_id = Role::where('name','super-admin')->first()->id;
        $check = RoleUser::where('user_id', $user_id)->where('role_id', $role_id)->whereNull('deleted_at')->first();

        // hard code: user_id = 1 is super admin
        if (!empty($check)) {
            $data_info=ClassRoom::where('status','<>' , 17)->orderby('orientation_time','DESC')->paginate(env('PAGES'));
        } else {
            $data_info=ClassRoom::whereIn('id', function($query) use ($user_id){
                $query->select('class_room_id')->from('user_class_rooms')->where('user_id', $user_id)->get();
            })->where('status','<>' , 17)->orderby('orientation_time','DESC')->paginate(env('PAGES'));
        }

        //dd($data_info);
        

        return $data_info;
    }
    //Search
    public static function search($keyword){
    if ($keyword == "") {
        return ClassRoom::orderBy('id', 'desc')->paginate(env('PAGES'));
    }
    $finder = ClassRoom::where('class_rooms.class_name', 'LIKE', "%" . $keyword. "%")
            ->orWhere('class_rooms.code', 'LIKE', "%" . $keyword . "%")
            ->orWhere('class_rooms.facebook_group', 'LIKE', "%" . $keyword . "%")
            ->orderBy('id', 'desc')
            ->paginate(env('PAGES'));
    return $finder;
    }  


    public static function duplicate($id) {
        $origin_class= ClassRoom::where('id', $id)->first();

        $classroom = ClassRoom::where('id', $id)->first()->replicate();
        $classroom->class_name = $origin_class->class_name . " (copy)";
        $classroom->status = 16; //chuan bi khai giang
        $classroom->save();

        $class_room_units = ClassRoomUnit::where('class_room_id', $id)->get();

        if ($class_room_units) {
            foreach ($class_room_units as $key => $class_room_unit) {
                //unit
                $class_room_unit_dup = ClassRoomUnit::where('id', $class_room_unit->id)->first()->replicate();
                $class_room_unit_dup->class_room_id = $classroom->id;
                $class_room_unit_dup->save();

                //theories of unit
                $theories = ClassRoomUnitTheory::where('class_room_unit_id', $class_room_unit->id)->get();
                if ($theories) {
                    foreach ($theories as $key => $theory) {
                        $theory_dup = ClassRoomUnitTheory::where('id', $theory->id)->first()->replicate();
                        $theory_dup->class_room_unit_id = $class_room_unit_dup->id;
                        $theory_dup->save();
                    }
                }

                //exercises of unit
                $exercises = ClassRoomUnitExercise::where('class_room_unit_id', $class_room_unit->id)->get();
                if ($exercises) {
                    foreach ($exercises as $key => $exercise) {
                        $exercise_dup = ClassRoomUnitExercise::where('id', $exercise->id)->first()->replicate();
                        $exercise_dup->class_room_unit_id = $class_room_unit_dup->id;
                        $exercise_dup->save();
                    }
                }
            }
        }

    }
  public static function techScheduleDashboard()
    {

        $units = ClassRoom::join('class_room_units','class_room_units.class_room_id','=','class_rooms.id')
                            ->join('user_class_rooms','user_class_rooms.class_room_id','=','class_rooms.id')
                            ->join('branch_details','branch_details.id','=','class_room_units.class_room_name')
                            ->join('branches','branches.id','=','branch_details.branch_id')
                            ->where(function($query) {
                                if (Auth::user()->type != 1) {
                                    $query->where('user_class_rooms.user_id',Auth::id());
                                }

                                $query->where('class_room_units.status',1);
                            })
                            ->whereNotNull('class_room_units.learn_time')
                            ->select('class_name','unit','unit_name','learn_time','class_rooms.id as class_room_id','branch_details.name as branch_name','branches.address as branch')
                            ->groupBy('class_room_units.id')
                            ->get();

        $calendar = "";

        foreach ($units as $unit) {

            $unit->teacher = UserClassRoom::join('users','user_class_rooms.user_id','=','users.id')
                            ->where('class_room_id',$unit->class_room_id)
                            ->where('users.id',"<>",1)
                            ->select('users.name','user_class_rooms.type')
                            ->get();

            $unit->tutor = "Trợ giảng ";

            foreach ($unit->teacher as $value) {
                if ($value->type == 1) {
                    $unit->teacher = "Giảng viên $value->name";
                } else {
                    $unit->tutor .= $value->name . ", ";
                }
            }

            $learn_time = array();

            $start = Carbon::createFromFormat('Y-m-d H:i:s',$unit->learn_time);
            $end = Carbon::createFromFormat('Y-m-d H:i:s',$unit->learn_time)->addHours(2);
            $learn_time[] = Calendar::event(
                "Lớp $unit->class_name / Unit $unit->unit - $unit->unit_name \n Cơ sở $unit->branch \n Phòng $unit->branch_name", //event title
                false, //full day event?
                $start, //start time (you can also use Carbon instead of DateTime)
                $end, //end time (you can also use Carbon instead of DateTime)
                $unit->id,
                [
                    'description' => date('H:i',strtotime($start))." - ".date('H:i',strtotime($end))."<br>Lớp $unit->class_name / Unit $unit->unit - $unit->unit_name <br> $unit->teacher <br> ".trim($unit->tutor,", "),
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
                 }',
                 "eventDrop" =>" function(event, delta) {
                }"
            ])
            ->setOptions([
                "timeFormat" => 'H:mm',
                "locale" => "vi",
                "eventLimitClick " => "popover",
                "editable" => true,
                'defaultView' => 'agendaDay',
                'header' =>
                [
                    'left' => '',
                    'center' => 'title',
                    'right' => '',
                ]
            ]);

        }   

        return $calendar;
    }

    public function getBranch() {
        return $this->belongsTo('App\Models\Branch', 'branch_id');
    }

    public function getStudentClassRooms() {
        return $this->belongsToMany('App\Models\Student', 'student_class_rooms', 'class_room_id', 'student_id');
    }
}
