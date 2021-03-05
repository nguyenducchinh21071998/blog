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
                            <span class="caption-subject bold uppercase"> Danh sách User</span>
                        </h2>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="row" style="margin-top: 20px; margin-bottom: 27px;">
                        <div class="col-md-6">
                            <div class="btn-group">
                                <button id="create_btn" class="btn btn-sm btn-success sbold green" style="padding-right: 20px;"> 
                                    <i class="fa fa-plus"></i> Tạo mới khóa học   
                                </button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="user_list">
                        <thead>
                            <tr>
                                <th style="text-align: center;"> STT</th>
                                <th style="text-align: center;"> Hành động</th>
                                <th style="text-align: center;"> Họ và tên </th>
                                <th style="text-align: center;"> Email </th>
                                <th style="text-align: center;"> Số điện thoại</th>
                                <th style="text-align: center;"> Vai trò </th>
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
            <div class="overlay"></div>
            <div class="modal-content responsemodal127">
            <div class="modal-header" align="center">
                <h4 class="modal-title uppercase" > Thông tin chi tiết</h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                <div class="col-md-12">
                    <table class="table table-bordered">
                    <tbody>

                        <tr>
                        <th style="width: 30%">Tên khóa học</th>
                        <td id="name"></td>
                        </tr>

                        <tr>
                        <th style="width: 30%">Tên viết tắt</th>
                        <td id="short_name"></td>
                        </tr>

                        <tr>
                        <th style="width: 30%">Mã khóa học</th>
                        <td id="code_url"></td>
                        </tr>

                        <tr style="width: 30%">
                        <th>Học phí</th>
                        <td id="tuition"></td>
                        </tr>
                        <tr style="width: 30%">
                        <th>Bảo lưu</th>
                        <td id="type"></td>
                        </tr>
                        <tr style="width: 30%">
                        <th>Số tiền bảo lưu (VNĐ)</th>
                        <td id="reserve_amount"></td>
                        </tr>
                        {{-- 
                        <tr>
                        <th>Thông tin khóa học</th>
                        <td id="class_info"></td>
                        </tr>

                        <tr>
                        <th>Nội dung</th>
                        <td id="content">
                            <div class="content">

                            </div>

                            <a id="view-more" style="margin-right: 20px; float: right; display: none;"> ... Xem thêm</a>

                            <a id="hide" style="margin-right: 20px; float: right; display: none;"> ... Ẩn</a>
                        </td>
                        </tr> --}}

                        <tr style="width: 30%">
                        <th>Chính sách giảm học phí</th>
                        <td id="policy">
                            <div class="content2">

                            </div>
                        </td>
                        </tr>

                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <center>
                <button type="button" class="btn btn-sm btn-danger close-form" data-dismiss="modal">Đóng</button>
                </center>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="create">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Tạo mới tài khoản</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmCreateUser" name="frmCreateUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('userName') ? 'has-error' : '' }}">
                                <label for="userName">Họ và tên<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="userName" name="userName">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('code') ? 'has-error' : '' }}">
                                <label for="email">Email<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="email" name="email">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('mobile') ? 'has-error' : '' }}">
                                <label for="mobile">Số điện thoại<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="mobile" name="mobile">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('address') ? 'has-error' : '' }}">
                                <label for="address">Địa chỉ<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="address" name="address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('gender') ? 'has-error' : '' }}">
                                <label for="mobile">Giới tính<span class="requireds" style="color: red"> (*)</span></label>
                                <select class="form-control" name="gender" id="gender">
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label ">
                                <label for="tuition_course">Vai trò<span class="requireds" style="color: red"> (*)</span></label>
                                <select class="form-control" name="position" id="position">
                                    <option value="2">Giáo viên </option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
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
                    <h4 class="modal-title">CHỈNH SỬA tài khoản</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmEditUser" name="frmEditUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        <input type="hidden" class="form-control" id="id" name="id">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <label for="userNameEdit">Họ và tên<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="userNameEdit" name="userNameEdit">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <label for="emailEdit">Email<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="emailEdit" name="emailEdit">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <label for="mobileEdit">Số điện thoại<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="mobileEdit" name="mobileEdit">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <label for="addressEdit">Địa chỉ<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="addressEdit" name="addressEdit">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label">
                                <label for="genderEdit">Giới tính<span class="requireds" style="color: red"> (*)</span></label>
                                <select class="form-control" name="genderEdit" id="genderEdit">
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label ">
                                <label for="positionEdit">Vai trò<span class="requireds" style="color: red"> (*)</span></label>
                                <select class="form-control" name="positionEdit" id="positionEdit">
                                    <option value="2">Giáo viên </option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label ">
                                <label for="statusEdit">Trạng thái<span class="requireds" style="color: red"> (*)</span></label>
                                <select class="form-control" name="statusEdit" id="statusEdit">
                                    <option value="1">Active</option>
                                    <option value="2">Deactivate</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
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

    var table = $('#user_list').DataTable({ 
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: '/user/list',
            type: 'post',
        },
        pageLength: 30,
        lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
        order: [],
        searching: true,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false, 'class':'tx-center column-action', 'width': '5%'},
            {data: 'action', className: 'tx-center action-column'},
            {data: 'name'},
            {data: 'email'},
            {data: 'mobile', className: 'tx-center'},
            {data: 'position', className: 'tx-center'},
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
            url: '/user/delete',
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
          url: '/user/store',
          type: 'POST',
          data: {
            name: $('#userName').val(),
            email: $('#email').val(),
            mobile: $('#mobile').val(),
            address: $('#address').val(),
            gender: $('#gender').val(),
            position: $('#position').val(),
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
            url: '/user/edit/' + id,
            data:   {
                id: id,
            },
            success: function (res) {
                $('#id').val(res.data.id);
                $('#userNameEdit').val(res.data.name);
                $('#emailEdit').val(res.data.email);
                $('#mobileEdit').val(res.data.mobile);
                $('#addressEdit').val(res.data.address);
                $('#genderEdit').val(res.data.gender);
                $('#positionEdit').val(res.data.position);
                $('#statusEdit').val(res.data.status);

            },error: function (xhr, ajaxOptions, thrownError) {
                toastr["error"](thrownError); 
            }
        });
    });
    $('#btn-update').on('click', function (event) {
        event.preventDefault();
        $.ajax({
          url: '/user/update',
          type: 'POST',
          data: {
            id: $('#id').val(),
            name: $('#userNameEdit').val(),
            email: $('#emailEdit').val(),
            mobile: $('#mobileEdit').val(),
            address: $('#addressEdit').val(),
            gender: $('#genderEdit').val(),
            position: $('#positionEdit').val(),
            status: $('#statusEdit').val(),
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
</script>
@endsection