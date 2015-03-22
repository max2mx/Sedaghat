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
	var fullNavOffset = 85;
	var mobileNavOffset = 0;
	var fullScreenImg = true; // First Slide Full Screen
	var fullScreenSlideId = '#case1';
	var logoScrollToTop = true;
	var mobileMenuWidth = 730;
	
    var linksNav = $('.navigation-scroll').find('li:not(.social-link)');
	var links = $('.slide-link');
    destination = $('.destination'); // Determine next slide point (top-content)
	destinationUp = $('.destination-up'); // Determine previous slide point (mid-content)
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
	jQuery.fn.exists = function(){return this.length>0;}
	
	// Add mobile class
	if (isMobile()) {
		$('body').addClass('ismobile');
		$('#center-control').addClass('no-floorplan');
	}
	
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
		
        dataslide = $(this).attr('page-slide');
		
        if (direction === 'down') {
            $('.navigation li[page-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
		}

    }, { offset: 120 });
	
	destinationUp.waypoint(function (event, direction) {
	
        dataslide = $(this).attr('page-slide');
		
        if (direction === 'up') {
			//$('.navigation li').removeClass('active');
            $('.navigation li[page-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }
		
    }, { offset: -90 });
	
	
    mywindow.scroll(function () {
		var caseOffset = $('#case5').offset().top - 150;
        if (mywindow.scrollTop() < caseOffset) {
			$('.navigation li').removeClass('active');
            $('.navigation li[page-slide="5"]').removeClass('active');
            $('.navigation li[page-slide="6"]').removeClass('active');
        }
    });
	
	// Link Scroll Functions
	function goToByScroll(dataslide) {
		var dataOffset = ($('.destination[page-slide="' + dataslide + '"]').offset().top);
		var stickyHeight = navOffset;
		var scrollHeight = dataOffset - stickyHeight + 5;
		htmlbody.stop().animate({scrollTop: scrollHeight}, 900, 'easeInOutQuint');
		
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
	
	// Logo Function
	var logo = $('#logo');
	logo.click(function (e) {
		if (logoScrollToTop) {
			e.preventDefault();
			htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
		}
    });
	
	// Full Size Image
	function resizeFold() {
		var windowHeight = $(window).height();
		//stickyHeight = getStickyHeight();
		newHeight = windowHeight; // - stickyHeight;
		
		if (newHeight < 800) {
			if (isMobile()) {
				newHeight = 500;
			}
			else {
				newHeight = 800;
			}
		}
		
		$(fullScreenSlideId).css({ height: newHeight });
		
		// Compatibility with sliding line (delay of slide 1 load)
		$('.navigation li').removeClass('active');
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
		//refreshStellar();
	});
	
	/*
	function refreshStellar() {
		$(window).data('plugin_stellar').destroy();
		$(window).data('plugin_stellar').init();
	}
	*/
	
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
	
	// More Section Mouseovers
	
	$('.project')
	.mouseenter(function() {
		var gallery = $(this);
		gallery.find('.project-name').stop().fadeIn(100);
		gallery.find('img').stop().animate({
			opacity: 0.05
		}, 300, function () {});
		
	})
	.mouseleave(function(){
		var gallery = $(this);
		gallery.find('.project-name').stop().fadeOut(100);
		gallery.find('img').stop().animate({
			opacity: 1.00
		}, 300, function () {});
	});
	
	$('#back-to-top').click(function() {
		htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
		return false;
	});
	
	// Middle Slide Switch for Mobile
	
	$( window ).resize(function() {
		reorderMiddleSlide();
	});
	reorderMiddleSlide();
	
	function reorderMiddleSlide() {
		if ($(window).width() < 998) {
			$('.case-left .klearfix').each(function( index ) {
				var caseImage = $(this).find('.image').detach();
				$(this).append(caseImage);
			});
		}
		else {
			$('.case-left .klearfix').each(function( index ) {
				var caseContent = $(this).find('.content').detach();
				$(this).append(caseContent);
			});
		}
	}
	
	// Isotope Stuff
	
	function setColWidth() {
		var docWidth = $(document).width();
		if (docWidth <= 800 && docWidth > 400 ) {
			numCols = 2;
			$('#more-container').removeClass('one-col').addClass('two-col');
		}
		else if (docWidth <= 400) {
			numCols = 1;
			$('#more-container').removeClass('two-col').addClass('one-col');
		}
		else {
			var numCols = 3;
			$('#more-container').removeClass('two-col').removeClass('one-col');
		}
		return numCols;
	}
		
	$(function() {
		
		var $container = $('#more-container');
		$container.isotope({
		  itemSelector : '.project',
		  resizable: true
		});
		
		/*
		$(window).smartresize(function(){
			// $container.isotope('destroy');
			$container.isotope({
				itemSelector : '.project',
				resizable: false,
				// update columnWidth to a percentage of container width
				masonry: { columnWidth: $container.width() / setColWidth() }
				
			});
			
		});
		*/
		
	});
	
	// Modal
	
	function abso() {
		var widthLine = 700;
		var line = $("#line");
		var leftPos = ($(window).width() / 2) + widthLine;
		line.css('left','-'+leftPos+'px');
		
		$("body").addClass("modal-open");
		$('#grey-screen').css({
			width: $(document).width(),
			height: $(document).height()
		}).fadeIn(200);
		$('#img-modal').fadeIn(400);
		
		// Animate
		line.animate({left:"0"}, 300, 'easeOutQuint', function() {
			$('#img-modal img.main').delay(400).fadeIn(200, function() {});
			line.delay(200).addClass('pre-active').css('filter','');
			$('#img-modal .modal-arrow').fadeIn(300, function() {
				line.stop().animate({height:widthLine+"px"},{duration: 150, complete: function() {
					
					// Display main-sub
					//$('#img-modal img.main-sub').css('display','block').addClass('active');
					
					// change bg again
					//$('#img-modal img.main').hide();
					
					line.addClass('active');
					if ($('#img-modal img.main').attr('alt')!='') {
						addCaption($('#img-modal img.main').attr('alt'),true);
					}
					
				}});
				
			});
		});
		
	}
	
	function removeCaption() {
		$('.modal-caption').hide();
		var line = $("#line");
		line.animate({height:"500px"}, 20, 'easeOutQuint', function() {
			
		});
	}
	function addCaption(caption,delayFade) {
		var line = $("#line");
		var fade = 20;
		if (delayFade) { fade = 300; }
		line.animate({height:"540px"}, 20, 'easeOutQuint', function() {
			$('.modal-caption').hide().text(caption).fadeIn(fade);
		});
	}
	
	$(window).resize(function() {
		if ($('#grey-screen').is(":visible")) {
			//abso();
		}
    });
	
	$('#floorplan-btn').on('click', function(e) {
		e.preventDefault();
		abso();
	});
	
	$('#grey-screen').on('click', function() {
		$('#img-modal img').removeClass('active');
		$('#img-modal img').fadeOut(200);
		$('#img-modal .modal-arrow').fadeOut(200);
		$('#img-modal').fadeOut(300);
		$('#grey-screen').fadeOut(400, function() {
			$("body").removeClass("modal-open")
			var line = $("#line");
			line.css({"left": "-2500px", "height": "2px", "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#494949', endColorstr='#b5b5b5',GradientType=1 )"}).removeClass('active pre-active');
			$('.modal-caption').hide();
		});
		
	});
	
	$('#img-modal .modal-arrow-left').on('click',function() {
		var activeImg = $('#img-modal img.active');
		if (activeImg.prev().hasClass('sub')) {
			nextImg = activeImg.prev();
		}
		else {
			nextImg = $('#img-modal img.sub:last');
		}
		nextImg.css('display','block').hide().fadeIn(200, function() {
			if (nextImg.attr('alt')!='') {
				addCaption(nextImg.attr('alt'), false);
			}
			else {
				removeCaption();
			}
		}).addClass('active');
		activeImg.fadeOut(200).removeClass('active');
	});
	
	$('#img-modal .modal-arrow-right').on('click',function() {
		var activeImg = $('#img-modal img.active');
		if (activeImg.next().hasClass('sub')) {
			nextImg = activeImg.next();
		}
		else {
			nextImg = $('#img-modal img.sub:first');
		}
		nextImg.css('display','block').hide().fadeIn(200, function() {
			if (nextImg.attr('alt')!='') {
				addCaption(nextImg.attr('alt'), false);
			}
			else {
				removeCaption();
			}
		}).addClass('active');
		activeImg.fadeOut(200).removeClass('active');
	});
	
});

function preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}

preload([
    'images/icon-back-hover.png',
	'images/arrow-down-hover.png',
	'images/play-button-sm-hover.png',
	'images/icon-floorplan-hover.png',
	'images/back-to-top-hover-dk.png',
	'images/arrow-left-sm-hover.png',
	'images/arrow-right-sm-hover.png'
]);

$(window).load(function() {
	$("#overlay").delay(200).fadeOut('600');
	
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
			
			var $container = $('#more-container');
			$container.isotope('destroy');
			$container.isotope({
			  itemSelector : '.project',
			  resizable: true
			});
			
		}
	}
	$( window ).resize(function() {
		refreshStellar();
	});
	refreshStellar();
	
	var $container = $('#more-container');
	$container.isotope('destroy');
	$container.isotope({
	  itemSelector : '.project',
	  resizable: true
	});
	
});