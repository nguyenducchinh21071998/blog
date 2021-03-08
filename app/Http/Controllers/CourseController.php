<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\Course;
use App\Semester;
use Illuminate\Support\Facades\DB;
use Log;
use \Illuminate\Support\Facades\Hash;

class CourseController extends Controller
{
    public function index() {
        $semesters = Semester::orderBy('id', 'asc')->get();
        return view('course.list', [
            'semesters' => $semesters
        ]);
    }

    public function getListCourse() {
        $courses = Course::orderBy('id', 'desc');
        return DataTables::of($courses)
            ->addIndexColumn()
            ->addColumn('action', function ($courses){
                $txt = "";
                $txt .= '<a data-id="' . $courses->id . '" class="icon-warning btn btn-xs btn-warning btn-edit" data-tooltip="tooltip" data-placement="top" title="Chỉnh sửa"/><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>';
                $txt .= '<a data-id="' . $courses->id . '" class="icon-danger btn btn-xs btn-danger btn-delete" data-tooltip="tooltip" data-placement="top" title="Xóa"/><i class="fas fa-trash-alt" aria-hidden="true"></i></a>';

                return $txt;
            })
            ->editColumn('semester_id', function ($courses) {
                $txt = '';
                $semester = Semester::where('id', $courses->semester_id)->first()->name;
                return $semester;
            })
            ->make(true);

    }
    public function delete(Request $request) {
        DB::beginTransaction();

        try {

            $user = Course::find($request->id)->delete();
            
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
            Course::create([
                'name' => $data['name'],
                'semester_id' => $data['semester_id'],
                'description' => $data['description']
            ]);  
            // User::created($data);          
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
            $data = Course::find($id);
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
            $user = Course::where('id', $data['id'])->first();
            $user->update([
                'name' => $data['name'],
                'semester_id' => $data['semester_id'],
                'description' => $data['description']
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
