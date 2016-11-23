/*
 * This front end router will route different views.
 *
 * When you use ngroute, you are using a single page application that
 * does not reload a page.  It just replaces content.
*/

// public/js/appRoutes.js
angular.module('appRoutes', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/home', {
                        templateUrl : '/views/secure/home.html'
                      }).when('/test', {
                        templateUrl : '/views/secure/test.html'
                      }).otherwise({
                        redirectTo: '/views/secure/index.html',
                        controller  : 'IndexController'
                      });

        $locationProvider.html5Mode(true);
      }]);//config
