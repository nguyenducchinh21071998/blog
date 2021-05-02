$(function(){
	$('#submitbuttum').click(function(){
		$('#frmCallStudentCare').validate({
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
					required : "Bạn vui lòng viết tiêu đề cuộc gọi",
				},
				content: {
					required : "Bạn vui lòng viết nội dung cuộc gọi",
				}
			},
			submitHandler: function(form) {
				alert("ok");
				// $('#frmCreateStudentCare').on('submit',function(e){
				$.ajaxSetup({
					headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					}
				});
					
				var content =tinymce.get('content').getContent();
				var url = 'student-care-call/student_cares';
				var link=$('meta[name="website"]').attr('content');
				$('#frmCallStudentCare button[type="submit"]').prop('disabled',true);
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
							$('#frmCallStudentCare button[type="submit"]').prop('disabled',false);
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
							$('#frmCallStudentCare button[type="submit"]').prop('disabled',false);
							toastr["success"]("Thêm thành công!");

							// $('#frmCreateStudentCare button[type="submit"]').prop('disabled',true);
						}
					},
					error: function(data)
					{
						toastr["error"]("Thêm không thành công!");
					}
				});
				
			// });
			}

		});
	});

	function addRow(data) {
		$("#replaceTable").html('');
		$('#replaceTable').append(data);
	}
});