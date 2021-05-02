$(function(){
	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	// chức năng search

	$("#search_student").on('keyup', function() {
		delay(function(){
			var keyword = $("#search_student").val();
			var link=$('meta[name="website"]').attr('content');
	        $.ajax({
	            type: "GET",
	            url: link+"studentCare/search?keyword=" + keyword,
	          	cache: false,
	            success: function(student)
	            {
	            	
	            	$("#data-search").html('');
	            	$("#data-search").append(student);
	            	
	            }
	        });     
		},500);
	});

	$('#data-search').delegate('.student-select','click',function(){
		var id_student = $(this).data('id');
		var content = $('#arrStudent').val();
		alert(content);
		var html_student= $(this).html();
		$('#student_id').val(id_student);
		$('#search_student').val($(this).html());
		
	});


	// $("#search_student").autocomplete({
 //        source: function (request, response) {
 //            $.ajax({
 //                type: 'GET',
 //                url: link+"studentCare/search?keyword=" + keyword,
 //                dataType: 'json',
 //                success: function(jsonData) {
 //                    $("#data-search").html('');
	//             	$("#data-search").append(jsonData);
 //                }
 //            });
 //        },
 //        delay: 0,
 //        minLength: 2,
 //        // open: function() {
 //        //     $(this).autocomplete("widget")
 //        //            .appendTo("#autocomplete-results")
 //        //            .css("position", "static")},
 //        focus: function( event, ui ) {
 //          // $(this).attr("placeholder", ui.item.label);
 //          return false;  
 //        }, 
 //        select: function (event, ui) {
 //            event.preventDefault();
 //            var url = ui.item.value;
 //            if (url != '#') {
 //                location.href = url;
 //            }
 //        }
 //    });
});