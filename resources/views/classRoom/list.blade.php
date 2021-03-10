@extends('layouts.master')
@section('header')
@endsection
@section('content')
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-10">
            <div class="portlet light bordered" style="margin-top: 35px;">
                <div class="portlet-title">
                    <div class="caption font-dark">
                        <i class="icon-settings font-dark"></i>
                        <h2>
                            <span class="caption-subject bold uppercase"> Danh sách lớp học</span>
                        </h2>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="row" style="margin-top: 20px; margin-bottom: 27px;">
                        <div class="col-md-6">
                            <div class="btn-group">
                                <button id="create_btn" class="btn btn-sm btn-success sbold green" style="padding-right: 20px;"> 
                                    <i class="fa fa-plus"></i> Tạo mới lớp học   
                                </button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="class_list">
                        <thead>
                            <tr>
                                <th style="text-align: center;"> STT</th>
                                <th style="text-align: center;"> Hành động</th>
                                <th style="text-align: center;"> Tên khóa học </th>
                                <th style="text-align: center;"> Tên lớp học </th>
                                <th style="text-align: center;"> Giảng viên </th>
                                <th style="text-align: center;"> Loại lớp học </th>
                                <th style="text-align: center;"> Trạng thái lớp học </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="create">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Tạo mới lớp học</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmCreateClass" name="frmCreateClass" method="POST" enctype="multipart/form-data" autocomplete="off">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('semester_id') ? 'has-error' : '' }}">
                                    <label for="semester_id">Học kì<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "semester_id" class="form-control" name="semester_id">
                                        <option value="">Chọn</option>
                                        @foreach($semesters as $db)
                                        <option value="{{$db->id}}">{{$db->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('course_id') ? 'has-error' : '' }}">
                                    <label for="course_id">Khóa học<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "course_id" class="form-control" name="course_id">
                                        <option value="">Chọn</option>
                                        {{-- @foreach($semesters as $db)
                                        <option value="{{$db->id}}">{{$db->name}}</option>
                                        @endforeach --}}
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('nameClass') ? 'has-error' : '' }}">
                                    <label for="nameClass">Tên lớp học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="nameClass" name="nameClass">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('teacher_id') ? 'has-error' : '' }}">
                                    <label for="teacher_id">Giảng viên<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "teacher_id" class="form-control" name="teacher_id">
                                        <option value="">Chọn</option>
                                        @foreach($users as $db)
                                        <option value="{{$db->id}}">{{$db->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('type_class') ? 'has-error' : '' }}">
                                    <label for="type_class">Loại lớp học<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "type_class" class="form-control" name="type_class">
                                        <option value="">Chọn</option>
                                        <option value="1">Thực hành</option>
                                        <option value="2">Lí thuyết</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('status_class') ? 'has-error' : '' }}">
                                    <label for="status_class">Trạng thái lớp học<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "status_class" class="form-control" name="status_class" disabled>
                                        <option value="1">Chưa diễn ra</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('schedule') ? 'has-error' : '' }}">
                                    <label for="schedule">Lịch học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="schedule" name="schedule">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('department_id') ? 'has-error' : '' }}">
                                    <label for="department_id">Phòng học</label>
                                    <select  id = "department_id" class="form-control" name="department_id">
                                        <option value="">Chọn</option>
                                        @foreach($departments as $db)
                                        <option value="{{$db->id}}">{{$db->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('start_date') ? 'has-error' : '' }}">
                                    <label for="start_date">Thời gian bắt đầu<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="start_date" name="start_date">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('end_date') ? 'has-error' : '' }}">
                                    <label for="end_date">Thời gian kết thúc<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="end_date" name="end_date">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('total_student') ? 'has-error' : '' }}">
                                    <label for="total_student">Số lượng sinh viên<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="total_student" name="total_student">
                                </div>
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
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">CHỈNH SỬA khóa học</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmEditUser" name="frmEditUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        <input type="hidden" class="form-control" id="id" name="id">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('nameCourseEdit') ? 'has-error' : '' }}">
                                <label for="nameCourseEdit">Tên khóa học<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="nameCourseEdit" name="nameCourseEdit">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('semesterIdEdit') ? 'has-error' : '' }}">
                                <label for="semesterIdEdit">Học kì<span class="requireds" style="color: red"> (*)</span></label>
                                <select  id = "semesterIdEdit" class="form-control" name="semesterIdEdit">
                                    <option value="">Chọn</option>
                                    @foreach($semesters as $db)
                                    <option value="{{$db->id}}">{{$db->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('description') ? 'has-error' : '' }}">
                                <label for="descriptionEdit">Mô tả</label>
                                <input type="text" class="form-control" id="descriptionEdit" name="descriptionEdit">
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
    $('#frmCreateClass #end_date').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmCreateClass',
        zIndexOffset: 10000,
        startDate: '0d'
    });
    $('#frmCreateClass #start_date').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmCreateClass',
        zIndexOffset: 10000,
        startDate: '0d'
    });
    var table = $('#class_list').DataTable({ 
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: '/class-room/list',
            type: 'get',
        },
        pageLength: 30,
        lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
        order: [],
        searching: true,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false, 'class':'tx-center column-action', 'width': '5%'},
            {data: 'action', className: 'tx-center action-column'},
            {data: 'course_id'},
            {data: 'name'},
            {data: 'teacher_id'},
            {data: 'type_class'},
            {data: 'status_class', className: 'tx-center'},  
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
            url: '/class-room/delete',
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

              $('#course_list').DataTable().ajax.reload(null,false);
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
          url: '/class-room/store',
          type: 'POST',
          data: {
            name: $('#nameClass').val(),
            semester_id: $('#semester_id').val(),
            course_id: $('#course_id').val(),
            teacher_id: $('#teacher_id').val(),
            type_class: $('#type_class').val(),
            status_class: $('#status_class').val(),
            schedule: $('#schedule').val(),
            department_id: $('#frmCreateClass #department_id').val(),
            start_date: $('#start_date').val(),
            end_date: $('#end_date').val(),
            total_student: $('#total_student').val(),
          },
          success: function (res)
          {
            if (!res.error) {
              toastr.success(res.message);
              $('#create').modal('hide');
              $('#class_list').DataTable().ajax.reload(null,false);
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
            url: '/class-room/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $('#id').val(res.data.id);
                $('#nameCourseEdit').val(res.data.name);
                $('#descriptionEdit').val(res.data.description);
                $('#semesterIdEdit').val(res.data.semester_id);

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError); 
            }
        });
    });
    $('#btn-update').on('click', function (event) {
        event.preventDefault();
        $.ajax({
          url: '/class-room/update',
          type: 'POST',
          data: {
            id: $('#id').val(),
            name: $('#nameCourseEdit').val(),
            semester_id: $('#semesterIdEdit').val(),
            description: $('#descriptionEdit').val(),
          },
          success: function (res)
          {
            if (!res.error) {
              toastr.success(res.message);
              $('#edit').modal('hide');
              $('#class_list').DataTable().ajax.reload(null,false);
            } else {
              toastr.error(res.message);
            }
          }
        });
    });
    $( "#semester_id" ).change(function() {
        var id = $('#semester_id').val();
        $.ajax({
            type: 'get',
            url: '/get-course-by-semester/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $.each(res.data, function(i, value) {
                    $('#course_id').append('<option value="'+ value.id+'">'+ value.name +'</option>');
                });

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError); 
            }
        });
    });
</script>
@endsection