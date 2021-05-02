    var web = $('meta[name="website"]').attr('content');

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
//--------------------------- Show content  theory---------------------------
$('.show-content').on('click',function(){
      $("#slogan-modal").text(''); 

      $("#slogan-modal").text('Nội Dung Lý Thuyết');

      $("#content-data").text('');

      $('#content_theory').modal('show');

      var content = $(this).attr("data-content");

      $( "#content-data" ).append(content);

});
//---------------------------click choice theories---------------------------
    $('#theory_table').delegate('.act_check_theories','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        var id_unit = $("#number_unit").val();
        var theory_id = $(this).data('id');
        // alert(id_theory);
        if ($(this).is(":checked")) {
            $.ajax({
                url: web+'classroom-unit-theory',
                type: 'POST',
                data: {
                    'class_room_unit_id' :id_unit,
                    'theory_id': theory_id
                    
                },
                success: function(result) {
                    console.log(result);
                    if (result.error == false) {
                    
                         toastr["success"]("Thêm lý thuyết thành công !!");

                        $("#content_exercise").html('');

                        $("#content_exercise").append(result.view);

                    }else if (result.error == true){
                        toastr["error"](result.msg);
                        
                         $("#theory_"+theory_id).prop("checked", false);
                    }
                },
            error: function(data)
                {
                       toastr["warning"]("Thêm lý thuyết không thành công !!"); 
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
                        closeOnCancel: true,
                        "tapToDismiss" : false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            $.ajax({
                                type: 'delete',
                                url: web+'classroom-unit-theory/'+theory_id,
                                data: {
                                    'class_room_unit_id' :id_unit,
                                    'theory_id': theory_id
                    
                                },
                                success: function(data) {
                                    console.log(data);
                                 if (data.error == false) {
                                     $("#content_exercise").html('');
                             
                                     $("#content_exercise").append(data.view);

                                      toastr["success"]("Xóa thành công!");
                                  }
                                }
                            })
                            
                        } else if (!isConfirm){
                            toastr["warning"]("Thao tác đã bị hủy");
                            toastr.options.tapToDismiss = false;
                            $("#theory_"+theory_id).prop("checked", true);
                        }
                    });
            }
        }
    });
