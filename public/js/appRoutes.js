/*
 * This front end router will route different views.
 *
*/

// public/js/appRoutes.js
angular.module('appRoutes', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
              templateUrl : '/views/index.html',
              controller  : 'IndexController'
          }).when('/login', {
                templateUrl : '/views/login.html',
                controller  : 'LoginController'
            }).when('/home', {
                  templateUrl : '/views/home.html'
              }).
          otherwise({
            redirectTo: '/views/index.html',
            controller  : 'IndexController'
          });

        $locationProvider.html5Mode(true);
      }]);//config
