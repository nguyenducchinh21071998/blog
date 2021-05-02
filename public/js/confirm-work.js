	var web = $('meta[name="website"]').attr('content');

	$(document).ready(function () {

		var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : 'body';

		// Thời gian tìm kiếm
		$('#search_time').datepicker({
			autoclose: true,
			format: 'yyyy/mm/dd',
			container: container,
			todayHighlight: true,
		})

		/*Thời gian chọn khi thêm mới giờ làm việc cho nhân viên.
		Thời gian này chỉ được chọn từ ngày hôm này trở về trước.
		Sau khi chọn thời gian, sẽ load danh sách nhân viên không đăng ký làm việc trong thời gian ấy lên để thêm mới.
		Trước khi chọn thời gian, nút thêm mới sẽ bị ẩn, sau khi chọn sẽ hiển thị*/
		$('#time_work').datepicker({
			autoclose: true,
			format: 'yyyy/mm/dd',
			container: container,
			todayHighlight: true,
      		endDate: '+0d',
		}).on('changeDate', function(e) {
	        $.ajax({
				url: web + 'confirm-work/get-list-user',
				type: 'POST',
				data: {
					time_work: $('#time_work').val(),
				},
				success: function (res){
					if (!res.error) {
						// Xóa các option có trong select 
						$('#user_id')[0].options.length = 0;

						// Load danh sách các nhân viên không đăng ký lịch làm việc trong ngày đã chọn
						for (var i = 0; i < res.array_users.length; i++) {  
							$('#user_id').append($('<option>', {
								value: res.array_users[i].id,
								text: res.array_users[i].name
							}));
						}

						//Sau khi chọn thời gian, nút thêm mới sẽ được hiển thị
						$('#add').removeAttr('disabled');
					}
				}, 
				error: function (err){
				}
			});
    	});

		reset();
	});

	function reset(){
		var date = $('#time').val();

		$('#search_name').val('');
		$('#search_shift').val('');
		$('#search_time').val(date);

		filter();
	}

	function filter(){
	    var search_name = $('#search_name').val();
	    var search_shift = $('#search_shift').val();
	    var search_time = $('#search_time').val();

	    $('#job-calendar-table').DataTable().destroy();

		var table = $('#job-calendar-table').DataTable({
			processing: true,
			serverSide: true,
			ordering: false,
			order: [], 
			pageLength: 30,
			lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
			ajax: {
				type: 'POST',
				url: web + 'confirm-work/get-confirm-work',
				data: {
					search_name: search_name,
					search_shift: search_shift,
					search_time: search_time,
					filter: true,
				}
			},
			columns: [
			{data: 'is_confirm', name: 'is_confirm', orderable: false, searchable: false, 'class': 'text-center'},
			{data: 'number_hour_work', name: 'number_hour_work', 'class': 'text-center'},
			{data: 'user_id', name: 'user_id', 'width': '20%'},
			{data: 'email', name: 'email'},
			{data: 'mobile', name: 'mobile'},
			{data: 'shift', name: 'shift', 'class': 'text-center', 'width': '10%'},
			{data: 'type_job', name: 'type_job', 'class': 'text-center', 'width': '10%'},
			]
		});
	};

	//Xác nhận làm việc của nhân viên
	$('body').on('click', '#is-confirm-work', function(){
		var id = $(this).data('id');	

		swal({
			title: 'Bạn có muốn xác nhận giờ làm việc của nhân viên này?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			cancelButtonText: 'Không',
			confirmButtonText: 'Có',
		},
		function() { 
			$.ajax({
				url: web + 'confirm-work/is-confirm-work',
				type: 'POST',
				data: {
					id: id,
					number_hour_work: $('#number_hour_work-' + id).val(),
				},
				success: function (res){
					if (res.error != true) {
						toastr.success(res.message);
						$('#job-calendar-table').DataTable().ajax.reload();
					}else{
						toastr.error(res.message);
					}
				}, 
				error: function (err){
				}
			});
		});
	});

	//Hủy xác nhận làm việc
	$('body').on('click', '#is-not-confirm-work', function(){
		var id = $(this).data('id');
		$('#confirm_work_id').val(id);
		$('#reason').val(''),
		$('#reason-modal').modal('show');	
	});

	$('#reason').on('keyup', function(){	
		var reason = $("#reason").val();

		if(reason == null || reason == ''){
			$('#error_reason').html('Lý do hủy xác nhận không được để trống');
			$('#error_reason').css("color", "red");
			$('#btn-confirm-reason').prop('disabled', true);
			return false;
		}else{
			$('#error_reason').html('');
			$('#btn-confirm-reason').removeAttr('disabled');
			return true;
		}
	})

	$('#btn-confirm-reason').on('click', function(){
		var reason = $("#reason").val();

		swal({
			title: 'Bạn có muốn hủy xác nhận giờ làm việc của nhân viên này?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			cancelButtonText: 'Không',
			confirmButtonText: 'Có',
		},
		function() { 
			$.ajax({
				url: web + 'confirm-work/is-not-confirm-work',
				type: 'POST',
				data: {
					reason: reason,
					id: $('#confirm_work_id').val(),
				},
				success: function (res){
					if (res.error != true) {
						toastr.success(res.message);
						$('#job-calendar-table').DataTable().ajax.reload();
						$('#reason-modal').modal('hide');	
					}else{
						toastr.error(res.message);
					}
				}, 
				error: function (err){
				}
			});
		});
	});

	//Show lý do hủy xác nhận làm việc
	$('body').on('click', '#reason-form', function(){
		var id = $(this).data('id');

		$.ajax({
			url: web + 'confirm-work/get-reason',
			type: 'POST',
			data: {
				id: id,
				number_hour_work: $('#number_hour_work').val(),
			},
			success: function (res){
				if (res.error != true) {
					$('#reason-confirm-work').html(res.reason);
					$('#frmReasonModal').modal('show');	
				}else{
					toastr.error(res.message);
				}
			}, 
			error: function (err){
			}
		});
	});

	//Thêm mới giờ làm việc cho nhân viên
	$('body').on('click', '#add-new', function(){
		var id = $(this).data('id');
		$('#createModal').modal('show');
		$('#add').prop('disabled', true);
	});

	var user_id = $('#user_id').val();
	var time_work = $('#time_work').val();

	if (user_id != '') {
		$('#add').removeAttr('disabled');
	}
	if (time_work != '') {
		$('#add').removeAttr('disabled');
	}
	//Lưu nhân viên làm thêm giờ
	$('#add').on('click', function(){
		var user_id = $('#user_id').val();
		var time_work = $('#time_work').val();

		swal({
			title: 'Bạn muốn thêm giờ làm việc của nhân viên này?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			cancelButtonText: 'Không',
			confirmButtonText: 'Có',
		},
		function() { 
			$.ajax({
				url: web + 'confirm-work/add-number-hour-work',
				type: 'POST',
				data: {
					user_id: user_id,
					shift: $('#shift').val(),
					time_work: time_work,
				},
				success: function (res){
					if (res.error != true) {
						toastr.success(res.message);
						$('#job-calendar-table').DataTable().ajax.reload();
						$('#createModal').modal('hide');
          				$('#time_work').val('');
          				$('#user_id').empty();
					}else{
						toastr.error(res.message);
					}
				}, 
				error: function (err){
				}
			});
		});
	});

	// Xóa xác nhận làm việc 
	$('body').on('click','#delete-confirm-work',function(){
		var id = $(this).data('id');	

		swal({
			title: 'Bạn có muốn xóa xác nhận giờ làm việc của nhân viên này?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			cancelButtonText: 'Không',
			confirmButtonText: 'Có',
		},
		function() { 
			$.ajax({
				url: web + 'confirm-work/delete-confirm-work',
				type: 'POST',
				data: {
					id: id,
				},
				success: function (res){
					if (res.error != true) {
						toastr.success(res.message);
						$('#job-calendar-table').DataTable().ajax.reload();
						reset();	
					}else{
						toastr.error(res.message);
					}
				}, 
				error: function (err){
				}
			});
		});
	});

	// Mở lại xác nhận làm việc 
	$('body').on('click','#refresh-form',function(){
		var id = $(this).data('id');	

		swal({
			title: 'Bạn có muốn mở lại xác nhận giờ làm việc của nhân viên này?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			cancelButtonText: 'Không',
			confirmButtonText: 'Có',
		},
		function() { 
			$.ajax({
				url: web + 'confirm-work/refresh-confirm-work',
				type: 'POST',
				data: {
					id: id,
				},
				success: function (res){
					if (res.error != true) {
						toastr.success(res.message);
						$('#job-calendar-table').DataTable().ajax.reload();
						reset();	
					}else{
						toastr.error(res.message);
					}
				}, 
				error: function (err){
				}
			});
		});
	});