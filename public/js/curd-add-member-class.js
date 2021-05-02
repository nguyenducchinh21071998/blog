$(document).ready(function() {
    var timeout;
    var delay = 500;   // 2 seconds
    if ($("#search_student").val() != null) {
        $('#search_student').keyup(function(e) {
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
            var value_search =$("#search_student").val();
            var id_classRoom=$("#id_classRoom").val();
            var url = id_classRoom+'/search-student';
                $.ajax({
                    type: 'get',
                    url: url,
                    data: {
                        'value_search' : value_search
                    },
                    success: function(data) {
                        console.log(data);
                        $("#data-search").html('');
                        $("#data-search").append(data);
                    },
                })            
            }, delay);
        });
    }
    $("#search_student").on('focus',function(){
        $(".error_student").hide();
    });

    $("#btn-add-student").on('click',function(){
        $("#frm-add-student").trigger('reset');
        $('#frm-add-student button[type="submit"]').prop('disabled', false);
        $(".error_student").hide();
        $(".student-unselect").hide();
    });

//tìm kiếm student
    $("#data-search").delegate('.student-select','click',function(){
        var id_student= $(this).data('id');
        $("#list-student").hide();
        $("#student_id").val(id_student);
        $("#search_student").val($(this).html());
    });
// không tìm thấy kết quả
    $("#data-search").delegate('.student-unselect','click',function(){
        $("#list-student").hide();
        $("#search_student").val('');
        $("#student_id").val('');
    });
// add student
    $("#frm-add-student").on('submit', function(e) {
        var id_classRoom =$("#id_classRoom").val();

        $('#frm-add-student button[type="submit"]').prop('disabled', true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = $("#frm-add-student").serialize();
        
        var url = id_classRoom+'/add-student-class';
        $.ajax({
            type: 'post',
            url: url,
            data: formData,
            success: function(data) {
                console.log(data);
                if (data.error_unselect != undefined) {
                    $('#frm-add-student button[type="submit"]').prop('disabled', false);
                    $('.error_student').show().text(data.error_unselect);
                    
                }else
                if (data.error != undefined) {
                    toastr["error"](data.error);
                    $('#frm-add-student button[type="submit"]').prop('disabled', false);
                } else {
                    $("#content_list_student").html('');
                    $("#content_list_student").append(data);
                    $("#student-modal-add").modal('hide');
                    toastr["success"]("Thêm mới học viên thành công !!");
                    $('#frm-add-student button[type="submit"]').prop('disabled', false);

                }
            },
            error: function(data) {
                toastr["error"]("Thêm mới học viên không thành công !!");
            }
        })
    });
// delete student
    $("#content_list_student").delegate('.btn-del-student-class','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('input[name="_token"]').val()
            }
        });
        //edit ok
        var id_student = $(this).data('id');
        var id_classRoom=$("#id_classRoom").val();  
        var url = id_classRoom+'/delete-sudent-class';
        swal({
                title: "Bạn có chắc chắn muốn xoá?",
                text: "Bạn sẽ không thể khôi phục lại bản ghi này!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal("Xoá thành công", "success");
                    $.ajax({
                        type: 'delete',
                        url: url,
                        data: {
                            'id_student': id_student,
                            'id_classRoom' : id_classRoom,
                        },
                        success: function(data) {
                            console.log(data);
                         toastr["success"]("Xóa học viên thành công !!");
                         $("#content_list_student").html('');
                         $("#content_list_student").append(data);                        
                        }
                    });
                }else{
                    toastr["warning"]("Thao tác đã bị hủy !!");
                }
            });  

    });
// search student in class
    
        $('#search_student_class').keyup(function(e1) {
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
            var value_search_student =$("#search_student_class").val();
            var id_classRoom=$("#id_classRoom").val();
            var url = id_classRoom+'/search-student-class?keyword=' + value_search_student;

                $.ajax({
                    type: 'get',
                    url: url,
                    cache: false,
                    success: function(data) {
                        console.log(data);
                        $("#content_list_student").html('');
                        $("#content_list_student").append(data);
                    },
                })             
            }, delay);
        });
// call modal add manager class
$("#btn-add-manager").on('click',function(){
    $("#manager-modal-add").modal("show");
        $("#frm-add-manager").trigger('reset');
        $('#frm-add-manager button[type="submit"]').prop('disabled', false);
        $(".error_manager").hide();
        $(".manager-unselect").hide();
        $(".manager-select").hide();
        $("#manager_id").val('');
});

// search manager class
        $('#search_manager').keyup(function(e1) {
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
            var value_search_manager =$("#search_manager").val();
            var id_classRoom=$("#id_classRoom").val();
            var url = id_classRoom+'/search-user-add-class?keyword=' + value_search_manager;

                $.ajax({
                    type: 'get',
                    url: url,
                    cache: false,
                    success: function(data) {
                        console.log(data);
                        $("#data-search-manager").html('');
                        $("#data-search-manager").append(data);
                    },
                })             
            }, delay);
        }); 
//tìm kiếm user
    $("#data-search-manager").delegate('.manager-select','click',function(){
        var id_user= $(this).data('id');
        $("#list-manager").hide();
        $("#manager_id").val(id_user);
        $("#search_manager").val($(this).html());
    });
// không tìm thấy kết quả
    $("#data-search-manager").delegate('.manager-unselect','click',function(){
        $("#list-manager").hide();
        $("#search_manager").val('');
        $("#manager_id").val('');
    });  
// add manager
// add student
    $("#frm-add-manager").on('submit', function(e) {
        var id_classRoom =$("#id_classRoom").val();

        $('#frm-add-manager button[type="submit"]').prop('disabled', true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = $("#frm-add-manager").serialize();
        
        var url = id_classRoom+'/add-manager-class';
        $.ajax({
            type: 'post',
            url: url,
            data: formData,
            success: function(data) {
                console.log(data);
                if (data.error_unselect_manager != undefined) {
                    $('#frm-add-manager button[type="submit"]').prop('disabled', false);
                    $('.error_manager').show().text(data.error_unselect_manager);
                    
                }else
                if (data.error != undefined) {
                    toastr["error"](data.error);
                    $('#frm-add-manager button[type="submit"]').prop('disabled', false);
                } else {
                    $("#content_list_manager").html('');
                    $("#content_list_manager").append(data);
                    $("#manager-modal-add").modal('hide');
                    toastr["success"]("Thêm mới quản lý thành công !!");
                    $('#frm-add-manager button[type="submit"]').prop('disabled', false);

                }
            },
            error: function(data) {
                toastr["error"]("Thêm mới quản lý không thành công !!");
            }
        })
    }); 
});