/*
*	Telephone Number Detection
*	Mohamed Habashy
*	mohamed.habshey10@gmail.com
*/


var pref = Preferences; // alias for the Preferences object
var ext = new Process();
var utUser = "";
var storageArea = chrome.storage.sync ? chrome.storage.sync : chrome.storage.local
ext.init(); // set the initial state of the extension icon (ON/OFF)
chrome.browserAction.onClicked.addListener(function (TAB) { ext.toggle(); });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.pageLoad && pref.get('enabled')) sendResponse({ parseDOM: true });
});

window.setInterval(function () { ext.isPageComplete(); }, 5000);
storageArea.get("utUser", function (obj) {
		utUser = obj.utUser;
});
chrome.storage.onChanged.addListener(function (changes) {
  
  if (changes.utUser != undefined) {
    utUser = changes.utUser.newValue;
    console.log("utUser",changes);
    if (utUser) {
      ext.enable();
    } else {
      ext.disable();

    }
  }
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // message.searchText is the text that was captured in the popup    
  // Search/Highlight code goes here
  if (message.call) {
    console.log("Message: ", JSON.stringify(message));
    console.log("sender: ", JSON.stringify(sender));
    var data = new FormData();
    data.append('DestinationPhoneNo', message.call);
    data.append('UserExtension', utUser.MyExtension);
    data.append('UserID', utUser.UserId);


    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://tpcrm.teleplus.net/home/CreateCallFile', true);
    xhr.onload = function () {
      // do something to response
      console.log(this.responseText);

    };
    xhr.send(data);
    sendResponse({ farewell: "Calling:" + message.call });
    //console.log("sendResponse: ", JSON.stringify(sendResponse));

  }
});



inject = function (tab) {

  chrome.tabs.executeScript(tab.id, {
    code: `

      
        chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // message.searchText is the text that was captured in the popup    
  // Search/Highlight code goes here

  console.log("Message: ",JSON.stringify(message));
  console.log("sender: ",JSON.stringify(sender));
  //console.log("sendResponse: ",JSON.stringify(sendResponse));
  sendResponse({result:"done man"});
});

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

 document.addEventListener("build", function (e) {
						console.log(e.detail); // Prints "Example of an event"
             chrome.runtime.sendMessage(chrome.runtime.id,{call: e.detail}, function(response) {
  console.log(response.farewell);
  });
	});
 
        `});
};
//   chrome.tabs.query({}, function (tabs) {
//     for (var i = 0; i < tabs.length; ++i) {
// inject(tabs[i]);

//     }
//   });



// chrome.tabs.onCreated.addListener(function(tab) {
//   inject(tab);
// })

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(changeInfo);
  if (changeInfo.status == 'loading' && changeInfo.url);
  //  inject(tab);
})

