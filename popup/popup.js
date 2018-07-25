/*document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';

      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);*/



$(document).ready(function(){
  var doc = $(document);
  var userArr = {};

  // load from storage
  chrome.storage.sync.get(['DA'], function(data) {
    if(typeof data == undefined || Object.keys(data).length === 0){
      //no users recorded
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>No user added</li>')
      muteList.append(mutedUser);
    } else {
      var muteList = doc.find(".mute_list").eq(0);
      console.log(Object.keys(data));
      var mutedUser = $('<li>Users found: '+ Object.keys(data).length +'</li>')
      muteList.append(mutedUser);
    }
  });

  //form setup
  $("#add_user").submit(function(e){
    e.preventDefault();
    //alert($(this).children("input.name").length);
    var inputNameField = $(this).find("input.name");
    var inputName;

    if (inputNameField.length > 0){
      // TO DO: sanitization of value required
      inputName = inputNameField.val();
      
      //save
      userArr.push(inputName);
      console.log("userArr ready:" + userArr);
      chrome.storage.sync.set({'DA': userArr}, function() {
          console.log('User successfully added: ' + inputName);
        });
      
    }

    //visual
    inputNameField.val("");
    console.log(inputName);
    

  });

});