<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\TeacherClassReplace;
use App\Department;
use App\User;
use App\Semester;
use Illuminate\Support\Facades\DB;
use Log;
use \Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\ClassRoom;

class TeacherClassReplaceController extends Controller
{
    public function index() {
        $teachers = User::where('status', 1)->where('position', 2)->where('id', '!=', Auth::user()->id)->get();
        $classRooms = ClassRoom::where('teacher_id', Auth::user()->id)->get();
        return view('teacher_class_replace.list', [
            'teachers' => $teachers,
            'classRooms' => $classRooms,
        ]);
    }

    public function getListTeacherClass() {
        $user = Auth::user();
        if ($user->position == 1) {
            $teacherClassReplaces = TeacherClassReplace::orderBy('id', 'desc');
        } else {
            $teacherClassReplaces = TeacherClassReplace::where('teacher_id', $user->id)->orderBy('id', 'desc');
        }
        return DataTables::of($teacherClassReplaces)
            ->addIndexColumn()
            ->addColumn('action', function ($teacherClassReplaces){
                $txt = "";
                $txt .= '<a data-id="' . $teacherClassReplaces->id . '" class="icon-warning btn btn-xs btn-primary btn-detail" data-tooltip="tooltip" data-placement="top" title="Chi tiết"/><i class="fas fa-eye"></i></a>';
                if (Auth::user()->position == 2 && $teacherClassReplaces->status == 1) {
                    $txt .= '<a data-id="' . $teacherClassReplaces->id . '" class="icon-warning btn btn-xs btn-warning btn-edit" data-tooltip="tooltip" data-placement="top" title="Chỉnh sửa"/><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>';
                    $txt .= '<a data-id="' . $teacherClassReplaces->id . '" class="icon-danger btn btn-xs btn-danger btn-delete" data-tooltip="tooltip" data-placement="top" title="Xóa"/><i class="fas fa-trash-alt" aria-hidden="true"></i></a>';
                }
                if (Auth::user()->position == 1 && $teacherClassReplaces->status == 1) {
                    $txt .= '<a data-id="' . $teacherClassReplaces->id . '" class="icon-warning btn btn-xs btn-warning btn-update-replace" data-tooltip="tooltip" data-placement="top" title="Duyệt đơn"/><i class="fas fa-check-circle" aria-hidden="true"></i></a>';
                }

                return $txt;
            })
            ->editColumn('status', function ($teacherClassReplaces) {
                $txt = '';
                if ($teacherClassReplaces->status == 1) {
                    $txt = 'Đang chờ xác nhận';
                } else {
                    $txt = 'Đã duyệt';
                }
                return $txt;
            })
            ->editColumn('class_room_id', function ($teacherClassReplaces) {
                $nameClass = ClassRoom::find($teacherClassReplaces->class_room_id);
                return $nameClass->name;
            })
            ->editColumn('teacher_id', function ($teacherClassReplaces) {$name = '';
                if ($teacherClassReplaces->teacher_id) {
                    $name = User::find($teacherClassReplaces->teacher_id)->name;
                }
                return $name;
            })
            ->editColumn('teacher_replace_id', function ($teacherClassReplaces) {
                $name = '';
                if ($teacherClassReplaces->teacher_replace_id) {
                    $name = User::find($teacherClassReplaces->teacher_replace_id)->name;
                }
                return $name;
            })
            ->editColumn('user_confirm_id', function ($teacherClassReplaces) {
                $name = '';
                if ($teacherClassReplaces->user_confirm_id) {
                    $name = User::find($teacherClassReplaces->user_confirm_id)->name;
                }
                return $name;
            })
            ->make(true);

    }
    public function delete(Request $request) {
        DB::beginTransaction();

        try {

            $user = TeacherClassReplace::find($request->id)->delete();

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
    public function updateReplace(Request $request) {
        DB::beginTransaction();

        try {

            $user = TeacherClassReplace::find($request->id);
            $user->update([
                'status' => 2,
                'user_confirm_id' => Auth::user()->id
            ]);

            DB::commit();

            return response()->json([
                'error' => false,
                'message' => 'Duyệt thành công'
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
            TeacherClassReplace::create([
                'class_room_id' => $data['class_room_id'],
                'teacher_id' => Auth::user()->id,
                'teacher_replace_id' => $data['teacher_replace_id'],
                'replacement_day' => $data['replacement_day'],
                'reason' => $data['reason']
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
            $data = User::find($id);
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
            $user = User::where('id', $data['id'])->first();
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'mobile' => $data['mobile'],
                'address' => $data['address'],
                'gender' => $data['gender'],
                'position' => $data['position'],
                'status' => $data['status']
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
