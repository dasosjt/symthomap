/**
 * Created by Pablo on 10/4/2016.
 */
angular.module('DashboardCtrl', ['ngMap']).controller('DashboardController', function($scope, $http, NgMap) {
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
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        var vm = this;
        NgMap.getMap().then(function(map) {
            vm.showCustomMarker= function(evt) {
                map.customMarkers.foo.setVisible(true);
                map.customMarkers.foo.setPosition(this.getPosition());
            };
            vm.closeCustomMarker= function(evt) {
                this.style.display = 'none';
            };
        });
});
