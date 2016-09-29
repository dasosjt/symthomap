// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
  $scope.tagline = {};
  $http.get('/patient')
      .success(function(data) {
          $scope.tagline = data.name;
          console.log(data)
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
});
