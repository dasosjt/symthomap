/**
 * Created by Pablo on 10/4/2016.
 */
angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, $http) {
    $scope.tagline = {};
    $http.get('/patient')
        .success(function(data) {
            $scope.names = data.patients;
            console.log(data.patients);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/dashboard/user')
        .success(function(data) {
            console.log(data.user);
            $scope.isAdmin = false;
            $scope.isEpidem = false;
            $scope.isMedic = falxse;
            if(data.user.user_type == 1){
                $scope.isEpidem = true;
            }
            if(data.user.user_type == 0){
                $scope.isMedic = true;
            }
            if(data.user.user_type == 2){
                $scope.isAdmin = true;
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.map = {center: {latitude: 14.6284, longitude: -90.5227 }, zoom: 4, bounds: {}};
    $scope.polygons = [
        {
            id: 1,

            path: [
                {
                    latitude: 14.0138,
                    longitude: -91.2867
                },
                {
                    latitude: 15.9621,
                    longitude: -91.2867
                },
                {
                    latitude: 15.5144,
                    longitude: -90.237297
                }
            ],
            stroke: {
                color: '#6060FB',
                weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: false,
            visible: true,
            fill: {
                color: '#ff0000',
                opacity: 0.8
            }
        }
    ];
});