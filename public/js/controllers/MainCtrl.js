// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
  $scope.patients = {};
  $http.get('/patient')
      .success(function(data) {
          $scope.patients = data;
          console.log(data);
          console.log("HIIIII");
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    $scope.tagline = data.name;
});
