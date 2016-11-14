// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
  $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWOoEU3mSAttNr4HYMEcgKGkrvZ05PZKo";
  $http.get('/patient')
      .success(function(data) {
          $scope.names = data.patients;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
});
