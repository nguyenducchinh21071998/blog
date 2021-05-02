
// //-----------------------------Xem chi tiết thông tin home work-------------------------------
$(document).ready(function() {
    $('.btn-details').on('click', function() {
        var value = $(this).data('id');
        var url = $('meta[name="website"]').attr('content') + 'home-work-info';

        $.ajax({
            type: 'get',
            url: url,
            data: {'id':value},
            success: function(data) {
                console.log(data);
                $('#infoID').val(data.info_student_home_work.id);              
                $('#infoUrl').val(data.info_student_home_work.url);
                $('#infoContent').val(data.info_student_home_work.content);
                $('#infoTime').val(data.info_student_home_work.time_submit);
                $('#infoComment').val(data.info_student_home_work.comment);

                $('#infoPoint').val(data.info_student_home_work.point);
                $('#infoPoint_plus').val(data.info_student_home_work.point_plus);
                var status=data.info_student_home_work.status;
                var status_submit=data.info_student_home_work.status_submit;

                for(var i=0;i<2;i++){
                    if(status==1){
                        $('#infoStatus').val(
                            'Đang Mở'
                            );
                    }
                    if(status==0){
                        $('#infoStatus').val(
                            'Đã Xoá'
                            );
                    }
                    if(status_submit==1){
                         $('#infoStatus_submit').val(
                            'Đúng Giờ'
                            );
                    }
                    if(status_submit==0){
                         $('#infoStatus_submit').val(
                            'Muộn'
                            );
                    }
                }
                
                for (var i = 0; i < data.info_class_room_unit.length;i++) {
                   $('#infoUnit').val(data.info_class_room_unit[i].unit_name);
                  }  

                 for (var i =0; i<data.info_student.length;i++){
                    $('#infoStudent').val(data.info_student[i].name);
                 } 
              
                         
                //---Show popup---
                $('#Homework-modal-info').modal('show');
                $('#detail_studentHomeWork input').attr('disabled',true);
                $('#infoComment').attr('disabled',true);
                $('.error').hide();
            }

        });

    });
});
//-------------------end view info-----------------------------
//-------------------to grade----------------------------------
$(document).ready(function() {

  $('.btn-grades').on('click', function() {
        var value = $(this).data('id');

        var url = $('meta[name="website"]').attr('content') + 'home-work-info-grade';
        // var comment = tinymce.get('infoComment1').getContent();
        $('#Homework-modal-grade').modal('show');

        $.ajax({
            type: 'get',
            url: url,
            data: {'id':value},
            success: function(data) {

                console.log(data);

                $('#infoID1').val(data.info_student_home_work.id);              
                $('#infoUrl1').val(data.info_student_home_work.url);

                $('#infoContent1').val(data.info_student_home_work.content);
                
                tinymce.get('infoComment1').setContent(data.info_student_home_work.comment);

                $('#infoTime1').val(data.info_student_home_work.time_submit);
                // $('#infoComment1').val(data.info_student_home_work.comment);
                $('#infoPoint1').val(data.info_student_home_work.point);
                $('#infoPoint_plus1').val(data.info_student_home_work.point_plus);               
                for (var i = 0; i < data.info_class_room_unit.length;i++) {
                   $('#infoUnit1').val(data.info_class_room_unit[i].unit_name);
                  }  

                 for (var i =0; i<data.info_student.length;i++){
                    $('#infoStudent1').val(data.info_student[i].name);
                 } 
              
                         
                //---Show popup---
                // $('#Homework-modal-grade').modal('show');
                 $('#infoContent1').attr('disabled',true);
                 $('#infoUnit1').attr('disabled',true);
                 $('#infoStudent1').attr('disabled',true);
                 $('#infoTime1').attr('disabled',true);

                 if (data.info_student_home_work.content == '' || data.info_student_home_work.content == undefined || data.info_student_home_work.content == null) {
                    $('#content1').css("display", "none");
                 }

                $('.error').hide();
            }

        });

  });

//-------------------end to grade------------------------------
////-------------------Create Grade------------------------------

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
    $('#frmHomeWorkGrade').on('submit',function(e){
    // $('#frmHomeWorkGrade button[type="submit"]').prop('disabled',true);
     $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    e.preventDefault(); 
        var id = $("#infoID1").val();   
        var point = $("#infoPoint1").val(); 

        var point_plus = $("#infoPoint_plus1").val();

         // tinymce.init({
         //            selector: 'infoComment1',  // change this value according to your html
         //            formats: {
         //              alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
         //              aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
         //              alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
         //              alignfull: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
         //              bold: {inline : 'span', 'classes' : 'bold'},
         //              italic: {inline : 'span', 'classes' : 'italic'},
         //              underline: {inline : 'span', 'classes' : 'underline', exact : true},
         //              strikethrough: {inline : 'del'},
         //              forecolor: {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
         //              hilitecolor: {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
         //              custom_format: {block : 'h1', attributes : {title : 'Header'}, styles : {color : 'red'}}
         //            }
         //          }); 
         
        var comment = tinymce.get('infoComment1').getContent();
       
        var formData = $('#frmHomeWorkGrade').serialize();   
        var url = $('meta[name="website"]').attr('content') + 'home-work-grade';      
        $.ajax({
            type: 'put',
            url :url,
            data: {
              'id':id,
              'editPoint':point,
              'editPoint_plus':point_plus,
              'editComment':comment
            },           
            success: function(res){

                if (res.error == true) {  
                  
                  if (res.message.editPoint != undefined) {
                      $('.errorPoint').show().text(res.message.editPoint[0]);
                    } if(res.message.editPoint_plus != undefined){
                      $('.errorPoint_plus').show().text(res.message.editPoint_plus[0]);
                    }if(res.message.editComment != undefined){
                      $('.errorComment').show().text(res.message.editComment[0]);
                    }

                }else{    

                    $('#Homework-modal-grade').modal('hide');
                   
                    $('#point-' + res.data.id).html(res.data.sum_point);

                    toastr.success("Chấm điểm thành công!");
                }
                  
              },
              error: function(e) {

                toastr["error"]("Chấm điểm không thành công!");
              }
        });
    });
});

//------------------- End handing -----------------------------
//------------------- Delete Record----------------------------
$(document).ready(function(){
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

    $('tbody').delegate('.btn-dels','click',function(){
        
        var id = $('#getID').val();
        var status = $('#status').val();
        // alert(status);
        var url = $('meta[name="website"]').attr('content') + 'home-work-delete';
           $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
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
                    $.ajax({
                        type: 'put',
                        url: url,
                        data: {
                             'id': id,
                            'editStatus': status,
                        },

                        success: function(data) {
                             console.log(data);

            if(data.error==true){
                $('.error').hide();  
                if (data.message.editStatus != undefined) {
                    toastr.error(data.message.editStatus[0]);
                }
            }else{
                $('#status').val(data.status);
                $('#StudentHomework' + id).remove();
               
                toastr.success("Xoá thành công!");
            }
                        }
                    });
                }
            });
      });
});
//------------------- End Delete-------------------------------