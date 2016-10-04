// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider


        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/dashboard', {
            templateUrl: 'views/epidem.html',
            controller: 'MainController'
        })

        .when('/login', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpController'
        });

    $locationProvider.html5Mode(true);

}]);
