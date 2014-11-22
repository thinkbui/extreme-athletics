$(document).ready(function(){
	var current_frame=1;
	var num_frames=4;
	var current_image=1;
	var num_images=6;

	var specialRollToggle = function(){
		$('#special_content').slideToggle();
		$('#special_cover').fadeToggle();
	}

	$('#special_button').click(specialRollToggle);

	var insetFrameContentOn = function(i){
		$('#iF' + i).fadeIn('2000');
	}

	var insetFrameContentOff = function(i){
		$('#iF' + i).fadeOut('2000');
		
	}

	var insetFrameOn = function(i){
		insetFrameContentOn(i);
		$('#contentBack').fadeIn('2000');
	}
	var insetFrameOff = function(i){
		insetFrameContentOff(i);
		$('#contentBack').fadeOut('2000');
	}

	var buttonOn = function(i){
	//	setTimeout(function (){
			$('#b'+i+'Back').fadeIn('2000');
			$('#b'+i+'Cover').fadeOut('2000');
	//	},500);
		$('#b'+i+'Shape').fadeTo('100',1);
	}

	var buttonOff = function(i){
		$('#b'+i+'Back').fadeOut('100');
		$('#b'+i+'Cover').fadeIn('100');
	//	setTimeout(function (){
			$('#b'+i+'Shape').fadeTo('2000',0.3);
	//	},500);
	}

	var sectionOn = function(i){
		buttonOn(i);
		setTimeout(function (){
			insetFrameOn(i);
		},2000);
	}

	var sectionOff = function(i){
		buttonOff(i);
		insetFrameOff(i);
	}

	var frameChange = function(i){
		if(i!=current_frame){
			sectionOff(current_frame);
			current_frame=i;
			sectionOn(current_frame);
		}
	}

	var aniLinkOn = function(){
		$(this).siblings('.aniLinkLeft').css({ 'left': '15px', 'width': '235px', 'opacity': '1.0' });
		$(this).siblings('.aniLinkRight').css({'width': '235px', 'opacity': '1.0' });
	}

	var aniLinkOff = function(){
		$(this).siblings('.aniLinkLeft').css({ 'left': '0px', 'width': '0px', 'opacity': '0.5' });
		$(this).siblings('.aniLinkRight').css({'width': '0px', 'opacity': '0.5' });
	}

	var imageOn = function(i){
		$('#slide'+i).fadeIn('100');
	}

	var imageOff = function(i){
		$('#slide'+i).fadeOut('100');
	}

	var imageChange = function(i){
		if(i!=current_image){
			imageOff(current_image);
			current_image=i;
			imageOn(current_image);
		}
	}

	var textBounce = function(i,id){
		$(id).unbind('mouseenter mouseleave')
		var x, y, w, h, size, fx, fy, fw, fh, fSize, offsetX, offsetY;
		var mult=1.2;
		fx = $('#b'+i+'Click').position().left;
		fy = $('#b'+i+'Click').position().top;
		fw = $('#b'+i+'Click').width();
		fh = $('#b'+i+'Click').height();
		fSize = parseInt($('.bText').css('font-size'),10);
		size = fSize*mult;
		w = fw*mult;
		h = fh*mult;
		offsetX = (w - fw) / 2;
		offsetY = (h - fh) / 2;
		x = fx - offsetX;
		y = fy - offsetY;
		$('#b'+i+'Text').css({'left' : fx, 'top' : fy, 'width' : fw, 'height' : fh, 'font-size' : fSize+'px'}).animate({'left' : x, 'top' : y, 'width' : w, 'height' : h, 'font-size' : size+'px'},100).animate({'left' : fx, 'top' : fy, 'width' : fw, 'height' : fh, 'font-size' : fSize+'px'},100,
			function(j,id2){
				$(id2).hover(
					function(){
						bMouseEnter(j,id2)
					},function(){
						bMouseOut(j,id2)
					}
				)
			}(i,id)
		);
	}

	var bMouseEnter = function(i,id){
		buttonOn(i);
		if(i!=current_frame){
			textBounce(i,id);
		}
	}

	var bMouseOut = function(i,id){
		if(i!=current_frame){
			buttonOff(i);
			textBounce(i,id);
		}
	}

	for(var i=1;i<=num_frames;i++){
		$('#b'+i+'Click').height($('#b'+i+'Text').height());
		$('#b'+i+'Click').width($('#b'+i+'Text').width());
		(function(j) {
			$('#b'+j+'Click').hover(
				function(){
					bMouseEnter(j,'#b'+j+'Click')
				},function(){
					bMouseOut(j,'#b'+j+'Click')
				}
			)
			$('#b'+j+'Click').click(function(){
				frameChange(j);
			});
		})(i);
		// if(i!=current_frame){
			sectionOff(i);
		// } else {
			// sectionOn(i);
		// }
		sectionOn(current_frame);
	}

	$('.aniLink').each(function() {
		$(this).prepend('<div class="aniLinkLeft"></div><div class="aniLinkRight"></div><div class="aniLinkArrow"></div>');
		$(this).append('<div class="aniLinkClick"></div>');
		var url = '';
		var target = '';
		url = $(this).find('a').attr('href');
		target = $(this).find('a').attr('target');
		$(this).find('.aniLinkClick').click(function(){
			window.open(url, target);
		});
		$(this).find('a').contents().unwrap().wrap('<div class="aniLinkText"></div>');
	});

	$('.aniLinkClick').css('cursor', 'pointer');

	$('.aniLinkClick').hover(function(){
			$(this).siblings('.aniLinkArrow').animate({ 'left': '0px' });
			$(this).siblings('.aniLinkLeft').animate({ 'left': '23px', 'width': '227px', 'opacity': '1.0' });
			$(this).siblings('.aniLinkRight').animate({'width': '227px', 'opacity': '1.0' });
		},function(){
			$(this).siblings('.aniLinkArrow').animate({ 'left': '8px' });
			$(this).siblings('.aniLinkLeft').animate({ 'left': '0px', 'width': '0px', 'opacity': '0.5' });
			$(this).siblings('.aniLinkRight').animate({'width': '0px', 'opacity': '0.5' });
	});

	$('.galleryThumbClick').css('cursor', 'pointer');

	$('.galleryThumbClick').hover(function(){
			$(this).css('box-shadow', '0px 0px 3px 3px #7f7fff');
		}, function(){
			$(this).css('box-shadow', '0px 0px 3px 3px #040710');
	});

	$('.galleryImage').hover(function(){
			var h = $(this).find('.galleryDesc').height();
			var o = 471 - h;
			$(this).find('.galleryDesc').animate({ 'top': o });
		},function(){
			$(this).find('.galleryDesc').animate({ 'top': '471px' });
	});

	for(var i=1;i<=num_images;i++){
		(function(j) {
			$('#thumb'+j).click(function(){
				imageChange(j);
			});
		})(i);
		if(i!=current_image){
			imageOff(i);
		} else {
			imageOn(i);
		}
	}
	$('#contentBack').show();
});