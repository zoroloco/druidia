// public/js/appRoutes.js
angular.module('mobile-route-module', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/secure/mobile-home', {
                        templateUrl : '/views/secure/templates/mobile-home.html'
                      }).when('/secure/test', {
                        templateUrl : '/views/secure/templates/test.html'
                      }).otherwise({
                        redirectTo: '/views/mobile-login.html',
                        controller  : 'MobileLoginController'
                      });

        $locationProvider.html5Mode(true);
      }]);//config
