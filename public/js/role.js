$(function() {
        var table = $('#roles-table').DataTable({
	        processing: true,
	        serverSide: true,
	        ordering: false,
	        order: [],
            pageLength: 30,
            lengthMenu: [[30, 50, 100, 200, 500], [30, 50, 100, 200, 500]],
	        ajax: app_url + 'list-role',
	        columns: [
	            {data: 'DT_Row_Index', name: 'id', 'class':'dt-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, 'class':'dt-center'},
	            {data: 'display_name', name: 'display_name'},
	            {data: 'name', name: 'name'},
	            {data: 'description', name: 'description'},
	            {data: 'created_at', name: 'created_at', 'class':'dt-center'},
	            
	        ]
        });

        //edit role
    $(document).on('click', '.btn-edit', function () {

		$('#editRoleModal').modal('show');
        var id = $(this).data('id');

        $.ajax({
              type: "GET",
              url: app_url + "roles/" + id,
              success: function(res)
              {

                $('#edit_name').val(res.data.name);
                $('#edit_id').val(res.data.id);
                $('#edit_name').focus();
                $('#edit_display_name').val(res.data.display_name);
                $('#edit_display_name').focus();
                $('#edit_description').val(res.data.description);
              },
              error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(thrownError);
              }
        });
    }); 


    $(document).on('submit','#edit-role',function(e){

          e.preventDefault();

          var id = $('#edit_id').val();
          var form= $('#edit-role');
          var formData= form.serialize();

          if(! form.valid()) return false;

          $.ajax({
            type:'PUT',
            url: app_url + 'roles/' +id,
            data: formData,
            success:function(data) {
                if(!data.error) {

                    toastr.success("Cập nhật thành công"); 
    
                    $('#editRoleModal').modal('hide');
					
					table.ajax.reload(null, false);

                } else {
                    
                    if(data.message.display_name == undefined && data.message.name == undefined){
                        toastr.error(data.message);
                    }else{
                        if(data.message.display_name != undefined) {
                            toastr.error(data.message.display_name);
                        }
                        if(data.message.name != undefined) {
                            toastr.error(data.message.name);
                        }
                    }
                }
              
            },
            error: function (xhr, ajaxOptions, thrownError) {
              toastr.error(thrownError);
            }
          });

    });


    //delete role
    $(document).on('click', '.btn-delete', function (){
		
		var role_id =  $(this).data('id');

	    swal({
	        title: "Bạn có chắc muốn xóa?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "#DD6B55",
	        cancelButtonText: "Không",
	        confirmButtonText: "Có",
	    },

	    function(isConfirm) {

	        if (isConfirm) {  

		        $.ajax({
		              type: "DELETE",
		              url: app_url + "roles/" + role_id,
		              success: function(res)
		              {
		                if (res.error == false) {
                            toastr.success('Xóa thành công!');
                            table.ajax.reload(null, false);
                        } 
                        if (res.error == true) {
                            toastr.error('Xóa thất bại do vai trò này đang được sử dụng!');
                            table.ajax.reload(null, false);
                        }
		              },
		              error: function (xhr, ajaxOptions, thrownError) {
		                toastr.error(thrownError);
		              }
		        });   
	        } 
	    });
    });


    //show popup add role
    $(document).on('click','.btn-add-role', function() {
		$('#createRoleModal').modal('show');
        $('#name').val('');
        $('#display_name').val('');
        $('#description').val('');
    });

    $(document).on('submit','#add-role', function(e){

        e.preventDefault();

		var form= $('#add-role');
		var formData= form.serialize();

		if(! form.valid()) return false;

		$.ajax({
		    type:'POST',
		    url: app_url + 'roles',
		    data: formData,
		    success:function(data){

		        if(!data.error) {

		            toastr.success("Thành công"); 	            
		            $('#createRoleModal').modal('hide');						
					table.ajax.reload(null, false);	

		        } else {
                    if(data.message.display_name == undefined && data.message.name == undefined){
                        toastr.error(data.message);
                    }else{
                        if(data.message.display_name != undefined) {
                            toastr.error(data.message.display_name);
                        }
                        if(data.message.name != undefined) {
                            toastr.error(data.message.name);
                        }
                    }
		        }   
		    },
            error: function (xhr, ajaxOptions, thrownError)
            {
              toastr.error(thrownError);
            }
		});
    });

});
        