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
    { title: 'Tribu', id: 1, descripcion:'',img:'' },
    { title: 'Belle', id: 2, descripcion:'El club más exclusivo e innovador del país, dedicado a ofrecer la mejor experiencia del nightlife.La atención al cliente es totalmente personalizada con el fin de que la experiencia sea inolvidable y acogedora.',img:'img/belle.jpg' },
    { title: 'Rumba', id: 3, descripcion:'',img:'' },
    { title: 'Antik', id: 4, descripcion:'Para reservar una mesa en cualquiera de nuestras áreas, ingresar a www.antik.cr .\n Acepta reservas, No requiere reservas, Ideal para grupos, Servicio de mesero y Mesas en el exterior',img:'img/antik.jpg' },
    { title: 'O Clock', id: 5, descripcion:'',img:'' },
    { title: 'Cowbell', id: 6, descripcion:'',img:'' },
    { title: 'Hooters', id: 7, descripcion:'',img:'' },
    { title: 'Chichis', id: 8, descripcion:'',img:'' },
    { title: 'Vertigo', id: 9, descripcion:'Acepta reservas, No requiere reservas, Ideal para grupos y Servicio de mesero.\n vip@vertigocr.com ',img:'img/vertigo.jpg' },
    { title: 'Ozzys', id: 10, descripcion:'',img:'' },
    { title: 'El Octavo', id: 11, descripcion:'',img:''}
  ];
})

.controller('SpecificInfoCtrl', function($scope, $stateParams, $http,$httpBackend) {
    
    $scope.lista = [
    { title: 'Tribu', id: 1, descripcion:'',img:'' },
    { title: 'Belle', id: 2, descripcion:'El club más exclusivo e innovador del país, dedicado a ofrecer la mejor experiencia del nightlife.La atención al cliente es totalmente personalizada con el fin de que la experiencia sea inolvidable y acogedora.',img:'img/belle.jpg' },
    { title: 'Rumba', id: 3, descripcion:'',img:'' },
    { title: 'Antik', id: 4, descripcion:'Para reservar una mesa en cualquiera de nuestras áreas, ingresar a www.antik.cr .\n Acepta reservas, No requiere reservas, Ideal para grupos, Servicio de mesero y Mesas en el exterior',img:'img/antik.jpg' },
    { title: 'O Clock', id: 5, descripcion:'',img:'' },
    { title: 'Cowbell', id: 6, descripcion:'',img:'' },
    { title: 'Hooters', id: 7, descripcion:'',img:'' },
    { title: 'Chichis', id: 8, descripcion:'',img:'' },
    { title: 'Vertigo', id: 9, descripcion:'Acepta reservas, No requiere reservas, Ideal para grupos y Servicio de mesero.\n vip@vertigocr.com ',img:'img/vertigo.jpg' },
    { title: 'Ozzys', id: 10, descripcion:'',img:'' },
    { title: 'El Octavo', id: 11, descripcion:'',img:''}
  ];
  
    //$httpBackend.whenGET("http://miservicio").respond({minombre: "Cris"});
    $scope.specificInfo = $stateParams.specificInfo;
    $scope.specificImg;
    $scope.specificDescription;
    var length = $scope.lista.length;
    for(i=0;i<length;i++){
        if($scope.specificInfo === $scope.lista[i].title){
            $scope.specificImg = $scope.lista[i].img;
            $scope.specificDescription = $scope.lista[i].descripcion;;
            
        }
        
    }
  
//   $http.get("http://miservicio").then(function(data){
//        $scope.minombre = data;
//    }).error(function(error){
//        
//    }).finally(function(){
//        
//    });
    
     //$httpBackend.flush();
})
;
