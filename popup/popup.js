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

  //debug: clear storage
  //chrome.storage.sync.clear();

  // load from storage
  chrome.storage.sync.get(['DA'], function(data) {
    console.warn(data);
    if(typeof data == undefined || Object.keys(data).length === 0){
      //SNS not in storage. Add one.
      console.log("Site 'DA' IS NOT FOUND");
      storageSet('DA', {});
    }

    currDomainUsers = data.DA;

    if (currDomainUsers == undefined || Object.keys(currDomainUsers).length === 0){
      // no user added for this site
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>No user added</li>')
      muteList.append(mutedUser);

    } else {
      // list stored users
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>Users found: '+ currDomainUsers +'</li>')
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



function storageSet(key, value){
  chrome.storage.sync.set({key: value}, function() {
    console.log('Stored {' +key+ " : "+ value +"}");
  });
}