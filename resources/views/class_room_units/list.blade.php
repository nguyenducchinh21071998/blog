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
                            <span class="caption-subject bold uppercase"> Danh sách buổi học</span>
                        </h2>
                        <input type="hidden" name="class_id" id="class_id" value="{{ $class_id }}">
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="row" style="margin-top: 20px; margin-bottom: 27px;">
                        <div class="col-md-6">
                            <div class="btn-group">
                                @if (Auth::user()->position == 1)
                                    <button id="create_btn" class="btn btn-sm btn-success sbold green" style="padding-right: 20px;">
                                        <i class="fa fa-plus"></i> Tạo mới buổi học
                                    </button>
                                @endif
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="class_list">
                        <thead>
                            <tr>
                                <th style="text-align: center;"> STT</th>
                                <th style="text-align: center;"> Hành động</th>
                                <th style="text-align: center;"> Buổi học </th>
                                <th style="text-align: center;"> Tên buổi học </th>
                                <th style="text-align: center;"> Thời gian học </th>
                                <th style="text-align: center;"> Phòng học </th>
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
    <div class="modal fade" id="create">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Tạo mới buổi học</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmCreateClass" name="frmCreateClass" method="POST" enctype="multipart/form-data" autocomplete="off">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group form-md-line-nput form-md-floating-label">
                                    <label for="unit">Buổi học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="unit" name="unit">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-nput form-md-floating-label">
                                    <label for="nameUnit">Tên buổi học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="nameUnit" name="nameUnit">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-input form-md-floating-label ">
                                    <label for="startDate">Ngày bắt đầu<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="startDate" name="startDate">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-input form-md-floating-label ">
                                    <label for="note">Ghi chú<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="note" name="note">
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
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">CHỈNH SỬA buổi học</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmEditUser" name="frmEditUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        <input type="hidden" class="form-control" id="id" name="id">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group form-md-line-nput form-md-floating-label">
                                    <label for="unitEdit">Buổi học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="unitEdit" name="unitEdit">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-nput form-md-floating-label">
                                    <label for="nameUnitEdit">Tên buổi học<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="nameUnitEdit" name="nameUnitEdit">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-input form-md-floating-label ">
                                    <label for="startDateEdit">Ngày bắt đầu<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="startDateEdit" name="startDateEdit">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-input form-md-floating-label ">
                                    <label for="statusUnitEdit">Trạng thái<span class="requireds" style="color: red"> (*)</span></label>
                                    <select  id = "statusUnitEdit" class="form-control" name="statusUnitEdit">
                                        <option value="">Chọn</option>
                                        <option value="1">Chưa diễn ra</option>
                                        <option value="2">Đã hoàn thành</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-md-line-input form-md-floating-label ">
                                    <label for="noteEdit">Ghi chú<span class="requireds" style="color: red"> (*)</span></label>
                                    <input type="text" class="form-control" id="noteEdit" name="noteEdit">
                                </div>
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
    <div class="modal fade" id="detail">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" align="center">
                    <h4 class="modal-title uppercase" > Chi tiết buổi học </h4>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th style="width: 30%">Buổi</th>
                                    <td id="unitDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Tên buổi học</th>
                                    <td id="nameDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Ngày bắt đầu </th>
                                    <td id="startDateDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Trạng thái</th>
                                    <td id="statusDetail"></td>
                                </tr>
                                <tr>
                                    <th style="width: 30%">Ghi chú</th>
                                    <td id="noteDetail"></td>
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

@endsection

@section('footer')
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    // $.datetimepicker.setLocale('vi');
    // $('#frmCreateClass #startDate').datetimepicker({
    //     format: 'H:i d/m/Y',
    //     autoclose: true,
    //     minDate: 0,
    // });
    $('#frmCreateClass #startDate').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmCreateClass',
        zIndexOffset: 10000,
        startDate: '0d'
    });
    $('#frmEditUser #startDateEdit').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        container: '#frmEditUser',
        zIndexOffset: 10000,
        startDate: '0d'
    });
    var id = $('#class_id').val();
    var table = $('#class_list').DataTable({
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: '/class-room-unit/list/' + id,
            type: 'get',
        },
        pageLength: 30,
        lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
        order: [],
        searching: true,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false, 'class':'tx-center column-action', 'width': '5%'},
            {data: 'action', className: 'tx-center action-column'},
            {data: 'unit'},
            {data: 'name'},
            {data: 'start_date'},
            {data: 'department'},
            {data: 'status_class_unit', className: 'tx-center'},
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
            url: '/class-room-unit/delete',
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
          url: '/class-room-unit/store',
          type: 'POST',
          data: {
            unit: $('#unit').val(),
            name: $('#nameUnit').val(),
            start_date: $('#startDate').val(),
            note: $('#note').val(),
            class_room_id: $('#class_id').val()
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
            url: '/class-room-unit/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $('#id').val(res.data.id);
                $('#unitEdit').val(res.data.unit);
                $('#nameUnitEdit').val(res.data.name);
                $('#startDateEdit').val(res.data.start_date);
                $('#statusUnitEdit').val(res.data.status_class_unit);
                $('#noteEdit').val(res.data.note);

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError);
            }
        });
    });
    $('#btn-update').on('click', function (event) {
        event.preventDefault();
        $.ajax({
          url: '/class-room-unit/update',
          type: 'POST',
          data: {
            id: $('#id').val(),
            unit: $('#unitEdit').val(),
            name: $('#nameUnitEdit').val(),
            start_date: $('#startDateEdit').val(),
            note: $('#noteEdit').val(),
            status_class_unit: $('#statusUnitEdit').val()
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
    $(document).on('click', '.btn-detail', function () {
        var id = $(this).attr('data-id');
        $('#detail').modal('show');

        $.ajax({
            type: 'get',
            url: '/class-room-unit/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $('#id').html(res.data.id);
                $('#nameDetail').html(res.data.name);
                $('#unitDetail').html(res.data.unit);
                $('#noteDetail').html(res.data.note);
                $('#startDateDetail').html(res.data.start_date);
                if (res.data.status_class_unit == 1) {
                    $('#statusDetail').html("Chưa diễn ra");
                } else {
                    $('#statusDetail').html("Đã hoàn thành");
                }

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError);
            }
        });
    });
    $(document).on('click', '.btn-update-class', function(){
        var id = $(this).attr('data-id');

        swal({
          title: "Bạn có chắc muốn điểm danh lớp học?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Không",
          confirmButtonText: "Có",
        },
        function() {
          $.ajax({
            url: '/class-room-unit/update-status',
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

              $('#class_list').DataTable().ajax.reload(null,false);
            }, error: function(error){
              toastr.error(error);
            }
          })

        });
    });
</script>
@endsection
