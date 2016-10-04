/**
 * Created by Pablo on 10/4/2016.
 */
angular.module('DashCtrl', []).controller('DashboardController', function($scope, $http) {
    $scope.tagline = {};
    $http.get('/patient')
        .success(function(data) {
            $scope.names = data.patients;
            console.log(data.patients);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});