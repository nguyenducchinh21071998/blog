@extends('layouts.master')
@section('header')
@endsection
@section('content')
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-9 cutomize">
            <div class="portlet light bordered" style="margin-top: 35px;">
                <div class="portlet-title">
                    <div class="caption font-dark">
                        <i class="icon-settings font-dark"></i>
                        <h2>
                            <span class="caption-subject bold uppercase"> Danh sách người dùng</span>
                        </h2>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="row" style="margin-top: 20px; margin-bottom: 27px;">
                        <div class="col-md-6">
                            <div class="btn-group">
                                @if (Auth::user()->position == 2)
                                    <button id="create_btn" class="btn btn-sm btn-success sbold green" style="padding-right: 20px;">
                                        <i class="fa fa-plus"></i> Tạo lịch dạy thay
                                    </button>
                                @endif
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="user_list">
                        <thead>
                            <tr>
                                <th style="text-align: center;"> STT</th>
                                <th style="text-align: center;"> Hành động</th>
                                <th style="text-align: center;"> Lớp </th>
                                <th style="text-align: center;"> Lý do</th>
                                <th style="text-align: center;"> Người tạo</th>
                                <th style="text-align: center;"> Người dạy thay</th>
                                <th style="text-align: center;"> Người duyệt </th>
                                <th style="text-align: center;"> Trạng thái </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="detail">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" align="center">
                    <h4 class="modal-title uppercase" > Tạo lịch dạy thay </h4>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th style="width: 30%">Lớp</th>
                                    <td id="class_room_idDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Lý do </th>
                                    <td id="reasonDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Người tạo</th>
                                    <td id="teacherIdDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Người dạy thay</th>
                                    <td id="teacher_replace_idDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Người duyệt </th>
                                    <td id="userIdDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Ngày dạy thay </th>
                                    <td id="replacement_dayDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Trạng thái</th>
                                    <td id="statusDetail"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer" style="justify-content: center;">
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="create">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Tạo lịch dạy thay </h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmCreateUser" name="frmCreateUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('userName') ? 'has-error' : '' }}">
                                <label for="reason">Lý do<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="reason" name="reason">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('class_room_id') ? 'has-error' : '' }}">
                                <label for="class_room_id">Lớp<span class="requireds" style="color: red"> (*)</span></label>
                                <select  id = "class_room_id" class="form-control" name="class_room_id">
                                    <option value="">Chọn</option>
                                    @foreach($classRooms as $db)
                                    <option value="{{$db->id}}">{{$db->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('teacher_replace_id') ? 'has-error' : '' }}">
                                <label for="teacher_replace_id">Số điện thoại<span class="requireds" style="color: red"> (*)</span></label>
                                <select  id = "teacher_replace_id" class="form-control" name="teacher_replace_id">
                                    <option value="">Chọn</option>
                                    @foreach($teachers as $db)
                                    <option value="{{$db->id}}">{{$db->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('replacement_day') ? 'has-error' : '' }}">
                                <label for="replacement_day">Thời gian<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="replacement_day" name="replacement_day">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" style="justify-content: center;">
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-sm btn-success green" id="btn-add"> Thêm mới</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="edit">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">CHỈNH SỬA lịch dạy thay</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmEditUser" name="frmEditUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        <input type="hidden" class="form-control" id="id" name="id">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('reasonEdit') ? 'has-error' : '' }}">
                                <label for="reasonEdit">Lý do<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="reasonEdit" name="reasonEdit">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('class_room_idEdit') ? 'has-error' : '' }}">
                                <label for="class_room_idEdit">Lớp<span class="requireds" style="color: red"> (*)</span></label>
                                <select  id = "class_room_idEdit" class="form-control" name="class_room_idEdit">
                                    <option value="">Chọn</option>
                                    @foreach($classRooms as $db)
                                    <option value="{{$db->id}}">{{$db->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('teacher_replace_idEdit') ? 'has-error' : '' }}">
                                <label for="teacher_replace_idEdit">Số điện thoại<span class="requireds" style="color: red"> (*)</span></label>
                                <select  id = "teacher_replace_idEdit" class="form-control" name="teacher_replace_idEdit">
                                    <option value="">Chọn</option>
                                    @foreach($teachers as $db)
                                    <option value="{{$db->id}}">{{$db->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('replacement_dayEdit') ? 'has-error' : '' }}">
                                <label for="replacement_dayEdit">Thời gian<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="replacement_dayEdit" name="replacement_dayEdit">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" style="justify-content: center;">
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-sm btn-warning green" id="btn-update"> Cập nhật</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('footer')
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#frmCreateUser #replacement_day').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmCreateUser',
        zIndexOffset: 10000,
        startDate: '0d'
    });
    $('#frmCreateUser #replacement_dayEdit').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmEditUser',
        zIndexOffset: 10000,
        startDate: '0d'
    });

    var table = $('#user_list').DataTable({
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: '/teach-class-replace/list',
            type: 'get',
        },
        pageLength: 30,
        lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
        order: [],
        searching: true,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false, 'class':'tx-center column-action', 'width': '5%'},
            {data: 'action', className: 'tx-center action-column'},
            {data: 'class_room_id'},
            {data: 'reason'},
            {data: 'teacher_id'},
            {data: 'teacher_replace_id', className: 'tx-center'},
            {data: 'user_confirm_id', className: 'tx-center'},
            {data: 'status', className: 'tx-center'},
        ]
    });
    $(document).on('click', '.btn-delete', function(){
        var id = $(this).attr('data-id');

        swal({
          title: "Bạn có chắc muốn xóa?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Không",
          confirmButtonText: "Có",
        },
        function() {
          $.ajax({
            url: '/teach-class-replace/delete',
            type: "POST",
            data: {
              id: id
            },
            success: function(res){
              if(res.error == false){
                toastr.success(res.message);
              }else{
                toastr.error(res.message);
              }

              $('#user_list').DataTable().ajax.reload(null,false);
            }, error: function(error){
              toastr.error(error);
            }
          })

        });
    });
    $(document).on('click', '.btn-update-replace', function(){
        var id = $(this).attr('data-id');

        swal({
          title: "Bạn có chắc muốn duyệt đơn?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Không",
          confirmButtonText: "Có",
        },
        function() {
          $.ajax({
            url: '/teach-class-replace/update-replace',
            type: "POST",
            data: {
              id: id
            },
            success: function(res){
              if(res.error == false){
                toastr.success(res.message);
              }else{
                toastr.error(res.message);
              }

              $('#user_list').DataTable().ajax.reload(null,false);
            }, error: function(error){
              toastr.error(error);
            }
          })

        });
    });

    $('#create_btn').on('click',function () {
        $('#create').modal('show');
    });


    $('#btn-add').on('click', function (event) {
        event.preventDefault();
        $.ajax({
          url: '/teach-class-replace/store',
          type: 'POST',
          data: {
            class_room_id: $('#class_room_id').val(),
            teacher_replace_id: $('#teacher_replace_id').val(),
            replacement_day: $('#replacement_day').val(),
            reason: $('#reason').val(),
          },
          success: function (res)
          {
            if (!res.error) {
              toastr.success(res.message);
              $('#create').modal('hide');
              $('#user_list').DataTable().ajax.reload(null,false);
            } else {
              toastr.error(res.message);
            }
          }
        });
    });
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr('data-id');
        $('#edit').modal('show');

        $.ajax({
            type: 'get',
            url: '/teach-class-replace/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                console.log(res.data);
                $('#id').val(res.data.id);
                $('#class_room_idEdit').val(res.data.class_room_id);
                $('#teacher_replace_idEdit').val(res.data.teacher_replace_id);
                $('#replacement_dayEdit').val(res.data.replacement_day);
                $('#reasonEdit').val(res.data.reason);

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError);
            }
        });
    });
    $('#btn-update').on('click', function (event) {
        event.preventDefault();
        $.ajax({
          url: '/teach-class-replace/update',
          type: 'POST',
          data: {
            id: $('#id').val(),
            class_room_id: $('#class_room_idEdit').val(),
            teacher_replace_id: $('#teacher_replace_idEdit').val(),
            replacement_day: $('#replacement_dayEdit').val(),
            reason: $('#reasonEdit').val(),
          },
          success: function (res)
          {
            if (!res.error) {
              toastr.success(res.message);
              $('#edit').modal('hide');
              $('#user_list').DataTable().ajax.reload(null,false);
            } else {
              toastr.error(res.message);
            }
          }
        });
    });
    $(document).on('click', '.btn-detail', function () {
        var id = $(this).attr('data-id');
        $('#detail').modal('show');

        $.ajax({
            type: 'get',
            url: '/teach-class-replace/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $('#id').html(res.data.id);
                $('#class_room_idDetail').html(res.data.className);
                $('#reasonDetail').html(res.data.reason);
                $('#teacherIdDetail').html(res.data.userNameTeacher);
                $('#teacher_replace_idDetail').html(res.data.userNameTeacherRepace);
                $('#userIdDetail').html(res.data.userNameTeacherConfirm);
                $('#replacement_dayDetail').html(res.data.replacement_day);
                if (res.data.status == 1) {
                    $('#statusDetail').html("Đang chờ xác nhận");
                } else {
                    $('#statusDetail').html("Đã duyệt");
                }

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError);
            }
        });
    });
</script>
@endsection
