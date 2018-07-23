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

  // load from storage
  chrome.storage.sync.get(['DA'], function(data) {
    if(typeof data == undefined || Object.keys(data).length === 0){
      //no users recorded
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>No user added</li>')
      muteList.append(mutedUser);
    } else {
      var muteList = doc.find(".mute_list").eq(0);
      var mutedUser = $('<li>Users found: '+ Object.keys(data).length +'</li>')
      muteList.append(mutedUser);
    }
  });

  //form setup
  doc.find("form.add_user").submit(function(e){
    e.preventDefault();
    $(this).children("input.name").attr("value","");
    

  });

});