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


    //--------------------------- Show content  exercise---------------------------
 $('#content_exercise').delegate('.show-content-exercise','click',function(){

      $("#slogan-modal").text(''); 

      $("#slogan-modal").text('Nội Dung Bài Tập');

      $("#content-data").text('');

      $('#content_theory').modal('show');

      var content = $(this).attr("data-content");
      
      $( "#content-data" ).append(content);

});


    //--------------------------- Show content  answer---------------------------
 $('#content_exercise').delegate('.show-content-answer','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
            id_exercise=$(this).data("id");
            answer_id= $("#answer_id_"+id_exercise).val();

            $.ajax({
                url: web+'answer-edit',
                type: 'get',
                data: {
                    'id' :answer_id
                },
                success: function(result) {
                    console.log(result);
                    if (result.error == false) {
                          $("#slogan-modal").text(''); 

                          $("#slogan-modal").text('Nội Dung Lời Giải');

                          $("#content-data").text('');

                          $('#content_theory').modal('show');
                          
                          $( "#content-data" ).append(result.result.content);

                    }else{
                      toastr["error"]("Thêm bài tập không thành công !!");
                    }
                               
                },error: function (xhr, ajaxOptions, thrownError) {
                      toastr.error(thrownError);

                    }
            });


});
 //---------------------------click choice exercise---------------------------
    $('#content_exercise').delegate('.act_check_exercise','click',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        var class_room_unit_id = $("#number_unit").val();
        var exercise_id = $(this).data('id');
        var answer_id =$("#answer_id_"+exercise_id).val();
    
      
        if ($(this).is(":checked")) {
            $.ajax({
                url: web+'classroom-unit-exercise',
                type: 'POST',
                data: {
                    'class_room_unit_id' :class_room_unit_id,
                    'exercise_id' : exercise_id,
                    'answer_id' : answer_id
                    
                },
                success: function(result) {
                    console.log(result);
                    if (result.error == false) {

                      toastr["success"]("Thêm bài tập thành công !!");

                    }else{
                      toastr["error"]("Thêm bài tập không thành công !!");
                    }
                               
                },error: function (xhr, ajaxOptions, thrownError) {
                      toastr.error(thrownError);

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
                        closeOnCancel: true,
                        "tapToDismiss" : false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            $.ajax({
                                type: 'delete',
                                url: web+'classroom-unit-exercise/'+exercise_id,
                                data: {
                                'class_room_unit_id' :class_room_unit_id,
                                'exercise_id': exercise_id,
                                'answer_id' : answer_id
                    
                                },
                                success: function(data) {
                                    console.log(data);
                                 if (data.error == false) {

                                      toastr["success"]("Xóa bài tập thành công!");
                                  }else{
                                      toastr["error"]("Lỗi bất ngờ ,Xóa bài tập không thành công!");
                                  }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                  toastr.error(thrownError);

                                }
                            })
                            
                        } else if (!isConfirm){
                            toastr["warning"]("Thao tác đã bị hủy");
                            toastr.options.tapToDismiss = false;
                            $("#exercise_"+exercise_id).prop("checked", true);
                        }
                    });
            }
        }
    });
