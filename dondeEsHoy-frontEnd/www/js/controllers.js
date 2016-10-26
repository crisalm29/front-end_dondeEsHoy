var lugarEspecifico;

angular.module('starter.controllers', [])
        .config(function ($ionicConfigProvider) {
            $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
            $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
        })
        .controller('AppCtrl', function ($scope) {

        })
        .controller('InfoPlaceCtrl', function ($scope, promosByEstablishment) {
            $scope.info = lugarEspecifico;
            $scope.promos;
            function corregirFechasNull(vector) {
                for (var i = 0; i < vector.length; i++) {
                    if (vector[i].due_date === null) {
                        vector[i].due_date = "Ahora";
                    }

                }
            }
            promosByEstablishment.promosByEstablishment($scope.info.establishmentID).then(function (data) {
                $scope.promos = data.data.result;
                corregirFechasNull($scope.promos);
                console.log($scope.promos);
            });
        })
        .controller('PromosCtrl', function ($scope, $http, $state, promosEventsToday, promosEventsThisWeek, promosEventsThisMonth) {
            $scope.today;
            $scope.week;
            $scope.month;
            $scope.info = {
                name: '',
                telefono: "",
                imagebase64: "",
                establishmentID: ""
            };
            function corregirFechasNull(vector) {
                for (var i = 0; i < vector.length; i++) {
                    if (vector[i].promoEvent.due_date === null) {
                        vector[i].promoEvent.due_date = "Ahora";
                    }

                }
            }
            promosEventsToday.promosToday().then(function (data) {

                $scope.today = data.data.result;
                corregirFechasNull($scope.today);
                console.log($scope.today);
            });
            promosEventsThisWeek.promosWeek().then(function (data) {

                $scope.week = data.data.result;
                corregirFechasNull($scope.week);
                console.log($scope.week);
            });
            promosEventsThisMonth.promosMonth().then(function (data) {

                $scope.month = data.data.result;
                corregirFechasNull($scope.month);
                console.log($scope.month);
            });
            $scope.infoEspecifica = function (id) {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/Establishments/infoById",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                        id: id
                    }

                });

                return p.success(function (data) {
                    if (data.result !== false) {

                        $scope.info.name = data.result.name;
                        $scope.info.telefono = data.result.telefono;
                        $scope.info.imagebase64 = data.result.imagebase64;
                        $scope.info.establishmentID = id;

                        lugarEspecifico = $scope.info;
                        $state.go('app.infoPlace', {}, {reload: true});
                    } else {


                    }

                }).error(function (e) {

                });
            };
        })
        .controller('ProfileCtrl', function ($scope,$http ,$ionicPopup, obtenerInfoPorEmail, $cordovaImagePicker) {
            $scope.data = {};
            $scope.data.email = usuario;
            var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
            
            var decodedString;
            function decodificarBase64(encode){
                decodedString= Base64.decode(encode);
                $scope.data.imageBase64 = decodedString;
            };
            
            var encodedString;
            function codificarBase64(src){
                encodedString= Base64.encode(src);
            };
                      
            /*var decodedString = Base64.decode(encodedString);
            console.log(decodedString);*/
            obtenerInfoPorEmail.obtenerInfo($scope.data.email).then(function (data) {

                $scope.data.id = data.data.result.id;
                $scope.data.name = data.data.result.name;
                $scope.data.lastname = data.data.result.lastName;
                $scope.data.Opassword = data.data.result.password;
                decodificarBase64(data.data.result.imagebase64);
            });
            
            function refrescar(){
                obtenerInfoPorEmail.obtenerInfo($scope.data.email).then(function (data) {

                $scope.data.id = data.data.result.id;
                $scope.data.name = data.data.result.name;
                $scope.data.lastname = data.data.result.lastName;
                $scope.data.Opassword = data.data.result.password;
                decodificarBase64(data.data.result.imagebase64);
            });
                
            }
            
            function servicioActualizar(){
                codificarBase64($scope.data.imageBase64);
                var p = $http({
                        method: 'POST',
                        url: "http://kefon94-001-site1.etempurl.com/Users/modifyUser",
                        //url: "http://localhost:49986/googlePlaces",
                        data: {
                            id: $scope.data.id,
                            email: $scope.data.email,
                            name: $scope.data.name,
                            lastname: $scope.data.lastname,
                            password: $scope.data.Newpassword,
                            imageBase64:encodedString
                        }

                    });
                    return p.success(function (data) {
                    console.log(data);
                        if (data.result !== false) {
                            
                            var alertPopup = $ionicPopup.alert({
                                title: 'Se ha actualizado tu cuenta de usuario',
                                template: ''
                            });
                            refrescar();
                           
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Por favor verifique.'
                            });

                        }
                
                    });
        };
            function servicioActualizar2(){
                codificarBase64($scope.data.imageBase64);
                var p = $http({
                        method: 'POST',
                        url: "http://kefon94-001-site1.etempurl.com/Users/modifyUser",
                        //url: "http://localhost:49986/googlePlaces",
                        data: {
                            id: $scope.data.id,
                            email: $scope.data.email,
                            name: $scope.data.name,
                            lastname: $scope.data.lastname,
                            password: $scope.data.Opassword,
                            imageBase64:encodedString
                        }

                    });
                    return p.success(function (data) {
                    console.log(data);
                        if (data.result !== false) {
                            
                            var alertPopup = $ionicPopup.alert({
                                title: 'Se ha actualizado tu cuenta de usuario',
                                template: ''
                            });
                            refrescar();
                           
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Por favor verifique.'
                            });

                        }
                
                    });
        };
            $scope.actualizarUsuario = function () {
                if ($scope.data.Opassword === $scope.data.Oldpassword) {
                    if ($scope.data.Newpassword === $scope.data.Newpassword2) {
                        if($scope.collection.selectedImage !== ""){
                            $scope.data.imageBase64 = $scope.collection.selectedImage;                            
                        }
                        servicioActualizar();
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Confirma tu nueva contraseña',
                            template: 'Por favor verifique.'
                        });

                    }

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Escribe tu contraseña actual.',
                        template: 'Por favor verifique.'
                    });

                }

            };

            $scope.collection = {
                selectedImage: ''
            };


            $scope.getImageSaveContact = function () {
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

                        window.plugins.Base64.encodeFile($scope.collection.selectedImage, function (base64) {  // Encode URI to Base64 needed for contacts plugin
                            $scope.collection.selectedImage = base64;
                            $scope.addContact();    // Save contact
                            
                        });
                    }
                }, function (error) {
                    console.log('Error: ' + JSON.stringify(error));    // In case of error
                }).then($scope.data.imageBase64 = $scope.collection.selectedImage).then(servicioActualizar2());
            };

        })
        .controller('RegisterCtrl', function ($scope, $ionicHistory, $ionicSideMenuDelegate, $http, $state, $ionicPopup, $ionicPlatform, $cordovaImagePicker) {
            $scope.data = {};
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.goBack = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.login', {}, {reload: true});

            };
            
            var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
            var encodedString;
            function codificarBase64(src){
                encodedString= Base64.encode(src);
                $scope.data.imageBase64 = encodedString;
            };
                      
            /*var decodedString = Base64.decode(encodedString);
            console.log(decodedString);*/
            
            $scope.register = function () {
                if ($scope.data.password === $scope.data.password2) {
                    codificarBase64($scope.collection.selectedImage);
                    var p = $http({
                        method: 'POST',
                        url: "http://kefon94-001-site1.etempurl.com/Users/addUser",
                        //url: "http://localhost:49986/googlePlaces",
                        data: {
                            email: $scope.data.email,
                            name: $scope.data.name,
                            lastname: $scope.data.lastname,
                            password: $scope.data.password,
                            imageBase64:$scope.data.imageBase64
                        }

                    });
                    return p.success(function (data) {
                        if (data.result !== false) {
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            console.log("Realizado correctamente");
                            usuario = $scope.data.email;
                            $state.go('app.map', {}, {reload: true});
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'El usuario ya existe, intente con otro email',
                                template: 'Por favor verifique.'
                            });

                        }

                    }).error(function (e) {
                        console.log("Error al registrar");
                    });

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Las contraseñas deben ser iguales',
                        template: 'Por favor verifique.'
                    });

                }
            };

            $scope.collection = {
                selectedImage: ''
            };


            $scope.getImageSaveContact = function () {
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

                        window.plugins.Base64.encodeFile($scope.collection.selectedImage, function (base64) {  // Encode URI to Base64 needed for contacts plugin
                            $scope.collection.selectedImage = base64;
                            $scope.addContact();    // Save contact
                            
                        });
                    }

                }, function (error) {
                    console.log('Error: ' + JSON.stringify(error));    // In case of error
                });


            };



        })
        .controller('LoginCtrl', function ($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $http, $ionicPopup) {
            $scope.data = {};
            
            
            $ionicSideMenuDelegate.canDragContent(false);

            $scope.goRegister = function () {
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
                    if (data.result !== false) {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        console.log("Realizado correctamente");
                        usuario = $scope.data.username;
                        $state.go('app.map', {}, {reload: true});
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'El usuario y la contraseña no coinciden',
                            template: 'Por favor verifique.'
                        });

                    }

                }).error(function (e) {

                });


            };

        })
        .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicPopup, $ionicLoading, googlePlacesService) {

            var options = {timeout: 10000, enableHighAccuracy: true};
            var latLng;
            refrescar();

            var map = new google.maps.Map(document.getElementById('map'), {
                center: latLng, //{lat: -33.8688, lng: 151.2195},
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });


            var place = "";
            $scope.irAWaze = function () {

                if (place !== "") {
                    var lat = "" + place.geometry.location.lat();
                    var lng = "" + place.geometry.location.lng();
                    lat = lat.substr(0, lat.lastIndexOf(".") + 7);
                    lng = lng.substr(0, lng.lastIndexOf(".") + 7);
                    var url = 'http://waze.to//?ll=' + lat + ',' + lng + '&navigate=yes';
                    console.log(lat);
                    console.log(lng);
                    /*var isIOS = ionic.Platform.isIOS();
                     //var isAndroid = ionic.Platform.isAndroid();
                     
                     if(isIOS === true){
                     
                     
                     }else{
                     
                     
                     }*/
                    window.location.assign(url);

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Escoge un lugar, para ir con Waze.'
                    });

                }

            };
            $scope.search = function () {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: latLng, //{lat: -33.8688, lng: 151.2195},
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                var infoWindow = new google.maps.InfoWindow({
                    content: "Esta es mi ubicacion"
                });

                if (input.value === "") {
                    refrescar();
                    place = null;
                }
            };
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var optionTypes = {
                //bounds: latLng,
                componentRestrictions: {country: "cr"},
                types: ['establishment']
            };
            var searchBox = new google.maps.places.Autocomplete(input, optionTypes);

            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            //alert(google.maps.ControlPosition.TOP_LEFT);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {

                searchBox.setBounds(map.getBounds());

            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('place_changed', function () {
                //searchBox.addListener('place_changed', function () {
                place = searchBox.getPlace();

                //var places = searchBox.getPlace();

                if (place.length === 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {

                    marker.setMap(null);

                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();

//                    places.forEach(function (place) {
//                        
                console.log(place);
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location,
                    zoom: 13

                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.

                    bounds.union(place.geometry.viewport);
                } else {

                    bounds.extend(place.geometry.location);
                }
                map.fitBounds(bounds);
//                    });


            });

            $scope.limpiar = function () {
                input.value = "";
                map = new google.maps.Map(document.getElementById('map'), {
                    center: latLng, //{lat: -33.8688, lng: 151.2195},
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                var infoWindow = new google.maps.InfoWindow({
                    content: "Esta es mi ubicacion"
                });

                refrescar();
            };

            function refrescar() {
                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    var resultados = {};
                    latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
                            position: latLng,
                            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

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
                                title: 'Error al conectar!',
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

            }

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
