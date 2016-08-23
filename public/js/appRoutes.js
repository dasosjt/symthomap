// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider


        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'PhoneListController'
        })


        .when('/login', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        });

    $locationProvider.html5Mode(true);

}]);
