angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
   google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });    
  var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
 
});
 
  }, function(error){
    console.log("Could not get location");
  });
  

})


.controller('ListaCtrl', function($scope) {
    
  $scope.lista = [
    { title: 'Tribu', id: 1 },
    { title: 'Belle', id: 2 },
    { title: 'Rumba', id: 3 },
    { title: 'Antik', id: 4 },
    { title: 'O Clock', id: 5 },
    { title: 'Cowbell', id: 6 },
    { title: 'Hooters', id: 7 },
    { title: 'Chichis', id: 8 },
    { title: 'Vertigo', id: 9 },
    { title: 'Ozzys', id: 10 },
    { title: 'Cowbell', id: 11 }
  ];
})

.controller('SpecificInfoCtrl', function($scope, $stateParams, $http,$httpBackend) {
    
    //$httpBackend.whenGET("http://miservicio").respond({minombre: "Cris"});
    $scope.specificInfo = $stateParams.specificInfo;
//    $http.get("http://miservicio").then(function(data){
//        $scope.minombre = data;
//    }).error(function(error){
//        
//    }).finally(function(){
//        
//    });
    
     //$httpBackend.flush();
})
;
