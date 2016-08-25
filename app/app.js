/*
*	Click2Call Web Extension
*	Mohamed Habashy
*	mohamed.habshey10@gmail.com
*/


'use strict';

// Declare app level module which depends on views, and components
angular.module('UltaTelWE', [
  'ui.router',
  'ui.bootstrap',
  'UltaTelWE.controllers',
  'UltaTelWE.services',
  // 'UltaTelWE.version',
]).
  config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'template//login.html',
        controller: 'loginCtrl',
        resolve: {
          isLoggedIn: function ($storage, $state) {
            $storage.get(
              'utUser', function (user) {
                console.log(user);
                if(!!Object.keys(user).length)
                 $state.go('start');
              });
          }
        }
      })

      .state('start', {
        url: '/start',
        templateUrl: 'template/start.html',
        controller: 'startCtrl',
        resolve: {

        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
  }]);
