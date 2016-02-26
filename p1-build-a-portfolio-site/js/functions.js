$(window).scroll(function() {

	var wScroll = $(this).scrollTop();

	$('header .content').css({
		'transform' : 'translate(0px, '+ wScroll /2.5 + '%)'
	});

	if(wScroll > $('.featured-work').offset().top - ($(window).height() / 1.3)) {

		$('.featured-work figure').each(function(i){

			setTimeout(function(){
				$('.featured-work figure').eq(i).addClass('is-showing');
			}, 150 * (i+1));

		});

	}

});