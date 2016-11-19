/*
 * This front end router will route different views.
 *
*/

// public/js/appRoutes.js
angular.module('appRoutes', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/index', {
              templateUrl : 'views/index.html',
              controller  : 'IndexController'
          }).
          otherwise({
            redirectTo: 'views/login.html',
            controller  : 'LoginController'
          });

        //$locationProvider.html5Mode(true);
      }]);//config
