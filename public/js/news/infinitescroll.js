var page = 1;

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
        page++;
        loadMoreData(page);
    }
});

function loadMoreData(page){
  $.ajax(
    {
        url: '?page=' + page,
        type: "get",
        beforeSend: function()
        {
            // show loading image
            $('.ajax-load').show();
            
        }
    })
    .done(function(data)
    {
        if(data.html == " "){
            $('.ajax-load').html("No more records found");
            return;
        }
        // hide loading image
        $('.ajax-load').hide(); 

        var $content = data.html; 
        // add item to grid and reload item by masory js
        jQuery('#grid').append( $content ).masonry( 'appended', $content ).masonry('reloadItems');
        // layout Masonry after each image loads
        jQuery('#grid').imagesLoaded().progress( function() {
          jQuery('#grid').masonry();
        });
        
        
    })
    .fail(function(jqXHR, ajaxOptions, thrownError)
    {
          alert('server not responding...');
    });
}