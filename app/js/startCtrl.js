'use strict';

angular.module('tpce.controllers')


  .controller('startCtrl', ["$scope", "$state", "$storage", function ($scope, $state, $storage) {

    $scope.logout = function () {
      $storage.remove('tpUser', function (res) {
        console.log(res);
        $state.go('login');
      });
    }

    $storage.get('tpUser', function (params) {
      $scope.UserName = params.tpUser.Name;
      $scope.MyExtension = params.tpUser.MyExtension;
    })
    $scope.searchText = function (search) {
      // var search = document.getElementById('searchText').value;
      /*if(search){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
          chrome.tabs.executeScript(tabs[0].id,{code:`
    
          
            chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
      // message.searchText is the text that was captured in the popup    
      // Search/Highlight code goes here
    
      console.log("Message: ",JSON.stringify(message));
      console.log("sender: ",JSON.stringify(sender));
      console.log("sendResponse: ",JSON.stringify(sendResponse));
      sendResponse({result:"done man"});
    });
    
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
    
    
     
            `});
          chrome.tabs.sendMessage(tabs[0].id,{method:'search',searchText:search}, function(response) {
          console.log(response.result);
    });
        });
      }*/
    }

    // chrome.runtime.onMessage.addListener(
    //   function(request, sender, sendResponse) {
    //     console.log(sender.tab ?
    //                 "from a content script:" + sender.tab.url :
    //                 "from the extension");


    //     if (request.greeting == "hello")
    //       sendResponse({farewell: "goodbye"});

    //         if (request.call )
    //       sendResponse({farewell: "Calling: "+request.call  });

    //   });


  }]);

