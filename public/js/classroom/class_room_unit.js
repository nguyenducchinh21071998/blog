    var web = $('meta[name="website"]').attr('content');

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
    //validate unique Unit
    $("#unit_number").on('blur', function(e) {
        // e.preventDefault();
        var id_unit = $("#number_unit").val();
        var data=$("#unit_number").val();
        // var formData = $('#frmUpdateUnit').serialize();
        var url = id_unit+'/validate-number-unit';

        $.ajax({
            type: 'get',
            url: url,
            data:{'unit_check' :data} ,
            success: function(data) {
                console.log(data);
                if (data.error) {
                    $('.errorUnit').show().text(data.msg);
                }else{
                    $(".error").hide();
                }
            }
        })
    }); 

    // -------------------call modal add unit-----------------
    function addUnit(class_room_id) {

		window.location.href = web+"classroom-unit/create" + "?class_room_id=" + class_room_id + "";

    }
     $("#unit").on('blur', function(e) {
        var id_classRoom =$("#id_classRoom").val();
        var id_unit_input=$(this).val();
        // if (id_unit_input != "") {
        var url = id_classRoom+'/validate-number-unit';
        $.ajax({
            type: 'get',
            url: url,
            data: {
              'id_classRoom' :id_classRoom,
              'id_unit_input' : id_unit_input
            },
            success: function(data) {
                console.log(data);
                if (data.check_number_unit > 0) {
                   $('.errorUnit').show().text("Số bài học này đã tồn tại !!");
                   $('#frm-add-unit button[type="submit"]').prop('disabled', true);
                } else {
                   $('.error').hide();
                   $('#frm-add-unit button[type="submit"]').prop('disabled', false);
                }
            },
        
        })

        // }

    }); 
   //-------------------add new unit--------------------------
    $('#frmAddUit').validate({ // initialize the plugin
		        errorElement: "span",
		        rules: {
		          unit : {
		            required : true,
		            number:true,
		            min: 1,
		            max:1000
		            
		          },
		          unit_name : {
		            required :true,
		            minlength :2,
		            maxlength : 500
		          },
		          status : {
		            required :true,
		            min:0,
		            number :true
		          }
		        },
		        messages: {
		          unit : {
		            required : "Bạn phải nhập số bài học",
		            number:"Số bài học phải là dạng số",
		            min: "Số bài học có giá trị nhỏ nhất là 1",
		            max : "Số bài học có giá trị lớn nhất là 1000"
		          },
		          unit_name: {
		            required :"Bạn phải nhập tên bài học",
		            minlength: "Tên bài học có độ dài ít nhất 2 ký tự",
		            maxlength : "Tên bài học có độ dài tối đa 500 ký tự"
		          },
		          status : {
		            required :"Bạn phải chọn trạng thái",
		            number : "Trạng thái không đúng định dạng"
		          }
		        },      	


        submitHandler: function(form) {
	
	        $.ajaxSetup({
	            headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	            }
	        });
	        e.preventDefault();
	  	    var tuition_policy =tinymce.get('tuition_policy').getContent();

	  
	        $('#frmAddUit button[type="submit"]').prop('disabled',true);
	        $.ajax({
	            type:'POST',
	            url: web + 'classroom-unit',
	            data: {
	            	unit : $("#unit").val(),
	            	unit_name : $("#unit_name").val(),
	            	note : $("#note").val(),
	            	status : $("#status").val()
	            },
	     
	            success:function(data){
	                console.log(data);
	                if(!data.error) {
	                    toastr.success('Thêm mới lớp học thành công!');

	                    // setTimeout(function () {   
	                    //     window.location.href = web+"classroom";
	                    // }, 1500)

	                } else {
	                    toastr.error('Thêm mới không công !');
	                    $('#frmAddUit button[type="submit"]').prop('disabled',false);
	                }
	              },
	              error: function (xhr, ajaxOptions, thrownError) {
	                toastr.error(thrownError);

	              }
	        });
	     
    }
});
  