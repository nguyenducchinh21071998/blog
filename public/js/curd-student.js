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
	// show modal create
	$('#AddBtn').on('click',function(){
		$('#createStudentModal').modal('show');
		$('.error').hide();
		$('#frmCreateStudent').trigger('reset');
		$('#frmCreateStudent button[type="submit"]').prop('disabled',false);
	});

	// create

	$('#frmCreateStudent').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		})
		e.preventDefault();
		var form = $('#frmCreateStudent');
		var formData = form.serialize();
		var url = 'students';
		$('#frmCreateStudent button[type="submit"]').prop('disabled',true);
		$.ajax({
			type:'post',
			url : url,
			data : formData,
			success:function(data){
				if (data.error == true) {
					$('#frmCreateStudent button[type="submit"]').prop('disabled',false);
				// 	// $('.error').hide();
				// 	if (data.message.name != undefined) 
				// 	{
				// 		$('.errorName').show().text(data.message.name[0]);
				// 	}
				// 	if (data.message.mobile != undefined) 
				// 	{
				// 		$('.errorMobile').show().text(data.message.mobile[0]);
				// 	}
				// 	if (data.message.password != undefined) 
				// 	{
				// 		$('.errorPassword').show().text(data.message.password[0]);
				// 	}
				// 	if (data.message.gender != undefined) 
				// 	{
				// 		$('.errorGender').show().text(data.message.gender[0]);
				// 	}
				// 	if (data.message.birthday != undefined) 
				// 	{
				// 		$('.errorBirthday').show().text(data.message.birthday[0]);
				// 	}
				// 	if (data.message.email != undefined) 
				// 	{
				// 		$('.errorEmail').show().text(data.message.email[0]);
				// 	}
				// 	if (data.message.facebook != undefined) 
				// 	{
				// 		$('.errorFacebook').show().text(data.message.facebook[0]);
				// 	}
				// 	if (data.message.status != undefined) 
				// 	{
				// 		$('.errorStatus').show().text(data.message.status[0]);
				// 	}
				// 	if (data.message.type != undefined) 
				// 	{
				// 		$('.errorType').show().text(data.message.type[0]);
				// 	}
				}
				else {
					console.log(data);
					addRow(data);
					$('#frmCreateStudent button[type="submit"]').prop('disabled',true);
					$('#createStudentModal').modal('hide');
					toastr["success"]("Thêm thành công!");
					

				}
				

			},
			error: function(data)
			{
				console.log('Error:', data);
				$('#createStudentModal').modal('hide');
				swal({
					title: "Thêm Thông tin không thành công",
					type:"warning",
					showCancelButton: false,
					confirmButtonClass: "btn-danger",
					confirmButtonText: "Đóng",
					closeOnConfirm: false
				});
			}
		});
		
	});
	// add row
	function addRow(data){
	 	$('#repalceTable').html('');
	 	$('#repalceTable').append(data);
	}

	//-----------edit---------------
	$('#repalceTable').delegate('.btn-editStudent','click',function(){
		var value= $(this).data('id');
		var url = 'student-edit';
		// $('#frmEditStudent').trigger('reset');
		$('#frmEditStudent button[type="submit"]').prop('disabled',false);
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success: function(data){
				console.log(data);
				$('#editID').val(data.id);
				$('#editName').val(data.name);
				$('#editMobile').val(data.mobile);
				$('#editEmail').val(data.email);
				$('#editPassword').val(data.password);
				$('#editBirthday').val(data.birthday);
				$('#editFacebook').val(data.facebook);
				$('#editSkype').val(data.skype);
				$('#editAddress').val(data.address);
				$('#editSchool').val(data.school);
				var gender = data.gender;
				var status = data.status;
				for (var i = 0; i < 4; i++) {
					if (gender==i) {
						$('#editGender option[value='+gender+']').attr('selected','selected');
					}
					if (status==i) {
						$('#editStatus option[value='+status+']').attr('selected','selected');
					}
				}

				$('#editStudentModal').modal('show');
				$('.error').hide();
			}
			
		});
		
	});

	$('#frmEditStudent').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var studentID = $('#editID').val();
		var formData= $('#frmEditStudent').serialize();
		var url = 'student-edit';
		$('#frmEditStudent button[type="submit"]').prop('disabled',true);
		$.ajax({
			type : 'put',
			url  : url,
			data : formData,
			success:function(data){
					console.log(data);
					if (data.error == true) {  
					$('#frmEditStudent button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if (data.message.editName != undefined) {
					// $('.errorName').show().text(data.message.editName[0]);
					// }
					// if (data.message.editMobile != undefined) {
					// $('.errorMobile').show().text(data.message.editMobile[0]);
					// }
					// if (data.message.birthday != undefined) {
					// $('.errorBirthday').show().text(data.message.birthday[0]);
					// }
					// if (data.message.editGender != undefined) {
					// $('.errorGender').show().text(data.message.editGender[0]);
					// }
					// if (data.message.editEmail != undefined) {
					// $('.errorEmail').show().text(data.message.editEmail[0]);
					// }
					// if (data.message.editFacebook != undefined) {
					// $('.errorFacebook').show().text(data.message.editFacebook[0]);
					// }
					// if (data.message.editStatus != undefined) {
					// $('.errorStatus').show().text(data.message.editStatus[0]);
					// }
				} else {
					var gt =data.gender;
					if (data.gender==1) {
						gt="Nam";
					}else if (data.gender==2) {
						gt="Nữ";
					}
					var status_user=data.status;
					if (data.status==1) {
						status_user="Đang Mở";
					}else if (data.status==2) {
						status_user="Đã Đóng";
					}
					console.log(data);
					var row ='<tr align="center" id="Student'+ data.id + '">'+
					'<td>'+data.id+'</td>'+
					'<td>'+data.name+'</td>'+
					'<td>'+data.mobile+'</td>'+
					'<td><a href="' + data.email + '">' + data.email + '</a></td>'+
					'<td>'+data.created_at+'</td>';
					row += 	'<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-editStudent style-css" data-id="'+data.id+'" aria-hidden="true" title="Sửa Thông Tin Học viên"></i></a></li>';        
					row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-delStudent style-css" data-id="'+data.id+'" aria-hidden="true" title="Xóa Học vi"></i> </a></li></ul></td></tr>';
					$("#Student" +data.id).replaceWith(row);
					$('#editStudentModal').modal('hide') ;  
					toastr["success"]("Sửa thông tin thành công!"); 
				}   
			},
			error: function (data) {
				console.log('Error:', data);
				$('#editStudentModal').modal('hide');
				swal({
				title: "Cập nhật thông tin không thành công !",
				type: "warning",
				showCancelButton: false,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Đóng",
				closeOnConfirm: false
				});
			}
		});
	});

	//----------------------------------DeleteStudent--------------------
	$('#repalceTable').delegate('.btn-delStudent','click',function(){
		$.ajaxSetup({
		headers:
		{
		'X-CSRF-Token': $('input[name="_token"]').val()
		}
		});
		var value = $(this).data('id');
		var url = 'student-delete';
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
		function(isConfirm){
		if(isConfirm) {
		
			$.ajax({
			type: 'delete',
			url :  url,
			data: {'id':value},
			success:function(data){
				console.log(data)
			$('#repalceTable').html('');
	 		$('#repalceTable').append(data);
	 		location.reload();
			toastr["success"]("học viên được xóa thành công!");
			}

			});
		}
		else 
		{
			toastr["warning"]("Thao tác đã bị hủy!");
		}         
		// window.location.href = "{{URL::to('home/list')}}"
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

	// chức năng search

	$("#search").on('keyup', function() {
		delay(function(){
			var keyword = $("#search").val();
	        $.ajax({
	            type: "GET",
	            url: "student/search?keyword=" + keyword,
	          	cache: false,
	            success: function(student)
	            {
	            	
	            	$("#repalceTable").html('');
	            	$("#repalceTable").append(student);
	            	
	            }
	        });     
		},500);
          
        // return false;
    });

	// validate phone
	$("#mobile").blur(function() {
        $.ajax({
            type: 'get',
            url: 'student/check-phone',
            data: {
                'value': $(this).val()
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorMobile').show().text("Số điện thoại này đã tồn tại,bạn không thể đăng ký bằng số điện thoại này này!!");
                } else {
                    $('.errorMobile').hide();
                }
            }
        });
    });
    $("#editMobile").blur(function() {
        var input_phone = $("#editEmail").val();
        var id_student = $('.btn-editStudent').data('id');
        $.ajax({
            type: 'get',
            url: 'student/check-mobile-update',
            data: {
                'value': $(this).val(),
                'id': id_student
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorMobile').show().text("Số điện thoại này đã tồn tại,bạn không thể sử dụng số điện thoại này!!");

                } else {
                    $('.errorMobile').hide();

                }
            }
        });
    });

    // check Email

    $("#email").blur(function() {
        $.ajax({
            type: 'get',
            url: 'student/check-email',
            data: {
                'value': $(this).val()
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorEmail').show().text("Email này đã tồn tại,bạn không thể đăng ký bằng Email này!!");
                } else {
                    $('.errorEmail').hide();
                }
            }
        });
    });
    $(".editEmail").blur(function() {
        var input_email = $("#editEmail").val();
        var id_student = $('.btn-editStudent').data('id');
        $.ajax({
            type: 'get',
            url: 'student/check-email-update',
            data: {
                'value': $(this).val(),
                'id': id_student
            },
            success: function(result) {
                console.log(result);
                $('.errorEmail').hide();
                if (result > 0) {
                    $('.errorEmail').show().text("Email này đã tồn tại,bạn không thể sửa với Email này!!");

                } else {
                    $('.errorEmail').hide();
                }
            }
        });

    });
	// =======================Valdate frmCreateStudent=====================
		// ===============Name=======================
		// $('#name').blur(function() {
		// 	var name = $('#name').val();
		// 	if (name.length < 2) {
		// 		$('.errorName').show();
		// 		$('.errorName').html('Họ tên không đúng');
		// 	}
		// 	else {
		//         $('.errorName').hide();
		//     }
		// });
		// ================Mobile=====================
		// $('#mobile').blur(function() {
		//     var phone =$('#mobile').val();
		//     intRegex = /^(\(?(0|\+84)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/;
		//     if (!intRegex.test(phone) ||  phone.length < 9 ) {
		//         $('.errorMobile').show();
		//         $(".errorMobile").html("Số điện thoại không đúng định dạng");
		//         // return false;
		//     } else {
		//         $('.errorMobile').hide();
		//     }
		// });
		// ===============Email=======================
		// $('#email').blur(function() {
		// 	var email = $('#email').val();
		// 	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// 	if (email=="" || regex.test(email)== false) {
		// 		$('.errorEmail').show();
		// 		$('.errorEmail').html('Email không đúng định dạng VD:"abcd@abcd.com"');
		// 		$('#frmCreateStudent button[type="submit"]').prop('disabled',true);
		// 	}
		// 	else {
		//         $('.errorEmail').hide();
		//         $('#frmCreateStudent button[type="submit"]').prop('disabled',false);
		//     }
		// });
		// ===============Password=======================
		// $('#password').blur(function() {
		// 	var password = $('#password').val();
		// 	if (password=="") {
		// 		$('.errorPassword').show();
		// 		$('.errorPassword').html('Mật khẩu không được để trống');
		// 	}
		// 	else {
		//         $('.errorPassword').hide();
		//     }
		// });
		// // ===============Password=======================
		// $('#gender').blur(function() {
		// 	var gender = $('#gender').val();
		// 	if (gender=="") {
		// 		$('.errorGender').show();
		// 		$('.errorGender').html('Chọn giới tính');
		// 	}
		// 	else {
		//         $('.errorGender').hide();
		//     }
		// });
		// ==================Facebook================
		// $('#facebook').blur(function(){
		// var url = $('#facebook').val();
		// var regex= /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
		// if (url=="" || regex.test(url)== true) {
		// 	$('.errorFacebook').hide();
		// 	$('#frmCreateStudent button[type="submit"]').prop('disabled',false);
		// }
		// else if (url!="" || regex.test(url)== false) {
		// 	$('.errorFacebook').show();
		// 	$('.error').hide();	
		// 	$('#frmCreateStudent button[type="submit"]').prop('disabled',true);
		// 	$('.errorFacebook').html('Link facebook không đúng định dạng VD:"http://google.com"');
		// }
		
		// });
		// // ===============Date=======================
		// $('#birthday').blur(function() {
		// 	var date = $('#birthday').val();
		// 	if (date=="") {
		// 		$('.errorBirthday').show();
		// 		$('.errorBirthday').html('Ngày sinh không được để trống');
		// 	}
		// 	else {
		//         $('.errorBirthday').hide();
		//     }
		// });
		// // ===============Status=======================
		// $('#status').blur(function() {
		// 	var date = $('#status').val();
		// 	if (date=="") {
		// 		$('.errorStatus').show();
		// 		$('.errorStatus').html('Chọn trạng thái');
		// 	}
		// 	else {
		//         $('.errorStatus').hide();
		//     }
		// });

	// =======================Valdate frmEditStudent=====================
		// ===============Name=======================
		// $('#editName').blur(function() {
		// 	var name = $('#editName').val();
		// 	if (name.length < 2) {
		// 		$('.errorName').show();
		// 		$('.errorName').html('Họ tên không đúng');
		// 	}
		// 	else {
		//         $('.errorName').hide();
		//     }
		// });
		// // ================Mobile=====================
		// $('#editMobile').blur(function() {
		//     var phone =$('#editMobile').val();
		//     intRegex = /^(\(?(0|\+84)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/;
		//     if (!intRegex.test(phone) ||  phone.length < 9 ) {
		//         $('.errorMobile').show();
		//         $(".errorMobile").html("Số điện thoại không đúng định dạng");
		//         // return false;
		//     } else {
		//         $('.errorMobile').hide();
		//     }
		// });
		// ===============Email=======================
		// $('#editEmail').blur(function() {
		// 	var email = $('#editEmail').val();
		// 	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// 	if (email=="" || regex.test(email)== false) {
		// 		$('.errorEmail').show();
		// 		$('.errorEmail').html('Email không đúng định dạng VD:"abcd@abcd.com"');
		// 		$('#frmEditStudent button[type="submit"]').prop('disabled',true);
		// 	}
		// 	else {
		//         $('.errorEmail').hide();
		//         $('#frmEditStudent button[type="submit"]').prop('disabled',false);
		//     }
		// });
		// ===============Password=======================
		// $('#editGender').blur(function() {
		// 	var gender = $('#editGender').val();
		// 	if (gender=="") {
		// 		$('.errorGender').show();
		// 		$('.errorGender').html('Chọn giới tính');
		// 	}
		// 	else {
		//         $('.errorGender').hide();
		//     }
		// });
		// // ==================Facebook================
		// $('#editFacebook').blur(function(){
		// 	var url = $('#editFacebook').val();
		// 	var regex= /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
		// 	if (url=="" || regex.test(url)== true) {
		// 		$('.errorFacebook').hide();
		// 		$('#frmEditStudent button[type="submit"]').prop('disabled',false);
		// 	}
		// 	else if (url!="" || regex.test(url)== false) {
		// 		$('.errorFacebook').show();
		// 		$('#frmEditStudent button[type="submit"]').prop('disabled',true);
		// 		$('.errorFacebook').html('Link facebook không đúng định dạng VD:"http://google.com"');
		// 	}
			
		// });
		// // ===============Date=======================
		// $('#editBirthday').blur(function() {
		// 	var date = $('#editBirthday').val();
		// 	if (date=="") {
		// 		$('.errorBirthday').show();
		// 		$('.errorBirthday').html('Ngày sinh không được để trống');
		// 	}
		// 	else {
		//         $('.errorBirthday').hide();
		//     }
		// });
		// // ===============Status=======================
		// $('#editStatus').blur(function() {
		// 	var date = $('#editStatus').val();
		// 	if (date=="") {
		// 		$('.errorStatus').show();
		// 		$('.errorStatus').html('Chọn trạng thái');
		// 	}
		// 	else {
		//         $('.errorStatus').hide();
		//     }
		// });

		// jquery validate formCreated....

		


});
// end doccument