$(function(){
	// ======================validate formCreate=====================
		// ===============Name=======================
		// $('#name').blur(function() {
		// 	var name = $('#name').val();
		// 	if (name=="") {
		// 		$('.errorName').show();
		// 		$('.errorName').html('Tên không được để trống');
		// 	}
		// 	else {
		//         $('.errorName').hide();
		//     }
		// });
		// $('#editName').blur(function() {
		// 	var name = $('#editName').val();
		// 	if (name=="") {
		// 		$('.errorEditName').show();
		// 		$('.errorEditName').html('Tên không được để trống');
		// 	}
		// 	else {
		//         $('.errorEditName').hide();
		//     }
		// });

		// 	$('#language_id').blur(function() {
		// 	var language_id = $('#language_id').val();
		// 	if (language_id=="") {
		// 		$('.errorLanguage_id').show();
		// 		$('.errorLanguage_id').html('Chọn Ngôn Ngữ');
		// 	}
		// 	else {
		//         $('.errorLanguage_id').hide();
		//     }
		// });

		// $('#exercises_id').blur(function() {
		// 	var exercises_id = $('#exercises_id').val();
		// 	if (exercises_id=="") {
		// 		$('.errorExercises_id').show();
		// 		$('.errorExercises_id').html('Chọn Bài Tập');
		// 	}
		// 	else {
		//         $('.errorExercises_id').hide();
		//     }
		// });

		// $('#status').blur(function() {
		// 	var status = $('#status').val();
		// 	if (status=="") {
		// 		$('.errorStatus').show();
		// 		$('.errorStatus').html('Chọn Trạng Thái');
		// 	}
		// 	else {
		//         $('.errorStatus').hide();
		//     }
		// });

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

//Create
	$('#AddBtn').on('click',function(){
		// alert('Oke');
		$('#createAnswerModal').modal('show');
		$('.error').hide();
		$('#frmCreateAnswer').trigger('reset');
		$('#frmCreateAnswer button[type="submit"]').prop('disabled',false);
	});

	$('#frmCreateAnswer').on('submit',function(e){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('conternt')
			}
		});
		e.preventDefault();
		var form= $('#frmCreateAnswer');
		var formData= form.serialize();
		var url='answer';
		$('#frmCreateAnswer button[type="submit"]').prop('disabled',true);
		$.ajax({
			type:'post',
			url: url,
			data: formData,
			success:function(data){
				console.log(data);
				if(data.error==true){
					$('#frmCreateAnswer button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if(data.messages.name != undefined){
					// 	$('.errorName').show().text(data.messages.name[0]);
					// }
					// if(data.messages.language_id != undefined){
					// 	$('.errorLanguage_id').show().text(data.messages.language_id[0]);
					// }
					// if(data.messages.exercises_id != undefined){
					// 	$('.errorExercises_id').show().text(data.messages.exercises_id[0]);
					// }
					// if(data.messages.status != undefined){
					// 	$('.errorStatus').show().text(data.messages.status[0]);
					// }
				}else{
				console.log(data);
					addRow(data);
					$('#createAnswerModal').modal('hide');
					toastr["success"]("Bài giải được thêm thành công!");	
				}
			},
			error: function(data)
			{
				console.log('Error:', data);
				$('#createAnswerModal').modal('hide');
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

	function addRow(data){
	  	   	$("#replaceTable").html('');
            $("#replaceTable").append(data);

	};
	//Edit
	$('#replaceTable').delegate('.btn-editAnswer','click', function(){
		// alert('OK');
		var value = $(this).data('id');
		var url = 'answer-edit';
		$('#frmEditAnswer button[type="submit"]').prop('disabled',false);
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success:function(data) {
				$('#editAnswerModal').modal('show');
				$('#editID').val(data.result.id);
				$('#editName').val(data.result.name);
				// $('#content_theory').val(data.result.content);
				$("textarea#editContent").summernote('code',data.result.content);
				var language_id  = data.result.language_id;
				$('#language_id option[value='+language_id+']').prop('selected',true);
				var exercises_id  = data.result.exercises_id;
				$('#editExercises_id option[value='+exercises_id+']').prop('selected',true);
				var status = data.result.status;
				$('#editStatus option[value='+status+']').prop('selected',true);
				
			}
		});
		

	});
	$('#frmEditAnswer').on('submit',function(e){
		// alert('ok');
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var ID = $('#editID').val();
		var formdata =$('#frmEditAnswer').serialize();
		$('#frmEditAnswer button[type="submit"]').prop('disabled',false);
		// alert(formdata);
		$.ajax({
			type 	: 'put',
			url 	: 'answer-edit',
			data 	: formdata,
			success:function(data) {
				if (data.error == true) {
					$('#frmEditAnswer button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if(data.messages.name != undefined){
					// 	$('.errorName').show().text(data.messages.name[0]);
					// }
					// if(data.messages.language_id != undefined){
					// 	$('.errorLanguage_id').show().text(data.messages.language_id[0]);
					// }
					// if(data.messages.exercises_id != undefined){
					// 	$('.errorExercises_id').show().text(data.messages.exercises_id[0]);
					// }
					// if(data.messages.status != undefined){
					// 	$('.errorStatus').show().text(data.messages.status[0]);
					// }
				}
				else
				{
					console.log(data);
					$('#editAnswerModal').modal('hide');
					$("#replaceTable").html('');
            		$("#replaceTable").append(data);
					toastr["success"]('Sửa nội dung  thành công ');
				}
			}
		});
	});
	//End Edit

	// Delete
	$('#replaceTable').delegate('.btn-delAnswere','click',function(){
			// alert('OK');
	$.ajaxSetup({
	headers:
	{
	'X-CSRF-Token': $('input[name="_token"]').val()
	}
	});
	var value = $(this).data('id');
	var url = 'answer-delete';
	swal({   
		title: "Bạn có chắc chắn muốn xoá?",   
		text: "Bạn sẽ không thể khôi phục lại bản ghi này!!",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Có",   
		cancelButtonText: "Không",
		closeOnConfirm: true,   
	},
	function(isConfirm){
	if(isConfirm){
	
		$.ajax({
		type: 'delete',
		url :  url,
		data: {'id':value},
		success:function(data){
				$("#replaceTable").html('');
            	$("#replaceTable").append(data);
		}
		});
		toastr["success"]("Xóa thông tin bài giải thành công!");
		}else {
			toastr["warning"]("Thao tác xóa đã bị huỷ bỏ!");
		}      
	});
});
	//End Delete
	//khoi tao delay time

	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	//search
	$("#search").on('keyup', function() {
		delay(function(){
			var keyword = $("#search").val();
	        $.ajax({
	            type: "GET",
	            url: "answer/search?keyword=" + keyword,
	          	cache: false,
	            success: function(answer)
	            {
	            	$("#replaceTable").html('');
	            	$("#replaceTable").append(answer);       	
	            }
	        });
		},500);
               
    });
	//End Search
});
