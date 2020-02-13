var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 900
});

$(document).ready(function () {
	$(window).scroll(function () { // check if scroll event happened
	  if ($(document).scrollTop() > 58) { // check if user scrolled more than 50 from top of the browser window
		
		$('.navbar').removeClass('navbar-light');
		$('.navbar').addClass('solid');
		$('.navbar').addClass('fixed-top');
		$('#brand').removeClass('navbar-brand');
		$('#brand').addClass('navbar-brandActive');
		// $('#link').removeClass('nav-link');
		// $('#link').addClass('nav-linkActive');

		
		
  
	  } else if ($(document).scrollTop() < 58 ) { //if the scrollbar is less than 50 px from the top it goes back to transparency 
		$('.navbar').removeClass('solid');
		$('.navbar-brand').removeClass('navbar-brandActive');
		$('.navbar').addClass('navbar-light');
		$('.nav-link').removeClass('active1')
		$('#brand').addClass('navbar-brand');
		$('#brand').removeClass('navbar-brandActive');
		// $('#link').addClass('nav-link');
		// $('#link').removeClass('nav-linkActive');
		
		
	  }
  
  
	});
  });