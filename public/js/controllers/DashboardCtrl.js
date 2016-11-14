/**
 * Created by Pablo on 10/4/2016.
 */
angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, $http) {
    $scope.tagline = {};
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

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

angular.module('DashboardCtrl', []).directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});
