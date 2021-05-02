$(document).ready(function(){
	// ======================validate formCreate=====================
		// ===============Name=======================
		// $('#name').blur(function() {
		// 	var name = $('#name').val();
		// 	if (name=="") {
		// 		$('.errorName').show();
		// 		$('.errorName').html('Nội dung không được để trống');
		// 	}
		// 	else {
		//         $('.errorName').hide();
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
	//khoi tao delay time

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
	            url: "exercises/search?keyword=" + keyword,
	          	cache: false,
	            success: function(exercises)
	            {
	            	$("#replaceTable").html('');
	            	$("#replaceTable").append(exercises);
	            	// location.reload();
	            	}
	        });
		},500);
               
        // return false;
    });
	//Create
	$('#AddBtn').on('click',function(){

		$('#createExercisesModal').modal('show');
		$('.error').hide();
		$('#frmCreateExercises').trigger('reset');
		$('#createExercisesModal button[type="submit"]').prop('disabled',false);
	});

	$('#frmCreateExercises').on('submit',function(e){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('conternt')
			}
		});
		e.preventDefault();
		var form= $('#frmCreateExercises');
		var formData= form.serialize();
		var url='exercises';
		$('#createExercisesModal button[type="submit"]').prop('disabled',true);
		$.ajax({
			type:'post',
			url: url,
			data: formData,
			success:function(data){
				console.log(data);
				if(data.error==true){
					$('#createExercisesModal button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if (data.messages.name != undefined) 
					// {
					// 	$('.errorName').show().text(data.messages.name[0]);
					// }
					// if (data.messages.theory_group_id != undefined) 
					// {
					// 	$('.errorTheoryGroup').show().text(data.messages.theory_group_id[0]);
					// }
					// if (data.messages.level_id != undefined) 
					// {
					// 	$('.errorLevels').show().text(data.messages.level_id[0]);
					// }
				}else{
				console.log(data);
					addRow(data);
					$('#createExercisesModal').modal('hide');
					toastr["success"]("Thêm bài tập thành công");	
				}
			},
			error: function(data)
			{
				console.log('Error:', data);
				$('#createExercisesModal').modal('hide');
				toastr["error"]("Thêm bài tập thành công");
			}
		});
	});

	function addRow(data){
	  	   	$("#replaceTable").html('');
            $("#replaceTable").append(data);

	}

		// Delete
	$('#replaceTable').delegate('.btn-delExercise','click',function(){
			// alert('OK');
	$.ajaxSetup({
	headers:
	{
	'X-CSRF-Token': $('input[name="_token"]').val()
	}
	});
	var value = $(this).data('id');
	var url = 'exercises-delete';
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
		toastr["success"]("Xóa thông tin lý thuyết thành công!");
		}else {
			toastr["info"]("Thao tác xóa đã bị huỷ bỏ!");
		}      
	});
});
	//End Delete

	//Edit 
	$('#replaceTable').delegate('.btn-editExercise','click', function(){
		var value = $(this).data('id');
		var url = 'exercises-edit';
		$('#frmEditExercise button[type="submit"]').prop('disabled',false);
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success:function(data) {
				$('#editExerciseModal').modal('show');
				// console.log(data);
				// alert(data.id);
				$('#editID').val(data.result.id);
				$('#editName').val(data.result.name);
				$("textarea#editContent").summernote('code',data.result.content);
				var theory_group  = data.result.theory_group_id;
				$('#editTheory_group_id option[value='+theory_group+']').prop('selected',true);
				
				var level_id  = data.result.level_id;
				$('#editLevels_id option[value='+level_id+']').prop('selected',true);

			}
		});
		

	});
	$('#frmEditExercise').on('submit',function(e){
		// alert('ok');
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var ID = $('#editID').val();
		var formdata =$('#frmEditExercise').serialize();
		$('#frmEditExercise button[type="submit"]').prop('disabled',true);
		// alert(formdata);
		$.ajax({
			type 	: 'put',
			url 	: 'exercises-edit',
			data 	: formdata,
			success:function(data) {
				if (data.error == true) {
					$('#frmEditExercise button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if (data.messages.name != undefined) 
					// {
					// 	$('.errorName').show().text(data.messages.name[0]);
					// }
					// if (data.messages.theory_group_id != undefined) 
					// {
					// 	$('.errorTheoryGroup').show().text(data.messages.theory_group_id[0]);
					// }
					// if (data.messages.level_id != undefined) 
					// {
					// 	$('.errorLevels').show().text(data.messages.level_id[0]);
					// }
				}
				else
				{
					console.log(data);
					$('#editExerciseModal').modal('hide');
					$("#replaceTable").html('');
            		$("#replaceTable").append(data);
					
					toastr["success"]('Sửa nội dung  thành công ');


				}
			}
		});
	});
	//End Edit
});
