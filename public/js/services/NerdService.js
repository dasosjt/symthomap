// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {

        //llamada al metodo GET  de PHP por medio de angular
        get : function() {
            return $http.get('/api/nerds');
        },



        //llamada al metodo POST de PHP por medio de angular
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },



        //llamada al metodo DELETE  de PHP por medio de angular
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }

}]);
