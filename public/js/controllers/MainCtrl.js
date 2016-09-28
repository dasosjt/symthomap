// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
  $http.get('/patient')
      .success(function(data) {
          $scope.tagline = data;
          console.log(data)
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });

});
