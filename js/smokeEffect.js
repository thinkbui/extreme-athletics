var SmokeEffect = {
	
	imgLocation: "image/39.PNG", //url to image here
	smokeWidth: 50, //standard width
	smokeHeight: 50, //standard height
	pageState: 0,
	
	//don't touch this:
	smokePos: new Array(),
		
	makeEffect: function(id, URL, rw, rh, posX, posY, posX2, posY2,zin) {
		//set position from the "parent"
		SmokeEffect.smokePos[id] = new Array();
		SmokeEffect.smokePos[id]['URL'] = URL;
		SmokeEffect.smokePos[id]['rw'] = rw;
		SmokeEffect.smokePos[id]['rh'] = rh;
		SmokeEffect.smokePos[id]['x'] = posX;
		SmokeEffect.smokePos[id]['y'] = posY;
		SmokeEffect.smokePos[id]['xf'] = posX2;
		SmokeEffect.smokePos[id]['yf'] = posY2;
		SmokeEffect.smokePos[id]['x2'] = (posX2 + posX) / 2;
		SmokeEffect.smokePos[id]['y2'] = (posY2 + posY) / 2;
		SmokeEffect.smokePos[id]['zin'] = zin;
		
		//set a random time to start puffing
		var time = (Math.floor(Math.random()*3001));
		setTimeout("SmokeEffect.animate('" + id + "')", time);
	},
	
	animate: function(id) {

		//create the smoke cloud
		var puff = document.createElement("IMG");
		$(puff).attr("src", SmokeEffect.smokePos[id]['URL']);
		$(puff).attr("alt", "puff");
		$(puff).attr("class", "puff");
		
		//create a temp id for the cloud so we can delete it later on
		var tempId = "puff" + Math.floor(Math.random()*1001);
		$(puff).attr("id", tempId);
		
		//append the cloud to the body
		$(document.body).append($(puff));
		
		var objPos = $('#' + id).offset();
		
		
		//do smoke animation
		$(puff).css({
			width: SmokeEffect.smokePos[id]['rw'] + "px",
			height: SmokeEffect.smokePos[id]['rh'] + "px",
			top: (objPos['top'] + SmokeEffect.smokePos[id]['y']) + "px",
			left: (objPos['left'] + SmokeEffect.smokePos[id]['x']) + "px",
			zIndex: SmokeEffect.smokePos[id]['zin'],
		//	opacity: 0.4
			opacity: 1.0
		});
		$(puff).animate({
			width: SmokeEffect.smokePos[id]['rw'] + "px",
			height: SmokeEffect.smokePos[id]['rh'] + "px",
		//	marginLeft: "-" + (SmokeEffect.smokePos[id]['rw'] / 2) + "px",
		//	marginTop: "-" + (SmokeEffect.smokePos[id]['rh'] * 1.5) + "px",
			top: (objPos['top'] + SmokeEffect.smokePos[id]['yf']) + "px",
			left: (objPos['left'] + SmokeEffect.smokePos[id]['xf']) + "px",
		//	opacity: 0.9
			opacity: .0
		},{
			duration: 1000
		});
		//$(puff).animate({
		//	marginTop: "-" + (SmokeEffect.smokePos[id]['rh'] * 3.5) + "px",
		//	opacity: 0.0
		//},{
		//	duration: 500
		//});
		
		//create timeout and run the animation again
		var time = 1000 + (Math.floor(Math.random()*201));
		
		setTimeout("SmokeEffect.animate('" + id + "')", time);
		
		//remove the old one
		setTimeout("$('#" + tempId + "').remove()", 4200);
		
	}
}