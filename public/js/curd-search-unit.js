$(document).ready(function() {
	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();
    //------------------------------- search unit-----------------------------------------
        $('#search_unit').on('keyup',function() {

            // delay(function(){
              
                var keyword = $(this).val();
                var id_classRoom = $("#id_classRoom").val();
                $.ajax({
                    type: "get",
                    url: '' + id_classRoom + '/search-unit?keyword=' + keyword,
                    cache: false,
                    success: function(data)
                    {
                        console.log(data);
                        $("#content_list_unit").html('');
                        $("#content_list_unit").append(data);
                        
                    }
                })             
            // }, 500);
        });
});