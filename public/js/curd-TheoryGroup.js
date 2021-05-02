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
	//---------------------Add------------------------
	$('#addBtnTheoryGroup').on('click',function(){

		$('#createTheoryGroupModal').modal('show');
		$('.error').hide();
		$('#frmCreateTheoryGroup').trigger('reset');
		$('#frmCreateTheoryGroup button[type="submit"]').prop('disabled',false);
	});

	$('#frmCreateTheoryGroup').on('submit',function(e){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('conternt')
			}
		});
		e.preventDefault();
		var form= $('#frmCreateTheoryGroup');
		var formData= form.serialize();
		var url='theorygroup';
		$('#frmCreateTheoryGroup button[type="submit"]').prop('disabled',true);
		$.ajax({
			type:'post',
			url: url,
			data: formData,
			success:function(data){
				console.log(data);
				if(data.error==true){
					$('#frmCreateTheoryGroup button[type="submit"]').prop('disabled',false);
					// $('.error').hide();
					// if(data.message.name != undefined){
					// 	$('.errorName').show().text(data.message.name[0]);
					// }
				}else{
				console.log(data);
					addRow(data);
					
					$('#createTheoryGroupModal').modal('hide');

					toastr["success"]("Nhóm Lý Thuyết được thêm thành công!");	
				}
			},
			error: function(data)
			{
				console.log('Error:', data);
				$('#createTheoryGroupModal').modal('hide');
				toastr["error"]("Nhóm Lý Thuyết được thêm không thành công!");
			}
		});
	});

	function addRow(data){
	  	   	$("#repalceTable").html('');
            $("#repalceTable").append(data);

	};

	//-----------edit--------------------------
	$('#repalceTable').delegate('.btn-editTheoryGroup','click',function(){
		var value= $(this).data('id');
		var url = 'theorygroup-edit';
		$('#frmEditTheoryGroup button[type="submit"]').prop('disabled',false);
		$.ajax({
			type : 'get',
			url : url,
			data : {'id':value},
			success: function(data){
				console.log(data);
				$('#editID').val(data.id);
				$('#editName').val(data.name);
				$('#editTheoryGroupModal').modal('show');
				$('.error').hide();
			}
			
		});
		
	});

	$('#frmEditTheoryGroup').on('submit',function(e){
		$.ajaxSetup({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		e.preventDefault();
		var theoryGroupID= $('#editID').val();
		var formData= $('#frmEditTheoryGroup').serialize();
		var url = 'theorygroup-edit';
		$('#frmEditTheoryGroup button[type="submit"]').prop('disabled',true);
		$.ajax({
			type : 'put',
			url  : url,
			data : formData,
			success:function(data){
					console.log(data);
					if (data.error == true) {
					$('#frmEditTheoryGroup button[type="submit"]').prop('disabled',false);  
					// $('.error').hide();
					// if (data.message.editName != undefined) {
					// $('.errorName').show().text(data.message.editName[0]);
					// }
				} else {
					console.log(data);
					var row ='<tr align="center" id="TheoryGroup'+data.id+'">'+
					'<td>'+data.id+'</td>'+
					'<td>'+data.name+'</td>';
					row += 	'<td><ul class="list-inline"><li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-editTheoryGroup style-css" data-id="'+data.id+'" aria-hidden="true" title="Sửa Thông Tin Nhóm Lý Thuyết"></i></a></li>';        
					row +=  '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-delTheoryGroup style-css" data-id="'+data.id+'" aria-hidden="true" title="Xóa Nhóm Lý Thuyết"></i> </a></li></ul></td></tr>';
					$("#TheoryGroup" +data.id).replaceWith(row);
					
					$('#editTheoryGroupModal').modal('hide') ;  
					toastr["success"]("Sửa thông tin thành công!"); 
				}   
			},
			error: function (data) {
				console.log('Error:', data);
				$('#editTheoryGroupModal').modal('hide');
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

	//-----------end edit-----------
	//DElelte
	$('#repalceTable').delegate('.btn-delTheoryGroup','click',function(){
		$.ajaxSetup({
		headers:
		{
		'X-CSRF-Token': $('input[name="_token"]').val()
		}
		});
		var value = $(this).data('id');
		var url = 'theorygroup-delete';
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
		if(isConfirm){
		
			$.ajax({
			type: 'delete',
			url :  url,
			data: {'id':value},
			success:function(data){
				console.log(data)
			$('#repalceTable').html('');
	 		$('#repalceTable').append(data);
			toastr["success"]("Nhóm lý thuyết được xóa thành công!");
			}

			});
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
	//Search
	$("#search").on('keyup', function() {
		delay(function(){
			var keyword = $("#search").val();
	        $.ajax({
	            type: "GET",
	            url: "theorygroup/search?keyword=" + keyword,
	          	cache: false,
	            success: function(theoryGroup)
	            {
	            	$("#repalceTable").html('');
	            	$("#repalceTable").append(theoryGroup);   	
	            }
	        }); 
		},500);
              
        // return false;
    });
});