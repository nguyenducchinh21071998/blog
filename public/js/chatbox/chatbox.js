$("#live-chat").on('click', function(){
  if ($(this).hasClass('active-chat-box') == false) {
    $(this).addClass('active-chat-box');
  } else {
    $(this).removeClass('active-chat-box');
  }

});
