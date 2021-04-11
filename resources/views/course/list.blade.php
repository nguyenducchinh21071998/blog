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
                            <span class="caption-subject bold uppercase"> Danh sách khóa học</span>
                            {{-- {{ dd($semesters) }} --}}
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
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="course_list">
                        <thead>
                            <tr>
                                <th style="text-align: center;"> STT</th>
                                <th style="text-align: center;"> Hành động</th>
                                <th style="text-align: center;"> Tên khóa học </th>
                                <th style="text-align: center;"> Học Kì </th>
                                <th style="text-align: center;"> Mô tả</th>
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
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Tạo mới khóa học</h4>
                </div>
                <div class="modal-body">
                    <form  action="" id="frmCreateUser" name="frmCreateUser" method="POST" enctype="multipart/form-data" autocomplete="off">
                        {{ csrf_field() }}
                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('nameCourse') ? 'has-error' : '' }}">
                                <label for="nameCourse">Tên khóa học<span class="requireds" style="color: red"> (*)</span></label>
                                <input type="text" class="form-control" id="nameCourse" name="nameCourse">
                            </div>
                        </div>

                        <div class="col-md-12">
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

                        <div class="col-md-12">
                            <div class="form-group form-md-line-input form-md-floating-label {{ $errors->has('description') ? 'has-error' : '' }}">
                                <label for="description">Mô tả</label>
                                <input type="text" class="form-control" id="description" name="description">
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

    var table = $('#course_list').DataTable({ 
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: '/course/list',
            type: 'get',
        },
        pageLength: 30,
        lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
        order: [],
        searching: true,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false, 'class':'tx-center column-action', 'width': '5%'},
            {data: 'action', className: 'tx-center action-column'},
            {data: 'name'},
            {data: 'semester_id'},
            {data: 'description', className: 'tx-center'},  
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
            url: '/course/delete',
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
          url: '/course/store',
          type: 'POST',
          data: {
            name: $('#nameCourse').val(),
            semester_id: $('#semester_id').val(),
            description: $('#description').val(),
          },
          success: function (res)
          {
            if (!res.error) {
              toastr.success(res.message);
              $('#create').modal('hide');
              $('#course_list').DataTable().ajax.reload(null,false);
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
            url: '/course/edit/' + id,
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
          url: '/course/update',
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
              $('#course_list').DataTable().ajax.reload(null,false);
            } else {
              toastr.error(res.message);
            }
          }
        });
    });
</script>
@endsection