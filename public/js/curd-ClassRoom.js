
var web = $('meta[name="website"]').attr('content');
// Validate client add  class room----------------

// setup toastr
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
	//Show Detail
//-------------(Delegate)----------------------
	$('#repalceTable').delegate('.btn-detailClassRoom','click',function(){

		var value=$(this).data('id');
		var url = 'class-detail';
		$.ajax({
			type: 'get',
			url: url,
			data: {'id':value},
			success:function(data){
				// console.log(data);
				$('#editID').val(data.id);
				$('#detailCode').val(data.code);
				$('#detailClass_name').val(data.class_name);
				$('#detailOrientation_time').val(data.orientation_time);
				$('#detailTime_table').val(data.time_table);
				$('#detailNumber_of_unit').val(data.number_of_unit);
				$('#detailTuition').val(data.tuition);
				$('#detailIcon').val(data.icon);
				$('#detailTuition_policy').val(data.tuition_policy);
				$('#detailMax_tuition_policy').val(data.max_tuition_policy);
				$('#detailPolicy').val(data.policy);
				$('#detailFacebook_group').val(data.facebook_group);

				var course=data.course_id;
				var status=data.status;
				$('#detailCourse_id option[value='+course+']').prop('selected',true);
				for(var i=0;i<4;i++){

					if (status==i) {
						$('#detailStatus option[value='+status+']').attr('selected','selected');
					}
				}

				$('#detailClassModal').modal('show');
				$('.error').hide();
			}
		});
	});
	//end Detail


	function addRow(data){
	  	   	$("#class_content").html('');
            $("#class_content").append(data);

	};

	//-----------edit--------------------------
	$('#class_content').delegate('.btn-editClassRoom','click',function(){
		var value=$(this).data('id');
		var url = 'class-edit';
		$('#frmEditClass button[type="submit"]').prop('disabled',false);
		$.ajax({
			type: 'get',
			url: url,
			data: {'id':value},
			success:function(data){
				console.log(data);
				$('#editID').val(data.id);
				$('#editCode').val(data.code);
				$('#editClass_name').val(data.class_name);
				$('#editOrientation_time').val(data.orientation_time);
				$('#editTime_table').val(data.time_table);
				$('#editNumber_of_unit').val(data.number_of_unit);
				$('#editTuition').val(data.tuition);
				$('#editIcon').val(data.icon);
				$('#editTuition_policy').val(data.tuition_policy);
				$('#editMax_tuition_policy').val(data.max_tuition_policy);
				$('#editPolicy').val(data.policy);
				$('#editFacebook_group').val(data.facebook_group);

				var course=data.course_id;
				var status=data.status;
				$('#editCourse_id option[value='+course+']').prop('selected',true);
				for(var i=0;i<4;i++){

						if (status==i) {
							$('#editStatus option[value='+status+']').attr('selected','selected');
						}
					}

				$('#editClassModal').modal('show');
				$('.error').hide();
				}
			});
		});	


	//-----------end edit-----------
	//-----------------Delete--------------------
	$('#class_content').delegate('.btn-delClassRoom','click',function(){
	$.ajaxSetup({
		headers:
		{
		'X-CSRF-Token': $('input[name="_token"]').val()
		}
		});

		var value = $(this).data('id');
		var url = web +'classroom/'+value;
		swal({   
			title: "Bạn có chắc chắn muốn xoá?",   
			text: "Bạn sẽ không thể khôi phục lại bản ghi này!!",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Có",   
			cancelButtonText: "Không",
			closeOnConfirm: true,   
			// closeOnCancel: true 
		},
		function(isConfirm){
		if(isConfirm){
		
			$.ajax({
				type: 'delete',
				url :  url,
				data: {'id':value},
				success:function(data){
					console.log(data);
					if (!data.error) {
						toastr["success"]("Xóa lớp học thành công!");
						setTimeout(function () {   
	                        window.location.reload();
	                    }, 1000);
					}
					else{
						toastr["warning"]("Xóa lớp học không công!");
					}	
				}, error: function (xhr, ajaxOptions, thrownError) {
                	toastr.error(thrownError);
              	}
			});
		}else {
			toastr["warning"]("Thao tác xóa đã bị huỷ bỏ!");
		}      
			// window.location.href = "{{URL::to('home/list')}}"
		});
});

	//---------------Validate-------------------------
	$('#facebook_group').blur(function(){
	var url = $('#facebook_group').val();
	var regex= /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
	if (url=="" || regex.test(url)== true) {
		$('.error').hide();
		$('#frmCreateClassRoom button[type="submit"]').prop('disabled',false);
	}
	else if (url!="" || regex.test(url)== false) {
		$('.error').show();
		$('#frmCreateClassRoom button[type="submit"]').prop('disabled',true);
		$('.errorFacebook_group').html('Link facebook không đúng định dạng VD:"https://www.facebook.com/"');
	}
	
	});
	$('#editFacebook_group').blur(function(){
		var url = $('#editFacebook_group').val();
		var regex= /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
		if (url=="" || regex.test(url)== true) {
			$('.error').hide();
			$('#frmEditClass button[type="submit"]').prop('disabled',false);
		}
		else if (url!="" || regex.test(url)== false) {
			$('.error').show();
			$('#frmEditClass button[type="submit"]').prop('disabled',true);
			$('.errorFacebook_group').html('Link facebook không đúng định dạng VD:"https://www.facebook.com/"');
		}
	});
	//---------------End Validate---------------------

	//---------------Search---------------------------

	//khoi tao delay time

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	//search
    $("#search_class").on('keyup', function() {
    	delay(function(){
			var keyword = $("#search_class").val();
	        $.ajax({
	            type: "GET",
	            url: "class/search?keyword=" + keyword,
	          	cache: false,
	            success: function(classR)
	            {
	         
	            	$("#class_content").html('');
	            	$("#class_content").append(classR);
	            	// location.reload();
	            	}
	            });
	        },500);
		});
        


 