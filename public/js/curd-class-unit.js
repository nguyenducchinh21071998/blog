//--------------------------- onclick add new ------------------------
$(document).ready(function() {
    var web = $('meta[name="website"]').attr('content');
    var timeout;
    var delay = 500; 
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

        
    $("#btn-add-unit").on('click touchstart', function() {
        $('.error').hide();
        $('#unit-modal-add').modal('show');
        $("#act-form-unit").removeClass("hide-action-unit");
        $('#frm-add-unit').trigger('reset');
        $('#frm-add-unit button[type="submit"]').prop('disabled', false);
    });

    //btn reset
        $('#btn-reset-select').click(function(){
        // $('#select_theory_group').prop('selectedIndex',0);
            $('#select_theory_group option').prop('selected', function() {
             return this.defaultSelected;
             });
            var id_unit=$("#number_unit").val();
            var url='' + id_unit + '/reset-table-theory';
                $.ajax({
            type: 'get',
            url: url,
            cache: false,
            success: function(data) {
                console.log(data);
                $("#table_theory_content").html('');
                $("#table_theory_content").append(data);

            }
        })
    })
    //--------------------------Submit add new unit-----------------------
    $("#frm-add-unit").on('submit', function(e) {
        var id_classRoom =$("#id_classRoom").val();

        $('#frm-add-unit button[type="submit"]').prop('disabled', true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = $('#frm-add-unit').serialize();
        var url = id_classRoom+'/add-unit';
        $.ajax({
            type: 'post',
            url: url,
            data: formData,
            success: function(data) {
                console.log(data);
                if (data.error == true) {
                    $('#frm-add-unit button[type="submit"]').prop('disabled', false);
                    $('.error').hide();
                    if (data.message.unit != undefined) {
                        $('.errorUnit').show().text(data.message.unit[0]);
                    }
                    if (data.message.unit_name != undefined) {
                        $('.errorUnitName').show().text(data.message.unit_name[0]);
                    }
                    if (data.message.status != undefined) {
                        $('.errorStatus').show().text(data.message.status[0]);
                    }
                } else {
                    $("#content_unit").html('');
                    $("#content_unit").append(data);
                    $('#frm-add-unit button[type="submit"]').prop('disabled', true);
                    $('#unit-modal-add').modal('hide');
                    toastr["success"]("Thêm mới Unit thành công !!");
                }
            },
            error: function(data) {
                toastr["error"]("Thêm mới Unit không thành công !!");
            }
        })
    });

    // -------------------------validate unit add------------------------
     $("#unit").on('blur', function(e) {
        var id_classRoom =$("#id_classRoom").val();
        var id_unit_input=$(this).val();
        // if (id_unit_input != "") {
        var url = id_classRoom+'/validate-number-unit';
        $.ajax({
            type: 'get',
            url: url,
            data: {
              'id_classRoom' :id_classRoom,
              'id_unit_input' : id_unit_input
            },
            success: function(data) {
                console.log(data);
                if (data.check_number_unit > 0) {
                   $('.errorUnit').show().text("Số bài học này đã tồn tại !!");
                   $('#frm-add-unit button[type="submit"]').prop('disabled', true);
                } else {
                   $('.error').hide();
                   $('#frm-add-unit button[type="submit"]').prop('disabled', false);
                }
            },
        
        })

        // }

    });   
    //--------------------------Submit Update unit-----------------------
    $("#frmUpdateUnit").on('submit', function(e) {
        $('#frmUpdateUnit button[type="submit"]').prop('disabled', true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        e.preventDefault();
        var id_unit = $("#number_unit").val();
        var formData = $('#frmUpdateUnit').serialize();
        var url = ''+id_unit+'/update-unit';
        $.ajax({
            type: 'put',
            url: url,
            data: formData,
            success: function(data) {
                console.log(data);
                if (data.error == true) {
                    $('#frmUpdateUnit button[type="submit"]').prop('disabled', false);
                    $('.error').hide();
                    if (data.message.unit != undefined) {
                        $('.errorUnit').show().text(data.message.unit[0]);
                    }
                    if (data.message.unit_name != undefined) {
                        $('.errorUnitName').show().text(data.message.unit_name[0]);
                    }
                    if (data.message.status != undefined) {
                        $('.errorStatus').show().text(data.message.status[0]);
                    }
                } else {
                    $('#frmUpdateUnit button[type="submit"]').prop('disabled', true);
                    toastr["success"]("Sửa bài học thành công !!");
                    // $('#act_tab1').removeClass("active");
                    // $('#tab1').removeClass("active");
                    // $('#act_tab2').addClass("active");
                    // $('#tab2').addClass("active");
                    window.location.replace(''+data.unit+'');
                }
            },
            error: function(data) {
                toastr["error"]("Sửa bài học không thành công !!");
            }
        })
    });
    //validate unique Unit
    $("#unit_number").on('blur', function(e) {
        // e.preventDefault();
        var id_unit = $("#number_unit").val();
        var data=$("#unit_number").val();
        // var formData = $('#frmUpdateUnit').serialize();
        var url = id_unit+'/validate-number-unit';

        $.ajax({
            type: 'get',
            url: url,
            data:{'unit_check' :data} ,
            success: function(data) {
                console.log(data);
                if (data.error) {
                    $('.errorUnit').show().text(data.msg);
                }else{
                    $(".error").hide();
                }
            }
        })
    });    
    //------------------------------- filter select box theory------------------------------
    $('#select_theory_group').click(function(e) {
        var id_unit = $(this).data('id');
        var url = '' + id_unit + '/filter-theory-unit?data=' + $(this).val();
        $.ajax({
            type: 'get',
            url: url,
            cache: false,
            success: function(data) {
                console.log(data);
                $("#table_theory_content").html('');
                $("#table_theory_content").append(data);
            }
        });
    });
    //khoi tao delay time

    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    //------------------------------- search theory-----------------------------------------
    $("#search_theory").on('keyup', function() {
        delay(function(){
            var keyword = $("#search_theory").val();
            var id_unit = $("#number_unit").val();
            $.ajax({
                type: "GET",
                url: '' + id_unit + '/search-theory?keyword=' + keyword,
                cache: false,
                success: function(data)
                {
                    console.log(data);
                    $("#table_theory_content").html('');
                    $("#table_theory_content").append(data);
                    
                }
            });
        },500);
               
    });   


 
    //-------------------------------Click popup create new theories------------------------
    $("#act_tab1").on('click', function() {
        $('#frmUpdateUnit button[type="submit"]').prop('disabled', false);
    });
    //-------------------------------Click popup create new theories------------------------
    $("#btn-add-theories").on('click', function(event) {
        event.preventDefault();
        $("#popup-add-theories").modal('show');
        var id = $(this).data('id');
        var url = 'unselected-unit';
        $.ajax({
            type: 'get',
            url: url,
            data: {
                'id': id
            },
            success: function(data) {
                console.log(data);
            }

        });
    });
    //---------------------------click choice theories---------------------------
    $('#table_theory_content').delegate('.act_check_theories','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        var id_unit = $("#number_unit").val();
        var id_theory = $(this).data('id');
        if ($(this).is(":checked")) {
            $.ajax({
                url: '' + id_unit + '/act-add-theories',
                type: 'POST',
                data: {
                    'id_theory': id_theory
                },
                success: function(result) {
                    console.log(result);
                     toastr["success"]("Thêm lý thuyết thành công !!");
                    if (result.count_current >0 && result.check_exercises_unit ==0 && result.data_detail_unit.picture==null) {
                         $("#act_tab3").removeClass("disabled_tab");
                         $("#percent_unit").css("width","50%");
                    }else if(result.count_current >0 && result.check_exercises_unit > 0 && result.data_detail_unit.picture==null){
                         $("#act_tab3").removeClass("disabled_tab");
                         $("#act_tab4").removeClass("disabled_tab");
                         $("#percent_unit").css("width","75%");
                    }else if(result.count_current >0 && result.check_exercises_unit > 0 && result.data_detail_unit.picture != null){
                         $("#act_tab3").removeClass("disabled_tab");
                         $("#act_tab4").removeClass("disabled_tab");
                         $("#percent_unit").css("width","100%");
                     }
                   
                }
            });
        } else {
            if (!$(this).is(':checked')) {
                swal({
                        title: "Bạn có chắc chắn muốn xoá?",
                        text: "Bộ lý thuyết này sẽ bị xóa khỏi bài học này!!",
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
                            $.ajax({
                                type: 'delete',
                                url: '' + id_unit + '/act-delete-theories',
                                data: {
                                    'id_theory': id_theory
                                },
                                success: function(data) {
                                    console.log(data);
                                  if (data.count_current==0 && data.check_exercises_unit==0) {
                                    $("#act_tab3").addClass("disabled_tab");
                                    $("#act_tab4").addClass("disabled_tab");
                                    $("#percent_unit").css("width","25%");
                                  }else if (data.count_current == 0 && data.check_exercises_unit >0) {
                                    $("#act_tab3").addClass("disabled_tab");
                                    $("#act_tab4").addClass("disabled_tab");
                                    $("#percent_unit").css("width","50%");                                   
                                  }
                                    toastr["success"]("Xóa thành công!");
                                  
                                }
                            });
                            
                        } else if (!isConfirm){
                            toastr["warning"]("Thao tác đã bị hủy");
                            $("#theory_id_"+id_theory).prop("checked", true);
                        }
                    });
            }
        }
    });

    //---------------------------click choice exercise---------------------------
    $('#content_exercises').delegate('.act_check_exercise','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        var id_unit = $("#number_unit").val();
        var id_exercise = $(this).data('id');
        var id_answer = $('#answers'+id_exercise).val();
        if ($(this).is(":checked")) {
            $.ajax({
                url: '' + id_unit + '/act-add-exercise',
                type: 'POST',
                data: {
                    'id_exercise': id_exercise,
                    'id_answer'  : id_answer
                },
                success: function(result) {
                    console.log(result);
                     toastr["success"]("Thêm bài tập thành công !!");
                    if (result.count_current >0 && result.check_theory_unit > 0 && result.data_detail_unit.picture==null) {
                         $("#act_tab4").removeClass("disabled_tab");
                         $("#percent_unit").css("width","75%");
                    }
                    if (result.count_current >0 && result.check_theory_unit > 0 && result.data_detail_unit.picture!=null) {
                         $("#act_tab4").removeClass("disabled_tab");
                         $("#percent_unit").css("width","100%");
                    }
                }
            });
        } else {
            if (!$(this).is(':checked')) {
                swal({
                        title: "Bạn có chắc chắn muốn xoá?",
                        text: "Bộ bài tập này sẽ bị xóa khỏi bài học này!!",
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
                            $.ajax({
                                type: 'delete',
                                url:  id_unit + '/act-delete-exercise',
                                data: {
                                     'id_exercise': id_exercise,
                                     'id_answer'  : id_answer
                                },
                                success: function(result) {
                                    console.log(result);
                                 if (result.count_current == 0 && result.check_theory_unit >0 && result.data_detail_unit.picture==null) {
                                     $("#act_tab4").addClass("disabled_tab");
                                     $("#percent_unit").css("width","50%");
                                }
                                 toastr["success"]("Xóa thành công!"); 
                                }
                            });
                            
                        } else if (!isConfirm)  {
                            toastr["warning"]("Thao tác đã bị hủy");
                            $("#exercise_id_"+id_exercise).prop("checked", true);
                         
                            
                        }
                    });

            }
        }

    });
    // filter cbb list course
    $("#list_course").on('click',function(e){
        var id_course = $("#list_course").val();
        var url = '/action-unit/filter-class/'+id_course;
        $.ajax({
            type: 'get',
            url: url,
            cache: false,
            success: function(data) {
                console.log(data);
                $("#table_theory_content").html('');
                $("#table_theory_content").append(data);
            }
        });
    });
     // -------------------------add student------------------------- 
    $("#btn-add-student").on('click', function() {
     $("#student-modal-add").modal("show");
    }); 

    // delete unit
    $("#content_list_unit").delegate(".btn-del-unit","click",function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('input[name="_token"]').val()
            }
        });
        //edit ok
        var id_unit = $(this).data('id');
        var id_classRoom=$("#id_classRoom").val();  
        var url = id_classRoom+'/delete-unit-class';
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
                            'id_unit': id_unit,
                            'id_classRoom' : id_classRoom,
                        },
                        success: function(data) {
                            console.log(data);
                         toastr["success"]("Xóa bài học thành công !!");
                         $("#content_list_unit").html('');
                         $("#content_list_unit").append(data);                        
                        }
                    });
                }else{
                    toastr["warning"]("Thao tác đã bị hủy !!");
                }
            });  
    });
    
});