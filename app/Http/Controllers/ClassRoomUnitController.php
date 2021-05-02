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
use App\ClassRoomUnit;

class ClassRoomUnitController extends Controller
{
    public function index($id) {
        return view('class_room_units.list', [
            'class_id' => $id
        ]);
    }

    public function getListClass($id) {
        $user = Auth::user();
        $classRooms = ClassRoomUnit::where('class_room_id', $id)->get();

        return DataTables::of($classRooms)
            ->addIndexColumn()
            ->addColumn('action', function ($classRooms){
                $txt = "";
                $txt .= '<a data-id="' . $classRooms->id . '" class="icon-warning btn btn-xs btn-success btn-update-class" data-tooltip="tooltip" data-placement="top" title="Điểm danh lớp học"/><i class="fas fa-check-circle" aria-hidden="true"></i></a>';
                $txt .= '<a data-id="' . $classRooms->id . '" class="icon-warning btn btn-xs btn-primary btn-detail" data-tooltip="tooltip" data-placement="top" title="Chi tiết"/><i class="fas fa-eye"></i></a>';
                if ($classRooms->status_class_unit == 1) {
                    $txt .= '<a data-id="' . $classRooms->id . '" class="icon-warning btn btn-xs btn-warning btn-edit" data-tooltip="tooltip" data-placement="top" title="Chỉnh sửa"/><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>';
                }
                if ($classRooms->status_class_unit == 1) {
                    $txt .= '<a data-id="' . $classRooms->id . '" class="icon-danger btn btn-xs btn-danger btn-delete" data-tooltip="tooltip" data-placement="top" title="Xóa"/><i class="fas fa-trash-alt" aria-hidden="true"></i></a>';
                }

                return $txt;
            })
            ->editColumn('department', function ($classRooms) {
                $txt = '';
                $department_id = ClassRoom::where('id', $classRooms->class_room_id)->first()->department_id;
                $txt = Department::where('id', $department_id)->first()->name;
                return $txt;
            })
            ->editColumn('status_class_unit', function ($classRooms) {
                $txt = '';
                if ($classRooms->status_class_unit == 1) {
                    $txt = 'Chưa diễn ra';
                } else {
                    $txt = 'Đã hoàn thành';
                }
                return $txt;
            })
            ->make(true);

    }
    public function delete(Request $request) {
        DB::beginTransaction();

        try {

            $user = ClassRoomUnit::find($request->id)->delete();

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
            $classRooms = ClassRoom::where('id', $data['class_room_id'])->first();
            ClassRoomUnit::create([
                'name' => $data['name'],
                'unit' => $data['unit'],
                'start_date' => $data['start_date'],
                'note' => $data['note'],
                'class_room_id' => $data['class_room_id'],
                'course_id' => $classRooms->course_id
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
            $data = ClassRoomUnit::find($id);
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
            $classRoomUnit = ClassRoomUnit::where('id', $data['id'])->first();
            $classRoomUnit->update([
                'name' => $data['name'],
                'unit' => $data['unit'],
                'start_date' => $data['start_date'],
                'note' => $data['note'],
                'status_class_unit' => $data['status_class_unit']
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
    public function updateStatus(Request $request) {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $classRoomUnit = ClassRoomUnit::where('id', $data['id'])->first();
            $classRoomUnit->update([
                'status_class_unit' => 2
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
}
