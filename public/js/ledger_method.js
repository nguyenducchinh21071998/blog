function statistical(id, url)
{
	$('#statistical-mdl').modal('show');
	$('#statistical-tbl').DataTable().destroy();
	$('#statistical-tbl').DataTable({
	    processing: true,
	    serverSide: true,
	    ajax: {
		    url: url,
		    type: "POST",
		    data: {
		    	id: id,
		    }
	    },
	    ordering: false,
	    columns: [
	      {data: 'class_name', name: 'class_name'},
	      {data: 'user_type', name: 'user_type'},
	      {data: 'type', name: 'type'},
	      {data: 'unit_count', name: 'unit_count', class: 'text-right'},
	      {data: 'salary', name: 'salary', class: 'text-right'},
	      {data: 'total', name: 'total', class: 'text-right'},
	      {data: 'action', name: 'action', class: 'text-center'},
	    ],
	    drawCallback: function(settings) {
	    	console.log('asd');
		},
	});
}