var web = $('meta[name="website"]').attr('content');

// Trạng thái ban đầu
$(document).ready(function () {
	reset();
});

function loadChart() {
	filter();
}

//Thực hiện khi thực hiện sự kiện onclick reset
function reset(){
	var month = $('#month').val();
	var year = $('#year').val();

	$('#search_weekday').val('');
	$('#search_month').val(month);
	$('#search_year').val(year);

	filter();
}

//Thực hiện khi thực hiện sự kiện onclick filter
function filter(){
	var search_weekday = $('#search_weekday').val();
	var search_month = $('#search_month').val();
	var search_year = $('#search_year').val();

	$.ajax({
		type: 'POST',
		url: web + 'working-statistic/statistic',
		data: {
			department: $('#department_id').val(),
			search_weekday: search_weekday,
			search_month: search_month,
			search_year: search_year,
			filter: true,
		},
		dataType: 'json',
		success:function(data){
			if(data.chart){
				var parent = $('#working_statistic_chart').parent();

				$('#working_statistic_chart').remove();

				parent.append('<div id="working_statistic_chart" style="height: 400px"></div>');
				
				var chart = AmCharts.makeChart( 'working_statistic_chart', {
					'type': 'serial',
					'theme': 'light',
					'dataProvider': data.chart,
					'gridAboveGraphs': true,
					'startDuration': 1,
					'graphs': [{
						'balloonText': '[[category]]: <b>[[value]]</b>',
						'fillAlphas': 0.8,
						'lineAlpha': 0.2,
						'type': 'column',
						'title': 'Số giờ làm việc',
						'valueField': 'number_hour_work',
					},{
						'balloonText': '[[category]]: <b>[[value]]</b>',
						'fillAlphas': 0.8,
						'lineAlpha': 0.2,
						'type': 'column',
						'title': 'Số công làm việc',
						'valueField': 'count_shift',
					}],
					'chartCursor': {
						'categoryBalloonEnabled': false,
						'cursorAlpha': 0,
						'zoomable': false
					},
					'categoryField': 'name',
					'categoryAxis': {
						'gridPosition': 'start',
						'gridAlpha': 0,
						'tickPosition': 'start',

						//Chữ nghiêng bao nhiêu độ
						'labelRotation': 45,
						'tickLength': 20
					},
					'titles': [
					{
						'text': 'Biểu đồ thống kê làm việc của nhân viên',
						'size': 20
					}
					],
					'legend': {
						'useGraphSettings': false
					},
				});
				
			}else{
				$('#working_statistic_chart').hide();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			toastr.error(thrownError);
		}
	});
}

//Show datatable
$('#working-statistic-table').DataTable({
	processing: true,
	serverSide: true,
	ordering: false,
	order: [], 
	pageLength: 30,
	lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
	ajax: {
		type: 'POST',
		url: web + 'working-statistic/get-working-statistic',
		data: {
			department_id: $('#department_id').val(),
		}
	},
	columns: [
	{data: 'action', orderable: false, searchable: false, 'class':'text-center', 'width':'5%'},
	{data: 'name', name: 'name'},
	{data: 'email', name: 'type', 'class':'text-center'},
	{data: 'mobile', name: 'mobile'},
	{data: 'type_job', name: 'type_job', 'class':'text-center', 'width':'10%'},
	]
});

//Xác nhận làm việc của nhân viên
$('body').on('click','#detail-infor',function(){
	//id nhân viên
	var id = $(this).data('id');	

	setTimeout(function () {
		window.location.href = web + 'working-statistic/detail-confirm-work/' + id;
	}, 1000)
});

//Danh sách chi tiết các buổi và giờ đi làm của nhân viên
$('#detail-infor-table').DataTable().destroy();

$('#detail-infor-table').DataTable({
	processing: true,
	serverSide: true,
	ordering: false,
	order: [], 
	pageLength: 30,
	lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
	ajax: {
		type: 'POST',
		url: web + 'working-statistic/get-detail-infor',
		data: {
			user_id: $('#user_id').val(),
		}
	},
	columns: [
	{data: 'DT_Row_Index', orderable: false, searchable: false, 'class':'dt-center', 'width': '5%'},
	{data: 'date', name: 'date', 'class':'text-center', 'width':'15%'},
	// {data: 'type_job', name: 'type_job', 'class':'text-center'},
	{data: 'number_hour_work', name: 'number_hour_work', 'class':'text-center'},
	{data: 'confirm_at', name: 'confirm_at', 'class':'text-center', 'width':'25%'},
	{data: 'shift', name: 'shift', 'class':'text-center'},
	{data: 'user_confirm', name: 'user_confirm', 'width':'15%'},
	{data: 'is_confirm', name: 'is_confirm', 'class':'text-center', 'width':'15%'},
	]
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