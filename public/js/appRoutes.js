// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })


    $locationProvider.html5Mode(true);

}]);
