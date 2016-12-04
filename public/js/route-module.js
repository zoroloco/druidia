/*
 * This front end router will route different views.
 *
 * When you use ngroute, you are using a single page application that
 * does not reload a page.  It just replaces content.
 *
 * Note: After first fetch, the next fetches are cached. Only hits server first time.
 *
*/

// public/js/appRoutes.js
angular.module('route-module', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/secure/home', {
                        templateUrl : '/views/secure/templates/home.html'
                      }).when('/secure/test', {
                        templateUrl : '/views/secure/templates/test.html'
                      }).when('/secure/mobile-home', {
                        templateUrl : '/views/secure/templates/home-mobile.html'
                      }).when('/secure/mobile-test', {
                        templateUrl : '/views/secure/templates/test.html'
                      }).otherwise({
                        redirectTo: '/'
                      });

        $locationProvider.html5Mode(true);
      }]);//config
