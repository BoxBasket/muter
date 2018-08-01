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

var userListTemplate = `
<li>{} | added {} | <a href="#" class="user_delete">delete</a></li>
`


$(document).ready(function(){
  var doc = $(document);
  var currDomainUsers;

  //debug: clear everything
  doc.find('#clear').click(function(){
    // note: only 1 id allowed on a DOM
    console.log('Clear storage');
    chrome.storage.sync.clear();
  });


  chrome.storage.sync.get(['DA'], function(data) {
    if(typeof data == undefined || Object.keys(data).length === 0){
      //SNS not in storage. Add one.
      console.log("No dataset for 'DA'. Initializing.");
      storageSet("DA", {}, listUsers, data);
    } else {listUsers(data);}
  });

  var bind_deleteUser = function(){
    // function for binding 'delete' link next to users

  }
  
  var appendOneUser = function($muteList, username, dateAdded){

    var userLiObj = $(useTemplate(userListTemplate, [ username, dateAdded ]));
    $muteList.append(userLiObj);

    // bind delete event
    userLiObj.children("a.user_delete").click(function(e){
      e.preventDefault();
      storageRemove(username); 
      //visual
      userLiObj.remove();

    });
  }


  var listUsers = function(data){
    currDomainUsers = data.DA;

    if (currDomainUsers == undefined || Object.keys(currDomainUsers).length === 0){
      // no user added for this site
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>No user added</li>')
      muteList.append(mutedUser);

    } else {
      
      // list stored users
      var $muteList = doc.find(".mute_list").eq(0);
      for (var un in currDomainUsers){
        if (currDomainUsers.hasOwnProperty(un)){
          // add each user
          appendOneUser($muteList, un, currDomainUsers[un]);
        }
      }

    }
  }
  

    

  //form setup
  $("#add_user").submit(function(e){
    e.preventDefault();
    //alert($(this).children("input.name").length);
    var inputNameField = $(this).find("input.name");
    var inputName;

    if (inputNameField.length > 0){
      // TO DO: sanitization of value required
      inputName = inputNameField.val();
      
      // add user
      var today = new Date();
      if (typeof currDomainUsers == undefined)
        currDomainUsers = {};
      
      currDomainUsers[inputName] = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
      
      storageSet('DA', currDomainUsers);

      // Add to popup
      var $muteList = doc.find(".mute_list").eq(0);
      appendOneUser($muteList, inputName, currDomainUsers[inputName]);
      
    }

    // Clean up
    inputNameField.val("");
    console.log(inputName);
    

  });

});

function storageSet(key, value, callback){
  
  chrome.storage.sync.set({[key]: value}, function() {

    chrome.storage.sync.get([key], function(datatest) {
      console.log('Stored {' +key+ " : "+ datatest[key] +"}");
      console.log(datatest);
    });
    
  });
}

function storageRemove(un, callback){
  // not an actual remove. Because I keep everything sorted by a site,
  // you must modify the dataset...
 
  // get the data for the current site
  // Using DA for now
  var currSite = 'DA';
  var currSiteData;
  chrome.storage.sync.get([currSite], function(datatest) {
   
    //remove on key
    currSiteData = datatest[currSite];

    if(currSiteData.hasOwnProperty(un) ){
      delete currSiteData[un];
    } 

    //put it back to storage
    storageSet(currSite, currSiteData);

  });
}


function useTemplate(template, data){
  var templateElemArr = template.split("{}");
  var templateOut = templateElemArr[0];
  for(var i=1; i<templateElemArr.length;i++){
    templateOut += data[i-1]+templateElemArr[i];
  }

  return templateOut;
}