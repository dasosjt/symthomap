// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
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
