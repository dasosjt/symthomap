// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider


        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })


        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

    $locationProvider.html5Mode(true);

}]);
