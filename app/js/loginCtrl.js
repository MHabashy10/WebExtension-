'use strict';

angular.module('tpce.controllers', [])

  //.config(['$routeProvider', function($routeProvider) {
  //    $urlRouterProvider.state('login', {
  //     templateUrl: 'component/login/login.html',
  //     controller: 'loginCtrl'
  //   });
  // }])

  .controller('loginCtrl', ["$scope", "$state", "$UTuser", "$storage", function ($scope, $state, $UTuser, $storage) {
    $scope.count = 0;

    $scope.login = function (username, password) {

      //  console.log(username, password);


      $UTuser.login(username, password)
        .then(function (result) {
          if (!!~result.data.indexOf("Invalid")) {
            alert("Invalid Credentials Please Try Again!");
          }
          else {
            var userData = JSON.parse(result.data);
            $storage.set({
              'utUser': {
                'UserId': userData.UserId,
                'MyExtension': userData.MyExtension,
                'Name': userData.Name
              }
            });
            $state.go('start');
          }
        }).catch(function (err) {
        alert("Unexpected Error Please Try Again!");
        });
      // Save it using the Chrome extension storage API.

    }

    $scope.onCLick = function () {
      $scope.count++;
      chrome.browserAction.setBadgeText({
        text: $scope.count.toString()

      })
    }

  }]);