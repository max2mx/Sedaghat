function isMobile() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return true;
	}
	else {
		return false;
	}
}

jQuery(document).ready(function ($) {
	
	// Brave Configurable
	var navOffset = fullNavOffset; // Sticky Navigation Height
	var fullNavOffset = 86;
	var mobileNavOffset = 0;
	var fullScreenImg = true; // First Slide Full Screen
	var fullScreenSlideId = '#ditto1';
	var logoScrollToTop = true;
	var mobileMenuWidth = 730;
	var carouselMouseActive = false;
	var preLoaded = false;
	
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	
	// Add mobile class
	if (isMobile()) {
		$('body').addClass('ismobile');
	}
	
	
    var linksNav = $('.navigation').find('li:not(.blog-link)');
	var links = $('.slide-link');
    destination = $('.destination'); // Determine next slide point (top-content)
	destinationUp = $('.destination-up'); // Determine previous slide point (mid-content)
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
	jQuery.fn.exists = function(){return this.length>0;}
	
	var navOffsetUp = navOffset * -1;
	
	function getStickyHeight() {
		var dittoMobile = $('.menu-mobile');
		var dittoMenu = $('.menu');
		if (isMobileMenu()) {
			var menuHeight = dittoMobile.height();
		}
		else {
			var menuHeight = dittoMenu.height();
		}
		return menuHeight;
	}
	
	function isMobileMenu() {
		var windowWidth = $(window).width();
		if (windowWidth < mobileMenuWidth) {
			var isMobileMenu = true;
		}
		else {
			var isMobileMenu = false;
		}
		return isMobileMenu;
	}
	
	// Auto Scroll Class Functions
	destination.waypoint(function (event, direction) {
		
/*         tempDataSlide = $(this).attr('page-slide'); */
		
        	dataslide = $(this).attr('page-slide');        
/*         console.log(dataslide); */
        
        
/*
if(tempDataSlide==5){
	        dataslide=2;
        } else if(tempDataSlide==4){
	        dataslide=3;
        } else if(tempDataSlide==3){
	        dataslide=4;
        } else if(tempDataSlide==2){
	        dataslide=5;
        }else {
	        dataslide=tempDataSlide;
	        console.log(tempDataSlide);
        }
*/

        
        
        
		
        if (direction === 'down') {
            $('.navigation li[page-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
			//returnToActive();
		}

    }, { offset: 86 });
	
	destinationUp.waypoint(function (event, direction) {
		
/*         tempDataSlide = $(this).attr('page-slide');         */
		
        dataslide = $(this).attr('page-slide');
        
        /*
if(tempDataSlide==5){
	        dataslide=2;
        } else if(tempDataSlide==4){
	        dataslide=3;
        } else if(tempDataSlide==3){
	        dataslide=4;
        } else if(tempDataSlide==2){
	        dataslide=5;
        }else {
	        dataslide=tempDataSlide;
        }
*/
        
		//alert(dataslide);
        if (direction === 'up') {
			//alert('now');
            $('.navigation li[page-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
			//returnToActive();
        }

    }, { offset: -190 });
	
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[page-slide="1"]').addClass('active');
            $('.navigation li[page-slide="2"]').removeClass('active');
        }
    });
	
	// Link Scroll Functions
	function goToByScroll(dataslide) {
		var dataOffset = ($('.destination[page-slide="' + dataslide + '"]').offset().top);
		var stickyHeight = navOffset;
		var scrollHeight = dataOffset - stickyHeight + 5;
		htmlbody.stop().animate({scrollTop: scrollHeight}, 1400, 'easeInOutQuint');
		
    }
	
    linksNav.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('page-slide');
        goToByScroll(dataslide);
    });
	
	links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('page-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('page-slide');
        goToByScroll(dataslide);

    });
	
	// Full Size Image
	function resizeFold() {
		var windowHeight = $(window).height();
		stickyHeight = getStickyHeight();
		//alert(stickyHeight);
		
		newHeight = windowHeight - stickyHeight;
		if (newHeight < 350) {
			newHeight = 350;
			$('#down-arrow-container').fadeOut(300);
		}
		else {
			if (preLoaded) {
				$('#down-arrow-container').fadeIn(300);
			}
		}
		//var newPadding = '0 0 ' + stickyHeight + 'px 0';
		$(fullScreenSlideId).css({ height: newHeight });
		
		// Compatibility with sliding line (delay of slide 1 load)
		$('.navigation li').removeClass('active');
		//returnToActive();
	}
	if (fullScreenImg) {
		resizeFold();
	}
	else {
		$('#down-arrow-container').hide();
	}
	$( window ).resize(function() {
		if (fullScreenImg) {
			resizeFold();
		}
	});
	
	// Logo Function
	var logo = $('#logo');
	logo.click(function (e) {
		e.preventDefault();
		if (logoScrollToTop && (mywindow.scrollTop() > 1)) {
			htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
		}
    });
	
	// Sticky Nav
	
	if ($('#intro').exists()) {
		var menuOffset = $('#intro')[0].offsetTop;
		
		$( window ).resize(function() {
			menuOffset = $('#intro')[0].offsetTop;
		});
		
		$(document).bind('ready scroll', function() {
			var docScroll = $(document).scrollTop();
			
			if (docScroll >= (menuOffset - navOffset)) {
				$('.menu').addClass('fixed');
				$('#intro').addClass('sticky-nav');
				if (isMobileMenu()) {
					$('#intro').addClass('mobile-sticky');
				}
			} else {
				$('.menu').removeClass('fixed');            
				$('#intro').removeClass('sticky-nav');    
				if (isMobileMenu()) {
					$('#intro').removeClass('mobile-sticky');
				}			
			}
		
		});
	}
	
	/* SLIDING LINE */
	
	/*
	function returnToActive() {
		
		if ($('.sliding-line').exists()) {
			var slidingArrow = $('.sliding-line');
			slidingArrow.css('margin-left','0');
			var currPos = slidingArrow.css('left').replace('px','');
			var activeNav = $('.navigation li.active:not(.blog-link)');
			if (typeof activeNav.css('width') != 'undefined') {
				slidingArrow.show();
				var currWidth = activeNav.css('width').replace('px','');
				slidingArrow.css({width: currWidth}, 900, 'swing', function(){});
				var expectedPos = activeNav.offset().left + (currWidth) - -40;
				slidingArrow.stop().animate({left: changePos(currPos,expectedPos)}, 900, 'swing', function(){});
			}
			else {
				//slidingArrow.hide();
			}
		}
	}
	*/
	
	if ($('#nav').exists()) {
		//returnToActive();
	}
	$( window ).resize(function() {
		//returnToActive();
	});
	
	
	$('.navigation').mouseleave(function() {
		//returnToActive();
		$('.sliding-line').hide();
	});
	
	$('.navigation li:not(.blog-link)').mouseenter(function() {
		var slidingArrow = $('.sliding-line');
		if (slidingArrow.css('display')=='none') {
			slidingArrow.show();
		}
		var leftPadding = $(this).css('padding-left').replace('px','');
		var newPadding = parseFloat(leftPadding)-10;
		//if (!($(this).hasClass('active'))) {
			var slidingArrow = $('.sliding-line');
			var currPos = slidingArrow.offset().left;
			var currWidth = $(this).css('width').replace('px','')-20;
			var expectedPos = $(this).offset().left + newPadding; //(currWidth);// + parseFloat(40);
			//slidingArrow.css({width: currWidth}, 600, 'swing', function(){});
			slidingArrow.stop().animate({width: currWidth+"px",left: changePos(currPos,expectedPos)}, 600, 'easeOutQuint', function(){});
			//var expectedPos = $(this).offset().left + 25; //(currWidth);// + parseFloat(40);
			//slidingArrow.stop().animate({left: changePos(currPos,expectedPos)}, 400, 'swing', function(){});
		//}
	}).mouseleave(function() {
		//returnToActive();
		//slidingArrow.show();
	});
	
	function moveSlidingArrow() {
		
	}
	
	function changePos(currPos, expectedPos) {
		if (currPos > expectedPos) {
			var diff = currPos - expectedPos;
			var sign = '-=';
		}
		else {
			var diff = expectedPos - currPos;
			var sign = '+=';
		}
		var finalPos = sign + diff;
		return finalPos;
	}
	
	// Resize for mobile
	
	function displayMenu() {
		var dittoMobile = $('.menu-mobile');
		var dittoMenu = $('.menu');
		if (isMobileMenu()) {
			dittoMobile.show();
			dittoMenu.hide();
			if (dittoMobile.hasClass('active')) {
				var newWindowHeight = $(window).height();
				dittoMobile.css('height', newWindowHeight);
			}
			navOffset = mobileNavOffset;
			$('#ditto-footer').css('margin-bottom',getStickyHeight() + 'px');
		} else {
			dittoMobile.hide();
			dittoMenu.show();
			navOffset = fullNavOffset;
			$('#ditto-footer').css('margin-bottom','0px');
		}
		resizeFold();
	}
	$( window ).resize(function() {
		displayMenu();
	});
	displayMenu();
	
	// Mobile Nav
	
	$('#connect-bar').click(function() {
		var mobileSection = $(this).parent();
		if (mobileSection.hasClass('active')) {
			closeConnectBar();
		}
		else {
			openConnectBar();
		}
	});
	
	$('#connect-content a').on('click', function() {
		closeConnectBar();
	});
	
	function openConnectBar(connectBar,mobileSection,windowHeight) {
		var connectBar = $('#connect-bar');
		var mobileSection = connectBar.parent();
		var windowHeight = $(window).height() - 50;
		connectBar.hide().fadeIn(300); //.html('Close')
		mobileSection.addClass('active');
		mobileSection.animate({ 
			height: "+="+windowHeight}, 300, 'swing', function() {});
	}
	
	function closeConnectBar(connectBar,mobileSection,windowHeight) {
		var connectBar = $('#connect-bar');
		var mobileSection = connectBar.parent();
		var windowHeight = $(window).height() - 50;
		connectBar.hide().fadeIn(300); //.html('Connect With Us')
		mobileSection.removeClass('active');
		mobileSection.animate({ 
			height: "-="+windowHeight}, 300, 'swing', function() {});
	}
	
	// Form Placeholders
	
	var colorHolder = new Array();
	var defaultTextHolder = new Array();
	var defaultColorHolder = new Array();
	
	function bravePlaceholder() {
		$('.add-placeholder').each(function(e){
			var id = $(this).attr('id');
			defaultColorHolder[id] = $(this).css('color');
			defaultTextHolder[id] = $(this).attr('title');
			colorHolder[id] = $(this).attr('phc');
			var placeholder = $(this).attr('title');
			$(this).val(placeholder);
			$(this).css('color',colorHolder[id]);
			
		});
	}
	bravePlaceholder();
	
	$('.add-placeholder').on('focus', function() {
		var id = $(this).attr('id');
		if ($(this).val() == defaultTextHolder[id])
		{
			$(this).val('');
			$(this).css('color',defaultColorHolder[id]);
		}
	});
	$('.add-placeholder').on('blur', function() {
		var id = $(this).attr('id');
		if ($(this).val() == '')
		{
			$(this).css('color',colorHolder[id]);
			$(this).val(defaultTextHolder[id]);
		}
	});
	
	// End Placeholders
	
	/* BEGIN HOMEPAGE */
	
	/* Carousel Activation */
	//$('#ditto-slider').carousel();
	
	var $carousel = $('#ditto-slider');
	$carousel.carousel({
		interval: false
	});
	
	//$carousel.on('slide.bs.carousel', function (event) {
		//alert('slide');
		//returnToActiveCarousel();
	//});
	
	$('#ditto-slider').bind('slid', function () {
		//returnToActiveCarousel();
		if (!carouselMouseActive) {
			setTimeout(returnToActiveCarousel, 20);
		}
	});
	

	
	/* SLIDING LINE */
	
	function returnToActiveCarousel() {
		var slidingArrow = $('.sliding-line-carousel');
		slidingArrow.css('margin-left','0');
		if ($('.sliding-line-carousel').exists()) {
			var currPos = slidingArrow.css('left').replace('px','');
			if ($('.carousel-indicators li.active').exists()) {
				var activeNav = $('.carousel-indicators li.active');
				var currWidth = activeNav.css('width').replace('px','');
				slidingArrow.css({width: currWidth}, 700, 'swing', function(){});
				var expectedPos = activeNav.offset().left + 20; //(parseInt(currWidth)/2);
				slidingArrow.stop().animate({left: changePos(currPos,expectedPos)}, 600, 'swing', function(){});
			}
		}
	}
	
	if ($('#nav').exists()) {
		returnToActiveCarousel();
	}
	$( window ).resize(function() {
		returnToActiveCarousel();
	});
	
	$('.carousel-indicators li').mouseenter(function() {
		carouselMouseActive = true;
		if (!($(this).hasClass('active'))) {
			var slidingArrow = $('.sliding-line-carousel');
			var currPos = slidingArrow.offset().left;
			var currWidth = $(this).css('width').replace('px','');
			var expectedPos = $(this).offset().left + 20; //(parseInt(currWidth)/2);
			slidingArrow.stop().animate({width: currWidth+"px",left: changePos(currPos,expectedPos)}, 500, 'easeOutQuint', function(){
			//slidingArrow.stop().css({width: currWidth}, 400, 'swing', function(){});
			//alert(currWidth);
			//alert($(this).offset().left);
			var expectedPos = $(this).offset().left + 20; //(parseInt(currWidth)/2);
			//slidingArrow.stop().animate({left: changePos(currPos,expectedPos)}, 400, 'swing', function(){
			});
		}
	}).mouseleave(function() {
		carouselMouseActive = false;
		returnToActiveCarousel();
	});
	
	// Gallery Mouseovers
	
	$('.gallery-item')
	.mouseenter(function() {
		var gallery = $(this);
		//$('.gallery-item img').stop(true,true);
		gallery.find('.gallery-info').stop().fadeIn(100);
		gallery.find('img').stop().animate({
			opacity: 0.05,
			left: "+=50"
		}, 500, function () {});
		
	})
	.mouseleave(function(){
		var gallery = $(this);
		//$('.gallery-item img').stop(true,true);
		gallery.find('.gallery-info').stop().fadeOut(0);
		gallery.find('img').stop().animate({
			opacity: 1.00,
			left: "+=50"
		}, 500, function () {});
	});
	
	// Team Members
	
	var bioHeight = 250;
	if (isMobile()) {
		bioHeight = 280;
	}
	
	$('.link-bio').click(function() {
		closeContent('.content-mail',$(this).parent().find('.link-mail'));
		openContent('.content-bio',$(this),bioHeight);
	});
	
	$('.team-member img').click(function() {
		closeContent('.content-mail',$(this).parent().find('.link-mail'));
		openContent('.content-bio',$(this).parent().find('.link-bio'),bioHeight);
	});
	
	$('.team-member img').hover( function() {
		//$(this).parent().find('.close-content').css('border-color','#ff0000');
		$(this).parent().find('.close-content').addClass('active');
	}, function() {
		//$(this).parent().find('.close-content').css('border-color','#999999');
		$(this).parent().find('.close-content').removeClass('active');
	});
	
	$('.link-mail').click(function() {
		closeContent('.content-bio',$(this).parent().find('.link-bio'));
		openContent('.content-mail',$(this),55);
	});
	
	$('.close-content span').on('click', function() {
		closeContent('.content-section',$(this).parent().parent().find('.toggle-link'));
	});
	
	function openContent(contentarea,link,ht) {
		var content = link.parent().parent().find(contentarea);
		if (link.hasClass('active')) {
			closeContent(contentarea,link);
		}
		else {
			link.addClass('active');
			content.stop().animate({ 
				height: ht}, 300, 'swing', function() {});
			content.parent().find('.close-content span').fadeIn(200);
		}
	}
	function closeContent(contentarea,link) {
		var content = link.parent().parent().find(contentarea);
		link.removeClass('active');
		content.stop().animate({ 
			height: 0}, 200, 'swing', function() {});
		content.parent().find('.close-content span').fadeOut(200);
	}
	
	$('.press-slider').bxSlider({
		mode: 'vertical',
		auto: true,
		pause: 10000,
		speed: 1000,
		slideMargin: 0,
		touchEnabled: false
	});
	
	$( window ).resize(function() {
		returnToActiveCarousel();
	});
	
	// Hello Select
	
	$('.hello-select label').click(function() {
		var learnSelect = $(this).parent();
		var menu = learnSelect.find('.select-box');
		if (learnSelect.hasClass('active')) {
			learnSelect.removeClass('active');
			menu.fadeOut(300);
		}
		else {
			$('.select-box').fadeOut(300);
			$('.hello-select').removeClass('active');
			learnSelect.addClass('active');
			menu.fadeIn(300);
		}
	});
	
	$('body').click(function(event) {
		if (!$(event.target).closest('.hello-select').length) {
			$('.select-box').fadeOut(300);
			$('.hello-select').removeClass('active');
		}
	});
	
	$('.select-box a').on('click',function() {
		var selected_value = $(this).text();
		var pass_value = $(this).attr('data-filter-value');
		$('#hello-updates').val(pass_value);
		var learn_select = $(this).parent().parent();
		var select_box = $(this).parent();
		if (!($(this).hasClass('default-select'))) {
			learn_select.addClass('selected-active').removeClass('active');
			select_box.find('a').removeClass('selected');
			$(this).addClass('selected');
		}
		else {
			select_box.find('a').removeClass('selected');
			learn_select.removeClass('selected-active').removeClass('active');
			selected_value = '';
		}
		
		learn_select.find('.select-box').hide();
		learn_select.find('.selected-value').text(selected_value);
	});
	
	// Form
	
	function std_email_form(obj,message) {
		var hasError = false;
		obj.find('.required').each(function() {
			if (jQuery.trim($(this).val()) == '' || $(this).val() == defaultTextHolder[$(this).attr('id')] || $(this).val() === '0') {
				hasError = true;
				$(this).addClass('invalid');
			}
			else {
				$(this).removeClass('invalid');
			}
		});
		
		var sending = obj.find('.submit-sending');
		var invalid = obj.find('.submit-invalid');
			invalid.hide();
		var sendBtn = obj.find('.submit-btn');
		sendBtn.hide();
		sending.css('display','inline');
		
		if(!hasError) {
			invalid.hide();
			var formInput = obj.serialize();
			$.post(obj.attr('action'),formInput, function(data){
				var output = $.parseJSON(data);
				if (output.result === 'success') {
					sending.hide();
					obj.before(message);
					obj.hide();
				}
				else {
					sending.hide();
					invalid.html('Please provide a valid email address and all required fields').fadeIn(200);
					sendBtn.show();
				}
			});
		}
		else {
			sending.hide();
			invalid.hide().html('Please fill in the required fields').fadeIn(200);
			sendBtn.show();
		}
		
		return false;
	}
	$('.select-box a').click(function(e) {
		e.preventDefault();
	});
	
	$('#hello-form').submit(function(e) {
		e.preventDefault();
		std_email_form($(this),'<div class="success-message"><p>Thank you for your message! <br />Someone from our team will respond to you as quickly as possible.</p></div>');
	});
	
	$('#hello-clear').click(function(e) {
		var obj = $('#hello-form');
		obj.find('.required').each(function() {
			$(this).val('');
			if ($(this).hasClass('get-updates')) {
				$(this).val('yes');
			}
		});
		$('.hello-select').removeClass('selected-active');
		$('.select-box a').removeClass('selected');
		bravePlaceholder();
	});
	
	$('#back-to-top').click(function() {
		htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
		return false;
	});
	
	// Flip Correction
	
	if (!(is_chrome)) {
		$('.face').css('display','none');
		$('.social-card').addClass('fix');
		$('.social-card').find('.back').addClass('fix');
	}
	$('.social-card').mouseenter(function() {
		if (!(is_chrome)) {
			//$(this).find('.back').stop().fadeIn(100).css('display','block');
			$(this).find('.back').addClass('show');
		}
	}).mouseleave(function() {
		if (!(is_chrome)) {
			//$(this).find('.back').stop().fadeOut(300);
			$(this).find('.back').removeClass('show');
		}
	});
	
	/* END HOMEPAGE */

});

function preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}

preload([
    'images/play-button-sm-hover.png',
	'images/play-button-hover.png',
	'images/back-to-top-hover.png',
	'images/arrow-down-hover.png',
	'images/icon-bio-active.png',
	'images/icon-mail-active.png',
	'images/icon-down-active.png',
	'images/icon-hello-mail-white.png',
	'images/icon-hello-phone-white.png',
	'images/icon-hello-pin-white.png'
]);

$(window).load(function() {
	$("#overlay").delay(200).fadeOut('600');
	$('#down-arrow-container').fadeIn(900).animate({bottom: "20%",}, 100, function() {});
	preLoaded = true;
	/*
	if (!(isMobile())) {
		$(window).stellar({
			verticalScrolling: true,
			horizontalScrolling: false
		});
	}
	*/
	
	function refreshStellar() {
		if ($(window).width() > 680 && (!(isMobile()))) {
			$(window).stellar({
				verticalScrolling: true,
				horizontalScrolling: false
			});
			$(window).data('plugin_stellar').destroy();
			$(window).data('plugin_stellar').init();
		}
		else {
			if ($(window).data('plugin_stellar') != undefined) {
				$(window).data('plugin_stellar').destroy();
				$('.stellar-bg').css('background-position','50% 50%');
			}
		}
	}
	$( window ).resize(function() {
		refreshStellar();
	});
	refreshStellar();
	
});