var TIMEOUT_SEC = 10; 
var INTERVAL_MILISEC = 100;

//memory
var currInterval = 0;
var intervalObj;
$(document).ready(function(){
	//find text? No too expensive
	var doc = $(document);
	console.warn("DA READY. Start waiting");

	intervalObj = window.setInterval(checkDOM, INTERVAL_MILISEC);

});


function checkDOM() {
 		if($(document).find(".sender").length > 0){
 		  muteUser();
 		  clearInterval(intervalObj);
 		}

 		currInterval+= INTERVAL_MILISEC;
 		if(currInterval>=TIMEOUT_SEC*1000){
 			clearInterval(intervalObj);
 		}
 	}

function muteUser() {

	$(document).find(".sender").each(function(){
		var usernameMatch = "dustytired2";

		$(this).find(".username").each(function(){
			if($(this).text().indexOf(usernameMatch)>=0){
				//sender found!
				$(this).parentsUntil(".note").find('.note-preview').css("filter", "blur(4px)");
			}

		});
	});
}

	