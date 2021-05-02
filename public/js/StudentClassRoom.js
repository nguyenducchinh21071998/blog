$(function(){
	// ===============Status=======================
	$('#status').blur(function() {
		var status = $('#status').val();
		if (status=="") {
			$('.errorStatus').show();
			$('.errorStatus').html('Chọn trạng thái');
		}
		else {
	        $('.errorStatus').hide();
	    }
	});
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
		$('#createStudentClassRoomModal').modal('show');
		$('.error').hide();
		$('#frmCreateStudentClassRoom').trigger('reset');
	});
	// submit create
	$('#frmCreateStudentClassRoom').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		})
		e.preventDefault();
		var form = $('#frmCreateStudentClassRoom');
		var formdata = form.serialize();
		var url = 'student-class-rooms';
		$.ajax({
			type: 'post',
			url : url,
			data : formdata,
			success: function(data){
				// console.log(data.data);
				// console.log(data);
				if (data.error == true) {  
					$('.error').hide();
					if (data.messages.class_room_id != undefined) {
					$('.errorClassRoom').show().text(data.messages.class_room_id[0]);
					}
					if (data.messages.student_id != undefined) {
					$('.errorStudent').show().text(data.messages.student_id[0]);
					}
					if (data.messages.branch_id != undefined) {
					$('.errorBranch').show().text(data.messages.branch_id[0]);
					}
					if (data.messages.course_id != undefined) {
					$('.errorCourse').show().text(data.messages.course_id[0]);
					}
					if (data.messages.status != undefined) {
					$('.errorStatus').show().text(data.messages.status[0]);
					}
				}
				else
				{
					addRow(data);
					$('#createStudentClassRoomModal').modal('hide');
					toastr["info"]("học viên được thêm thành công!");
					// location.reload();
				}
				
			}
		});
	});
	//addRow
	function addRow(data){	
		$('#replaceTable').html('');
		$('#replaceTable').append(data);	
		// var idClassRoom  = data.studentClassRoom.class_room_id;
		// var idStudent	 = data.studentClassRoom.student_id;
		// var idCourse	 = data.studentClassRoom.course_id;
		// var idBranch	 = data.studentClassRoom.branch_id;
		// var class_name	 = "";
		// var course_name  = "";
		// var student_name = "";
		// var branch_name  = "";
		// for (var i = 0; i < data.classRoomInfo.length; i++) {
		// 	if (idClassRoom==data.classRoomInfo[i].id) {
		// 		var name=data.classRoomInfo[i].class_name;
		// 	}	
		// }
		// class_name=name;

		// for (var i = 0; i < data.courseInfo.length; i++) {
		// 	if (idCourse==data.courseInfo[i].id) {
		// 		var Course_name = data.courseInfo[i].name;
		// 	}
		// }
		// course_name=Course_name;
		// for (var i = 0; i < data.studentInfo.length; i++) {
		// 	if (idStudent==data.studentInfo[i].id) {
		// 		var student_name = data.studentInfo[i].name;
		// 	}
		// }
		// student_name=student_name;
		// for (var i = 0; i < data.branchInfo.length; i++) {
		// 	if (idBranch==data.branchInfo[i].id) {
		// 		var branch_name = data.branchInfo[i].address;
		// 	}
		// }
		// branch_name=branch_name;
		//  var row='<tr align="center" id="StudentClassRoom'+data.studentClassRoom.id+'">'+
		// 	'<td>'+data.studentClassRoom.id+'</td>'+
	 //      	'<td>'+class_name+'</td>'+
	 //      	'<td>'+student_name+'</td>'+
	 //      	'<td>'+course_name+'</td>'+
	 //      	'<td>'+branch_name+'</td>'+ 
	 //      	'<td>'+data.studentClassRoom.created_at+'</td>';
  //       row +='<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-editStudent style-css" data-id="'+data.studentClassRoom.id+'" aria-hidden="true" title="Sửa Thông Tin User"></i></a></li>';        
  //       row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-delStudent style-css" data-id="'+data.studentClassRoom.id+'" aria-hidden="true" title="Xóa User"></i> </a></li></ul></td></tr>';
  //       $('tbody').append(row);
  // 	 	row = '';

		
	}
	$('#replaceTable').delegate('.btn-editStudent','click',function(){
		var value = $(this).data('id');
		var url = 'student-class-room-edit';
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success: function(data){
				console.log(data)
				$('#editID').val(data.id);
				var student   = data.student_id;
				var course    = data.course_id;
				var classRoom = data.class_room_id;
				var branch 	  = data.branch_id;
				var status 	  = data.status;

				$('#student_id option[value='+student+']').prop('selected',true);
				$('#class_room_id option[value='+classRoom+']').prop('selected',true);
				$('#course_id option[value='+course+']').prop('selected',true);
				$('#branch_id option[value='+branch+']').prop('selected',true);
				for (var i = 0; i < 4; i++) {
					if (status==i) {
						$('#status option[value='+status+']').attr('selected','selected');
					}
				}
					
				$('#editStudentClassRoomModal').modal('show');
				$('.error').hide();
			}
		})
		

	});
	$('#frmEditStudentClassRoom').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var studentID = $('#editID').val();
		var formData= $('#frmEditStudentClassRoom').serialize();
		var url = 'student-class-room-edit';
		$.ajax({
			type : 'put',
			url  : url,
			data : formData,
			success: function(data){

				console.log(data);
				if (data.error == true) {  
					$('.error').hide();
					if (data.messages.class_room_id != undefined) {
					$('.errorClassRoom').show().text(data.messages.class_room_id[0]);
					}
					if (data.messages.student_id != undefined) {
					$('.errorStudent').show().text(data.messages.student_id[0]);
					}
					if (data.messages.branch_id != undefined) {
					$('.errorBranch').show().text(data.messages.branch_id[0]);
					}
					if (data.messages.course_id != undefined) {
					$('.errorCourse').show().text(data.messages.course_id[0]);
					}
					if (data.messages.status != undefined) {
					$('.errorStatus').show().text(data.messages.status[0]);
					}
				}
				else
				{
					$('#replaceTable').html('');
					$('#replaceTable').append(data);
					toastr["success"]("Sửa thành công!");
					$('#editStudentClassRoomModal').modal('hide');
					// var id=data.studentClassRoom.id;
					// $('#editStudentClassRoomModal').modal('hide');
					// $.each(data.studentClassRoom, function( index, value ) {
					// 	if (id == studentID) {
					// 		var row='<tr align="center" id="StudentClassRoom'+value.id+'">'+
					// 		'<td>'+value.id+'</td>'+
					//       	'<td>'+value.class_room.class_name+'</td>'+
					//       	'<td>'+value.student.name+'</td>'+
					//       	'<td>'+value.course.name+'</td>'+
					//       	'<td>'+value.branch.address+'</td>'+ 
					//       	'<td>'+value.created_at+'</td>';
					//         row +='<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-edit" data-id="'+value.id+'" aria-hidden="true" title="Sửa Thông Tin User"></i></a></li>';        
					//         row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-del" data-id="'+value.id+'" aria-hidden="true" title="Xóa User"></i> </a></li></ul></td></tr>';
					  		

					//   	 	$("#StudentClassRoom"+value.id).replaceWith(row); 
					//   	 	console.log(row);
					// 	}
			  		 	 	
					// });


				}
			 
			}
		});

	});
	//Delete
	$('#replaceTable').delegate('.btn-delStudent','click',function(){
		$.ajaxSetup({
		headers:
		{
		'X-CSRF-Token': $('input[name="_token"]').val()
		}
		});
		var value = $(this).data('id');
		var url = 'student-class-room-del';
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
		if (isConfirm) {
		
			$.ajax({
			type: 'delete',
			url :  url,
			data: {'id':value},
			success:function(data){
				$('#replaceTable').html('');
				$('#replaceTable').append(data);
				location.reload();
				// $('#StudentClassRoom'+value).remove();
				toastr["success"]("xóa thành công!");
			}

			});
		} 
		else 
		{
			toastr["error"]("Thao tác đã bị hủy!");
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

	// search
	$('#search').on('keyup', function(){
		delay(function(){
			var keyword = $('#search').val();
			$.ajax({
				type : 'GET',
				url  : 'student-class-rooms/search?keyword='+keyword,
				cache: false,
				success: function(data) {
					$('#replaceTable').html('');
					$('#replaceTable').append(data);
				}
			});
		},1500);
		
	});

});