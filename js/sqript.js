
$(function () {

  var $modal, $parent, $elem;
  var $body = $('body');


  function callAPI(inputValue) {
    $.ajax({
      url:
      'https://pixabay.com/api/?key=3270070-e448714d3a5efe7670c473a3a&q=' + inputValue + '&image_type=photo&callback=callbackFunc&context=?',
      dataType: 'jsonp'
    });
  }


  var $input = $('.search-input');
  
  $input.focus();
  $input.on('keypress', function(e) {
  		  	   if (e.keyCode == 13) {
			     e.preventDefault();
                             $('.wrapper').empty();
                    	     callAPI($input.val());
		  	   };
  });


  var $submit = $('.search-submit');
  $submit.on('click', function(e) {
		        e.preventDefault();
                        $('.wrapper').empty();
			callAPI($input.val());
  });

 
  

});


function callbackFunc(data) {

  $.each(data.hits, function(i, hit) {
                      $parent = $('.wrapper');
	              $elem = $('<a class="link-item" href="' + hit.webformatURL + '"></a>');
                      $parent.append($elem);   

                      $parent = $('.link-item');
                      $elem = $('<img class="img-item" src="' + hit.previewURL + '" alt="' + hit.tags + '" >');
                      $parent.last().append($elem);   
  	            });

  var $link = $('.link-item');

  $link.on('mouseenter', showModal)
       .on('mouseleave', hideModal);

}


function showModal() {

  $body = $('body');

  var windowWidth = $(window).width();

  var href = $(this).attr('href');
  var leftOffset = $(this)[0].offsetWidth + 10;
  var topOffset = $(this)[0].firstChild.naturalHeight;

  $modal = $('<div class="fancybox-modal"><img src="' + href + '"></div>');
  $body.append($modal);
  
  
  var offsetPreview = $(this).offset();
  
  $modal = $('.fancybox-modal');

  var $img = $modal.find('img');
  $img.css('width', leftOffset * 2.5);
  var imgWidth = $img[0].width + 30; 

  if ((offsetPreview.left  + leftOffset + imgWidth) < windowWidth) {
    $modal.css('top', offsetPreview.top - topOffset).css('left', offsetPreview.left + leftOffset); 
  }
  else {
    $modal.css('top', offsetPreview.top - topOffset).css('left', offsetPreview.left - imgWidth); 
  }
}



function hideModal() {
  $modal.remove();
}
