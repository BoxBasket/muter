var TIMEOUT_SEC = 10; 
var INTERVAL_MILISEC = 100;

//memory
var currInterval = 0;
var intervalObj;
var userdata;
// load from storage
chrome.storage.sync.get(['DA'], function(data) {
	if(typeof data == undefined || Object.keys(data).length === 0){
	  //no users recorded
	  userdata = {};
	} else {
    userdata = data;
	}
});


$(document).ready(function(){
	//find text? No too expensive
	var doc = $(document);
	console.warn("Muter is Ready. Standby.");

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
				$(this).parentsUntil(".note").find('.note-preview').css("filter", "blur(3px)");
			}

		});
	});
}

	