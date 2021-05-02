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

		// 	$('#name_theory').blur(function() {
		// 	var name_theory = $('#name_theory').val();
		// 	if (name_theory=="") {
		// 		$('.errorName_theory').show();
		// 		$('.errorName_theory').html('Tên không được để trống');
		// 	}
		// 	else {
		//         $('.errorName').hide();
		//     }
		// });
		// // ===============TheoryGroup=======================
		// $('#theory_group_id').blur(function() {
		// 	var theory_group_id = $('#theory_group_id').val();
		// 	if (theory_group_id=="") {
		// 		$('.errorTheoryGroupId').show();
		// 		$('.errorTheoryGroupId').html('Chọn nhóm lý thuyết');
		// 	}
		// 	else {
		//         $('.errorTheoryGroup').hide();
		//     }
		// });
		// $('#theory_group').blur(function() {
		// 	var theoryGroup = $('#theory_group').val();
		// 	if (theoryGroup=="") {
		// 		$('.errorTheoryGroup').show();
		// 		$('.errorTheoryGroup').html('Chọn nhóm lý thuyết');
		// 	}
		// 	else {
		//         $('.errorTheoryGroup').hide();
		//     }
		// });
		// ===============Content=======================
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
	// Search
	$("#search").on('keyup', function() {
		delay(function(){
			var keyword = $("#search").val();
	        $.ajax({
	            type: "GET",
	            url: "theories/search?keyword=" + keyword,
	          	cache: false,
	            success: function(theory)
	            {
	            	$("#repalceTable").html('');
	            	$("#repalceTable").append(theory);       	
	            }
	        }); 
		},500);
              
    });
	//End Search

	//Create
	$('#addBtnTheory').on('click',function(){

		$('#createTheoryModal').modal('show');
		$('.error').hide();
		$('#frmCreateTheory').trigger('reset');
		$('#frmCreateTheory button[type="submit"]').prop('disabled',false);	
	});

	$('#frmCreateTheory').on('submit',function(e){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('conternt')
			}
		});
		e.preventDefault();
		var form= $('#frmCreateTheory');
		var formData= form.serialize();
		var url='theories';
		$('#frmCreateTheory button[type="submit"]').prop('disabled',true);
		$.ajax({
			type:'post',
			url: url,
			data: formData,
			success:function(data){
				console.log(data);
				if(data.error==true){
					$('#frmCreateTheory button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if(data.messages.name != undefined){
					// 	$('.errorName').show().text(data.messages.name[0]);
					// }
					// if (data.messages.content != undefined) 
					// {
					// 	$('.errorContent').show().text(data.messages.content[0]);
					// }
				}else{
				console.log(data);
					addRow(data);
					$('#createTheoryModal').modal('hide');
					toastr["success"]("Lý thuyết được thêm thành công!");	
				}
			},
			error: function(data)
			{
				console.log('Error:', data);
				$('#createTheoryModal').modal('hide');
				toastr["error"]("Lý Thuyết thêm không thành công!");
			}
		});
	});

	function addRow(data){
	  	   	$("#repalceTable").html('');
            $("#repalceTable").append(data);

	};

	// Delete
	$('#repalceTable').delegate('.btn-delTheory','click',function(){
			// alert('OK');
	$.ajaxSetup({
	headers:
	{
	'X-CSRF-Token': $('input[name="_token"]').val()
	}
	});
	var value = $(this).data('id');
	var url = 'theories-delete';
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
				$("#repalceTable").html('');
            	$("#repalceTable").append(data);
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
	$('#repalceTable').delegate('.btn-editTheory','click', function(){
		var value = $(this).data('id');
		var url = 'theories-edit';
		$('#frmEditTheory button[type="submit"]').prop('disabled',false);
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success:function(data) {
				$('#editTheoryModal').modal('show');
				// console.log(data);
				// alert(data.id);
				$('#editID').val(data.result.id);
				$('#name_theory').val(data.result.name);
				// $('#content_theory').val(data.result.content);
				$("textarea#content_theory").summernote('code',data.result.content);

				var theory_group  = data.result.theory_group_id;
				$('#theory_group option[value='+theory_group+']').prop('selected',true);
				
			}
		});
		

	});
	$('#frmEditTheory').on('submit',function(e){
		// alert('ok');
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var ID = $('#editID').val();
		var formdata =$('#frmEditTheory').serialize();
		$('#frmEditTheory button[type="submit"]').prop('disabled',true);
		// alert(formdata);
		$.ajax({
			type 	: 'put',
			url 	: 'theories-edit',
			data 	: formdata,
			success:function(data) {
				if (data.error == true) {
					$('#frmEditTheory button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if (data.messages.name_theory != undefined) 
					// {
					// 	$('.errorName_theory').show().text(data.messages.name_theory[0]);
					// }
					// if (data.messages.theoryGroup != undefined) 
					// {
					// 	$('.errorTheoryGroup').show().text(data.messages.theoryGroup[0]);
					// }
					// if (data.messages.content != undefined) 
					// {
					// 	$('.errorContent').show().text(data.messages.content[0]);
					// }
				}
				else
				{
					console.log(data);
					$('#editTheoryModal').modal('hide');
					$("#repalceTable").html('');
            		$("#repalceTable").append(data);
					// var theoryGroup = data.theory.theory_group_id;
					// var theory    ="";
					// for (var i = 0; i < data.getTheoryGroup.length; i++) {
					// 	if (theoryGroup==data.getTheoryGroup[i].id) {
					// 		var theory_name = data.getTheoryGroup[i].name;
					// 		return;
					// 	}
					// }
					// theory = theory_name;
					// var row='<tr align="center" id="Theory'+data.id+'">'+
					// '<td>'+data.id+'</td>'+
			  //     	'<td>'+theory+'</td>'+
			  //     	'<td>'+data.name+'</td>'+
			  //     	'<td>'+data.content+'</td>';
			  //       row +=	'<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-editTheory style-css" data-id="'+data.id+'" aria-hidden="true" title="Sửa Lý Thuyết"></i></a></li>';        
			  //       row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-delTheory style-css" data-id="'+data.id+'" aria-hidden="true" title="Xóa Lý Thuyết"></i> </a></li></ul></td></tr>';
			  // 	 	$("#Theory"+data.id).replaceWith(row);

					// $('#editTheoryModal').modal('hide');
					toastr["success"]('Sửa nội dung  thành công ');


				}
			}
		});
	});
	//End Edit


});