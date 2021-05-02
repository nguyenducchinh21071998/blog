$(function(){
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
	$('#AddBtn').on('click',function(){
		$('#createStudentCareModal').modal('show');
		$('.error').hide();
		$('#frmCreateStudentCare').trigger('reset');
		$('#frmCreateStudentCare button[type="submit"]').prop('disabled',false);
		// $('.user').prop('disabled', 'disabled');
	})
;
	$('#submitbuttum').click(function(){
		$('#frmCreateStudentCare').validate({
			errorElement: "span",
			rules: {
				title: {
					required : true,
				},
				content: {
					required : true,
				}
			},
			messages: {
				title: {
					required : "Bạn vui lòng viết tiêu đề gửi mail",
				},
				content: {
					required : "Bạn vui lòng viết nội dung gửi mail",
				}
			},
			submitHandler: function(form) {
				// $('#frmCreateStudentCare').on('submit',function(e){
				$.ajaxSetup({
					headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					}
				});
					// e.preventDefault();
					// var form = $('#frmCreateStudentCare');
					
					var content =tinymce.get('content').getContent();
					// alert(content)
					// var formData = form.serialize();
					var url = 'student-care-edit/student_cares';
					var link=$('meta[name="website"]').attr('content');
					$('#frmCreateStudentCare button[type="submit"]').prop('disabled',true);
					$.ajax({
						type:'POST',
						url : link+url,
						data :{ title:$('#title').val(),
							content:content,
							student_id:$('#student_id').val(),
							email:$('#email').val(),
							name:$('#name').val(),
							reviver_address:$('#reviver_address').val(),
							status:$('#status').val(),
							care_type:$('#care_type').val()
						},
						success:function(data){
							if (data.error == true) {
								$('#frmCreateStudentCare button[type="submit"]').prop('disabled',false);
								if (data.messages.title != undefined) 
								{
									$('.errorUser').show().text(data.messages.title[0]);
								}
								if (data.messages.content != undefined) 
								{
									$('.errorUser').show().text(data.messages.content[0]);
								}	
							}
							else {
								console.log(data);
								addRow(data);
								$('#frmCreateStudentCare button[type="submit"]').prop('disabled',false);
								toastr["success"]("Gửi mail thành công!");

								// $('#frmCreateStudentCare button[type="submit"]').prop('disabled',true);
							}
						},
						error: function(data)
						{
							toastr["error"]("Gửi mail không thành công!");
						}
					});
				
			// });
			}

		});
	});

	
	function addRow(data) {
		// console.log(data);
		// var id_student = data.studentcare.student_id;
		// var id_user    = data.studentcare.user_id;	 
		// var student    ="";
		// var user 	   ="";
		// for (var i = 0; i < data.studentInfo.length; i++) {
		// 	if (id_student==data.studentInfo[i].id) {
		// 		var student_name = data.studentInfo[i].name;

		// 	}
		// }
		// student = student_name;
		// for (var i = 0; i < data.userInfo.length; i++) {
		// 	if (id_user==data.userInfo.id) {
		// 		var user_name=data.userInfo.name;

		// 	}
		// }
		// user = user_name;

		$("#replaceTable").html('');
		$('#replaceTable').append(data);
	}

	$('#replaceTable').delegate('.btn-editStudentCare','click', function(){
		var value = $(this).data('id');
		var url = 'student-care-edit';
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success:function(data) {
				$('#editID').val(data.id);
				$('#content').val(data.content);
				var student_id  = data.student_id;
				alert(student_id)
				var user_id		= data.user_id;
				var care_type 	= data.care_type;
				var	status 		= data.status;
				var reviver_address = data.reviver_address;
				$('#user_id option[value='+user_id+']').prop('selected',true);
				// $('#student_id option[value='+student_id+']').attr('selected',true);
				$('.selectpicker').selectpicker('val', student_id)
				$('#care_type option[value='+care_type+']').prop('selected',true);
				for (var i = 0; i < 4; i++) {
					if (status==i) {
						$('#status option[value='+status+']').attr('selected','selected');
					}
				}
				$('#reviver_address option[value='+reviver_address+']').prop('selected',true);
				$('#frmEditStudentCare button[type="submit"]').prop('disabled',false);
				$('#editStudentCareModal').modal('show');
			}
		});
		// $('#editStudentCareModal').modal('show');

	});
	$('#frmEditStudentCare').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var ID = $('#editID').val();
		var formdata =$('#frmEditStudentCare').serialize();
		$('#frmEditStudentCare button[type="submit"]').prop('disabled',true);
		$.ajax({
			type 	: 'put',
			url 	: 'student-care-edit',
			data 	: formdata,
			success:function(data) {
				if (data.error == true) {
					$('#frmEditStudentCare button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if (data.messages.user_id != undefined) 
					// {
					// 	$('.errorUser').show().text(data.messages.user_id[0]);
					// }
					// if (data.messages.student_id != undefined) 
					// {
					// 	$('.errorStudent').show().text(data.messages.student_id[0]);
					// }
					// if (data.messages.care_type != undefined) 
					// {
					// 	$('.errorCare').show().text(data.messages.care_type[0]);
					// }
					// if (data.messages.reviver_address != undefined) 
					// {
					// 	$('.errorReviverAddress').show().text(data.messages.reviver_address[0]);
					// }
					// if (data.messages.status != undefined) 
					// {
					// 	$('.errorStatus').show().text(data.messages.status[0]);
					// }

				}
				else
				{
					console.log(data);
					$('#replaceTable').html('');
					$('#replaceTable').append(data);
					$('#frmEditStudentCare button[type="submit"]').prop('disabled',true);
					$('#editStudentCareModal').modal('hide');
					toastr["success"]('Sửa nội dung  thành công ');	
					location.reload();
					// var id_student = data.studentcare.student_id;	
					// var student    ="";
					// for (var i = 0; i < data.studentInfo.length; i++) {
					// 	if (id_student==data.studentInfo[i].id) {
					// 		var student_name = data.studentInfo[i].name;
					// 		return;
					// 	}
					// }
					// student = student_name;
					// var row='<tr align="center" id="StudentstudenCare'+data.id+'">'+
					// '<td>'+data.id+'</td>'+
			  //     	'<td>'+student+'</td>'+
			  //     	'<td>'+data.content+'</td>'+
			  //     	'<td>'+data.created_at+'</td>';
			  //       row +=	'<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-editStudentCare style-css" data-id="'+data.id+'" aria-hidden="true" title="Sửa Thông Tin User"></i></a></li>';        
			  //       row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-delStudentCare style-css" data-id="'+data.id+'" aria-hidden="true" title="Xóa User"></i> </a></li></ul></td></tr>';
			  // 	 	$("#StudentstudenCare"+data.id).replaceWith(row);
					
					


				}
			}
		});
	});
	$('#replaceTable').delegate('.btn-delStudentCare', 'click', function() {
	    $.ajaxSetup({
	        headers: {
	            'X-CSRF-Token': $('input[name="_token"]').val()
	        }
	    });
	    var value = $(this).data('id');
	    var url = 'student-care-del';
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
	                type: 'delete',
	                url: url,
	                data: {
	                    'id': value
	                },
	                success: function(data) {
	                    $('#replaceTable').html('');
	                    $('#replaceTable').append(data);
	                    location.reload();
	                    toastr["success"]("Xóa thành công!");
	                }
	            });
	            
	        } else {
	            toastr["warning"]("Thao tác đã bị hủy");
	        }
	    });
	});

	// create timer
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	// search
	$("#search").on('keyup', function() {
		delay(function(){
			var keyword = $("#search").val();
	        $.ajax({
	            type: "GET",
	            url: "student-care/search?keyword=" + keyword,
	          	cache: false,
	            success: function(studentCare)
	            {   	
	            	$("#replaceTable").html('');
	            	$("#replaceTable").append(studentCare);
	            	
	            }
	        });
		},500);
               
        // return false;
    });
    $("#listClass").change('keyup', function() {
			var keyword = $("#listClass").val();
	        $.ajax({
	            type: "GET",
	            url: "student-care/filter?keyword=" + keyword,
	          	cache: false,
	            success: function(studentCare)
	            {   	
	            	$("#replaceTable").html('');
	            	$("#replaceTable").append(studentCare);
	            	
	            }
	        });
               
        // return false;
    });

    //chose multil select

    

    


});