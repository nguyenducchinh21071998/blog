$(function(){
	$('.summernote').summernote({
		height: 100,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  focus: true 
	});
	$('#replaceTable').delegate('.btn-delFeedback', 'click', function() {
		$.ajaxSetup({
			headers:
			{
			'X-CSRF-Token': $('input[name="_token"]').val()
			}
		});
		var value  = $(this).data('id');
		var url = 'feedback-del';
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
		function (isConfirm){
			if(isConfirm){
				$.ajax({
					type : 'delete',
					url	 : url,
					data : {'id':value},
					success:function(data) {
						$('#feedback'+value).remove();
						location.reload();
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

	//------------------get Feedback-detail--------------

	$('#replaceTable').delegate('.btn-detailFeedback','click',function(){
		var value = $(this).data('id');
		var url = 'feedback-detail';
		$.ajax({
			type : 'get',
			url  : url,
			data : {'id':value},
			success: function(data){
				console.log(data)
				var student = data.student_id;
				$("textarea#comment").summernote('code',data.comment);
				$('#student_id option[value='+student+']').prop('selected',true);
				$('#frmDetailFeadback select').prop('disabled',true);
				$('#comment').summernote('disable');
				
				
				$('#detailFeadback').modal('show');
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

	//search

	$('#search').on('keyup',function(){
		delay(function(){
			$keyword = $('#search').val();
			$.ajax({
				type: 'GET',
				url : 'feedbacks/search?keyword='+$keyword,
				cache: false,
				success: function(data) {
					$('#replaceTable').html('');
					$('#replaceTable').append(data);
				}
			});
		},500);
		
	});
});