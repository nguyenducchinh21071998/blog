<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\User;
use Illuminate\Support\Facades\DB;
use Log;
use \Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        return view('user.list');
    }

    public function getListUser() {
        $users = User::orderBy('id', 'desc');
        return DataTables::of($users)
            ->addIndexColumn()
            ->addColumn('action', function ($users){
                $txt = "";
                $txt .= '<a data-id="' . $users->id . '" class="icon-warning btn btn-xs btn-warning btn-edit" data-tooltip="tooltip" data-placement="top" title="Chỉnh sửa"/><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>';
                $txt .= '<a data-id="' . $users->id . '" class="icon-danger btn btn-xs btn-danger btn-delete" data-tooltip="tooltip" data-placement="top" title="Xóa"/><i class="fas fa-trash-alt" aria-hidden="true"></i></a>';

                return $txt;
            })
            ->editColumn('status', function ($users) {
                $txt = '';
                if ($users->status == 1) {
                    $txt = 'Active';
                } else {
                    $txt = 'Deactivate';
                }
                return $txt;
            })
            ->editColumn('position', function ($users) {
                $txt = '';
                if ($users->position == 2) {
                    $txt = 'Giảng viên';
                } else {
                    $txt = 'Admin';
                }
                return $txt;
            })
            ->make(true);

    }
    public function delete(Request $request) {
        DB::beginTransaction();

        try {

            $user = User::find($request->id)->delete();
            
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
            User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'mobile' => $data['mobile'],
                'address' => $data['address'],
                'gender' => $data['gender'],
                'position' => $data['position'],
                'password' => Hash::make('123456789')
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
