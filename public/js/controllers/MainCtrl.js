// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
  var patients = {};
  $http.get('/patient')
      .success(function(data) {
          patients = data;
          console.log(data);
          console.log("HIIIII");
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    $scope.tagline = patients.name;
});
