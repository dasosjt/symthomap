/**
 * Created by Pablo on 10/4/2016.
 */
angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, $http) {
    $scope.tagline = {};
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWOoEU3mSAttNr4HYMEcgKGkrvZ05PZKo";
    /*NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });*/

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
            $scope.isMedic = false;
            if(data.user.user_type == 1){
                $scope.isEpidem = true;
            }
            if(data.user.user_type == 0){
                $scope.isMedic = true;
            }
            if(data.user.user_type == 2){
                $scope.isAdmin = true;
            }
            $scope.isAdmin = true;
            $scope.isEpidem = true;
            $scope.isMedic = true;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});
