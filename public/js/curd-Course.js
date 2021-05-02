$(document).ready(function() {
    //khoi tao delay time

    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();
    
    //search
    $("#search").on('keyup', function() {
        delay(function(){
            var keyword = $("#search").val();
            $.ajax({
                type: "GET",
                url: "search?keyword=" + keyword,
                cache: false,
                success: function(courses)
                {
                    
                    $("#repalceTable").html('');
                    $("#repalceTable").append(courses);
                    
                }
            });
        },500);
               
    });
});
// end doccument