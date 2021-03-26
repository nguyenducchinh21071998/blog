<?php

namespace App\Http\Controllers;

use App\ClassRoom;
use Yajra\DataTables\DataTables;
use App\Course;
use App\Department;
use App\User;
use App\Semester;
use Illuminate\Support\Facades\DB;
use Log;
use \Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassRoomController extends Controller
{
    public function index() {
        $semesters = Semester::orderBy('id', 'asc')->get();
        $users = User::where('position', 2)->where('status', 1)->orderBy('id', 'asc')->get();
        $departments = Department::where('status', 1)->orderBy('id', 'asc')->get();
        return view('classRoom.list', [
            'semesters' => $semesters,
            'users' => $users,
            'departments' => $departments
        ]);
    }

    public function getListClass() {
        $user = Auth::user();
        if ($user->position == 1) {
            $classRooms = ClassRoom::orderBy('id', 'desc');
        } else {
            $classRooms = ClassRoom::where('teacher_id', $user->id)->orderBy('id', 'desc');
        }
        
        return DataTables::of($classRooms)
            ->addIndexColumn()
            ->addColumn('action', function ($classRooms){
                $txt = "";
                $txt .= '<a data-id="' . $classRooms->id . '" class="icon-warning btn btn-xs btn-primary btn-detail" data-tooltip="tooltip" data-placement="top" title="Chi tiết"/><i class="fas fa-eye"></i></a>';
                if (Auth::user()->position == 1) {
                    $txt .= '<a data-id="' . $classRooms->id . '" class="icon-warning btn btn-xs btn-warning btn-edit" data-tooltip="tooltip" data-placement="top" title="Chỉnh sửa"/><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>';
                    $txt .= '<a data-id="' . $classRooms->id . '" class="icon-danger btn btn-xs btn-danger btn-delete" data-tooltip="tooltip" data-placement="top" title="Xóa"/><i class="fas fa-trash-alt" aria-hidden="true"></i></a>';
                }

                return $txt;
            })
            ->editColumn('course_id', function ($classRooms) {
                $courseName = Course::where('id', $classRooms->course_id)->first()->name;
                return $courseName;
            })
            ->editColumn('teacher_id', function ($classRooms) {
                $userName = User::where('id', $classRooms->teacher_id)->first()->name;
                return $userName;
            })
            ->editColumn('type_class', function ($classRooms) {
                $txt = '';
                if ($classRooms->type_class == 1) {
                    $txt = 'Thực hành';
                } else {
                    $txt = 'Lí thuyết';
                }
                return $txt;
            })
            ->editColumn('status_class', function ($classRooms) {
                $txt = '';
                if ($classRooms->status_class == 1) {
                    $txt = 'Chưa diễn ra';
                } else if ($classRooms->status_class == 2) {
                    $txt = 'Đang diễn ra';
                } else {
                    $txt = 'Đã kết thúc';
                }
                return $txt;
            })
            ->make(true);

    }
    public function delete(Request $request) {
        DB::beginTransaction();

        try {

            $user = ClassRoom::find($request->id)->delete();
            
            DB::commit();

            return response()->json([
                'error' => false,
                'message' => 'Xóa thành công!'
            ], 200);

        } catch(Exception $e) {

            response()->json([
                'error' => true,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
    public function store(Request $request) {
        DB::beginTransaction();

        try {
            $data = $request->all();
            ClassRoom::create([
                'name' => $data['name'],
                'semester_id' => $data['semester_id'],
                'course_id' => $data['course_id'],
                'teacher_id' => $data['teacher_id'],
                'type_class' => $data['type_class'],
                'status_class' => $data['status_class'],
                'schedule' => $data['schedule'],
                'department_id' => $data['department_id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'total_student' => $data['total_student']
            ]);        
            DB::commit();

            return response()->json([
                'error' => false,
                'message' => 'Thêm mới thành công !'
            ], 200);

        } catch(Exception $e) {

            response()->json([
                'error' => true,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
    public function edit($id) {
        DB::beginTransaction();

        try {
            $data = ClassRoom::find($id);
            DB::commit();

            return response()->json([
                'error' => false,
                'data' => $data
            ], 200);

        } catch(Exception $e) {

            response()->json([
                'error' => true,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
    public function update(Request $request) {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $user = ClassRoom::where('id', $data['id'])->first();
            $user->update([
                'name' => $data['name'],
                'semester_id' => $data['semester_id'],
                'course_id' => $data['course_id'],
                'teacher_id' => $data['teacher_id'],
                'type_class' => $data['type_class'],
                'status_class' => $data['status_class'],
                'schedule' => $data['schedule'],
                'department_id' => $data['department_id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'total_student' => $data['total_student']
            ]);
            DB::commit();

            return response()->json([
                'error' => false,
                'message' => 'Cập nhật thành công !'
            ], 200);

        } catch(Exception $e) {

            response()->json([
                'error' => true,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
    public function getCourseBy($id) {
        DB::beginTransaction();

        try {
            $data = Course::where('semester_id', $id)->get();
            DB::commit();

            return response()->json([
                'error' => false,
                'data' => $data
            ], 200);

        } catch(Exception $e) {

            response()->json([
                'error' => true,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
}
