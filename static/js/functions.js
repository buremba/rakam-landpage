$(document).ready(function(){
  $(".iframe").colorbox({
    iframe:true, 
    width:"80%", 
    height:"80%",
    onComplete:function(){ 
      $('html').css('overflow', 'hidden');
      $('.cboxIframe').focus();
    },
    onClosed:function(){ 
      $('html').css('overflow', 'inherit');
    }
  });
});