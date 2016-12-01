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
                      }).otherwise({
                        redirectTo: '/views/login.html',
                        controller  : 'LoginController'
                      });

        $locationProvider.html5Mode(true);
      }]);//config
