angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope) {

        })
        .controller('PromosCtrl',function($scope,$ionicLoading){
            $scope.today = function(){
                
          
            };
            
            
        })
        .controller('ProfileCtrl',function($scope,$ionicHistory,$state,obtenerInfoPorEmail){
            $scope.data = {};
            $scope.data.email = usuario;
            
            obtenerInfoPorEmail.obtenerInfo($scope.data.email).then(function(data){
                
               $scope.data.name = data.data.result.name;
               $scope.data.lastname = data.data.result.lastName;
               $scope.data.Opassword = data.data.result.password;
            });
            
        })
        .controller('RegisterCtrl',function($scope,$ionicHistory,$ionicSideMenuDelegate,$http,$state,$ionicPopup,$ionicPlatform,$cordovaImagePicker){
            $scope.data = {};
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.goBack = function(){
                 $ionicHistory.nextViewOptions({
                        disableBack: true
                        });
                $state.go('app.login', {}, {reload: true});
                
            };
            $scope.register = function(){
            if($scope.data.password === $scope.data.password2){
                
              var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/Users/addUser",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                        email: $scope.data.email,
                        name: $scope.data.name,
                        lastname: $scope.data.lastname,
                        password: $scope.data.password
                    }

                });
                return p.success(function (data) {
                    if(data.result !== false){
                        $ionicHistory.nextViewOptions({
                        disableBack: true
                        });
                    console.log("Realizado correctamente");
                    usuario = $scope.data.email;
                    $state.go('app.map', {}, {reload: true});}
                else{
                    var alertPopup = $ionicPopup.alert({
                            title: 'The user exists, please try with another email',
                            template: 'Please verify.'
                        });
                    
                }
                    
                }).error(function (e) {
                    console.log("Error al registrar");
                });  
                
            }else{
                var alertPopup = $ionicPopup.alert({
                            title: 'The passwords must be the same',
                            template: 'Please verify.'
                        });
                
            }};
        
        $scope.collection = {
        selectedImage : ''
        };
 
   
        $scope.getImageSaveContact = function() {
            alert("Entra!!");
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 80            // Higher is better
            };
 
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
 
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                        $scope.addContact();    // Save contact
                    });
                }
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error));    // In case of error
            });
        };  
 
     
       
        })
        .controller('LoginCtrl',function ($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $http, $ionicPopup) {
            $scope.data = {};
            $ionicSideMenuDelegate.canDragContent(false);
            
            $scope.goRegister = function(){
                 $ionicHistory.nextViewOptions({
                        disableBack: true
                        });
                $state.go('app.register', {}, {reload: true});
                
            };
            $scope.doLogin = function () {
                console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/Users/login",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                        email: $scope.data.username,
                        password: $scope.data.password
                    }

                });
                
                return p.success(function (data) {
                    if(data.result !== false){
                        $ionicHistory.nextViewOptions({
                        disableBack: true
                         });
                        console.log("Realizado correctamente");
                       usuario = $scope.data.username;
                    $state.go('app.map', {}, {reload: true});}else{
                    var alertPopup = $ionicPopup.alert({
                            title: 'Checkout your email or password',
                            template: 'Please verify.'
                        });
                    
                    }
                    
                }).error(function (e) {
                    
                });
                
                
            };
            
        })
        .controller('MapCtrl', function ($scope, $state ,$cordovaGeolocation, $ionicPopup, $ionicLoading, googlePlacesService) {
           
            var options = {timeout: 10000, enableHighAccuracy: true};

            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                var resultados = {};
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    });
                    var infoWindow = new google.maps.InfoWindow({
                        content: "Esta es mi ubicacion"
                    });
                    googlePlacesService.obtenerLocales(position.coords.latitude, position.coords.longitude).then(function (data) {
                        resultados = data.data.result;
                        for (var i = 0; i < resultados.length; i++) {
                            var lat = parseFloat(resultados[i].geometry.location.lat);
                            var lon = parseFloat(resultados[i].geometry.location.lng);


                            var coord = {lat: lat, lng: lon};
                            var m4 = new google.maps.Marker({
                                position: coord,
                                flat: true,
                                map: $scope.map
                            });

                            m4.local = resultados[i];
                            m4.map = $scope.map;
                            m4.addListener('click', function () {
                                var infowindow = new google.maps.InfoWindow({
                                    content: this.local.name
                                });
                                infowindow.open(this.map, this);
//                                var popup = $ionicPopup.alert({
//                                    //template: this.reporte.descripcion,
//                                    title: this.local.name,
//                                    scope: $scope
//
//                                });

                                $ionicLoading.hide();
                                $state.go($state.current, {}, {reload: true});
                            });

                            m4.setMap($scope.map);

                        }


                    }, function (err) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error al iniciar sesion!',
                            template: 'Por favor veirifica tu conexion.'
                        });

                    });
                    ;
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.open($scope.map, marker);
                    });

                });

            }, function (error) {
                console.log("Could not get location");
            });


        })


        .controller('ListaCtrl', function ($scope) {

            $scope.lista = [
                {title: 'Tribu', id: 1, descripcion: '', img: ''},
                {title: 'Belle', id: 2, descripcion: 'El club más exclusivo e innovador del país, dedicado a ofrecer la mejor experiencia del nightlife.La atención al cliente es totalmente personalizada con el fin de que la experiencia sea inolvidable y acogedora.', img: 'img/belle.jpg'},
                {title: 'Rumba', id: 3, descripcion: '', img: ''},
                {title: 'Antik', id: 4, descripcion: 'Para reservar una mesa en cualquiera de nuestras áreas, ingresar a www.antik.cr .\n Acepta reservas, No requiere reservas, Ideal para grupos, Servicio de mesero y Mesas en el exterior', img: 'img/antik.jpg'},
                {title: 'O Clock', id: 5, descripcion: '', img: ''},
                {title: 'Cowbell', id: 6, descripcion: '', img: ''},
                {title: 'Hooters', id: 7, descripcion: '', img: ''},
                {title: 'Chichis', id: 8, descripcion: '', img: ''},
                {title: 'Vertigo', id: 9, descripcion: 'Acepta reservas, No requiere reservas, Ideal para grupos y Servicio de mesero.\n vip@vertigocr.com ', img: 'img/vertigo.jpg'},
                {title: 'Ozzys', id: 10, descripcion: '', img: ''},
                {title: 'El Octavo', id: 11, descripcion: '', img: ''}
            ];
        })

        .controller('SpecificInfoCtrl', function ($scope, $stateParams, $http, $httpBackend) {

            $scope.lista = [
                {title: 'Tribu', id: 1, descripcion: '', img: ''},
                {title: 'Belle', id: 2, descripcion: 'El club más exclusivo e innovador del país, dedicado a ofrecer la mejor experiencia del nightlife.La atención al cliente es totalmente personalizada con el fin de que la experiencia sea inolvidable y acogedora.', img: 'img/belle.jpg'},
                {title: 'Rumba', id: 3, descripcion: '', img: ''},
                {title: 'Antik', id: 4, descripcion: 'Para reservar una mesa en cualquiera de nuestras áreas, ingresar a www.antik.cr .\n Acepta reservas, No requiere reservas, Ideal para grupos, Servicio de mesero y Mesas en el exterior', img: 'img/antik.jpg'},
                {title: 'O Clock', id: 5, descripcion: '', img: ''},
                {title: 'Cowbell', id: 6, descripcion: '', img: ''},
                {title: 'Hooters', id: 7, descripcion: '', img: ''},
                {title: 'Chichis', id: 8, descripcion: '', img: ''},
                {title: 'Vertigo', id: 9, descripcion: 'Acepta reservas, No requiere reservas, Ideal para grupos y Servicio de mesero.\n vip@vertigocr.com ', img: 'img/vertigo.jpg'},
                {title: 'Ozzys', id: 10, descripcion: '', img: ''},
                {title: 'El Octavo', id: 11, descripcion: '', img: ''}
            ];

            //$httpBackend.whenGET("http://miservicio").respond({minombre: "Cris"});
            $scope.specificInfo = $stateParams.specificInfo;
            $scope.specificImg;
            $scope.specificDescription;
            var length = $scope.lista.length;
            for (i = 0; i < length; i++) {
                if ($scope.specificInfo === $scope.lista[i].title) {
                    $scope.specificImg = $scope.lista[i].img;
                    $scope.specificDescription = $scope.lista[i].descripcion;
                    ;

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
