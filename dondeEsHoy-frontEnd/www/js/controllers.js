//var WazeLink = require("../plugins/cr.encke.WazeLink/www/WazeLink.js");
var lugarEspecifico;
var usuario;
angular.module('starter.controllers', [])

        .config(function ($ionicConfigProvider) {
            $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
            $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
        })
        .controller('AppCtrl', function ($scope, $state, $ionicHistory) {
            $scope.salir = function () {
                usuario = "";
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.login", {}, {reload: true});
            };
            $scope.irPerfil = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.profile", {}, {reload: true});
            };
            $scope.irMapa = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.map", {}, {reload: true});
            };
            $scope.irPromos = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.promos", {}, {reload: true});
            };
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
                        vector[i].promoEvent.due_date = "Indefinido";
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
        .controller('ProfileCtrl', function ($scope, $http, $ionicPopup, obtenerInfoPorEmail, $cordovaImagePicker) {
            $scope.data = {};
            $scope.collection = {
                selectedImage: ''
            };
            $scope.data.email; // = usuario;
            function convertImgToBase64(url, callback, outputFormat) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;
            }

            /*
             ** version2: convert local image
             */
            function encodeImageFileAsURL(cb) {
                return function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        cb(reader.result);
                    };
                    reader.readAsDataURL(file);
                };
            }
            ;
            function encodeImageFileAsURL() {

                var filesSelected = document.getElementById("inputFileToLoad").files;
                if (filesSelected.length > 0)
                {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result; // <--- data: base64

                        var newImage = document.createElement('img');
                        newImage.src = srcData;
                        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }

            function convertirABase64(direccion, callback) {
                convertImgToBase64(direccion, function (base64Img) {
                    $scope.collection.selectedImage = base64Img;
                    $scope.data.imageBase64 = base64Img;
                    callback();
                });
            }

            /*var decodedString = Base64.decode(encodedString);
             console.log(decodedString);*/
            obtenerInfoPorEmail.obtenerInfo($scope.data.email = usuario).then(function (data) {

                $scope.data.id = data.data.result.id;
                $scope.data.name = data.data.result.name;
                $scope.data.lastname = data.data.result.lastName;
                $scope.data.Opassword = data.data.result.password;
                $scope.data.imageBase64 = data.data.result.imagebase64;
                $scope.collection.selectedImage = data.data.result.imagebase64;
            });
            function refrescar() {
                $scope.data.email = usuario;
                obtenerInfoPorEmail.obtenerInfo($scope.data.email).then(function (data) {

                    $scope.data.id = data.data.result.id;
                    $scope.data.name = data.data.result.name;
                    $scope.data.lastname = data.data.result.lastName;
                    $scope.data.Opassword = data.data.result.password;
                    $scope.data.imageBase64 = data.data.result.imagebase64;
                    $scope.collection.selectedImage = data.data.result.imagebase64;
                });
            }

            function servicioActualizar() {
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
                        imagebase64: $scope.data.imageBase64

                    }

                });
                return p.success(function (data) {
                    console.log(data);
                    if (data.result !== false) {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Se ha actualizado tu contraseña de usuario',
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
            }
            ;
            function servicioActualizar2() {
                convertirABase64($scope.collection.selectedImage, function () {
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
                            imagebase64: $scope.data.imageBase64
                        }

                    });
                    return p.success(function (data) {
                        console.log(data);
                        if (data.result !== false) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Se ha actualizado tu imagen de usuario',
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
                });
            }
            ;
            $scope.actualizarUsuario = function () {
                if ($scope.collection.selectedImage !== $scope.data.imageBase64) {
                    servicioActualizar2();
                }
                if ($scope.data.Oldpassword !== undefined && $scope.data.Newpassword !== undefined && $scope.data.Newpassword2 !== undefined &&
                        $scope.data.Oldpassword !== "" && $scope.data.Newpassword !== "" && $scope.data.Newpassword2 !== "") {
                    if ($scope.data.Opassword === $scope.data.Oldpassword) {
                        if ($scope.data.Newpassword === $scope.data.Newpassword2) {

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

                }
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
                        $scope.collection.selectedImage = results[i]; // We loading only one image so we can use it like this

                        window.plugins.Base64.encodeFile($scope.collection.selectedImage, function (base64) {  // Encode URI to Base64 needed for contacts plugin
                            $scope.collection.selectedImage = base64;
                            $scope.addContact(); // Save contact

                        });
                    }
                }, function (error) {
                    console.log('Error: ' + JSON.stringify(error)); // In case of error
                });
            };
        })
        .controller('RegisterCtrl', function ($scope, $ionicHistory, $ionicSideMenuDelegate, $http, $state, $ionicPopup, $cordovaImagePicker) {
            $scope.data = {};
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.goBack = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.login', {}, {reload: true});
            };
            function convertImgToBase64(url, callback, outputFormat) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;
            }

            /*
             ** version2: convert local image
             */
            function encodeImageFileAsURL(cb) {
                return function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        cb(reader.result);
                    };
                    reader.readAsDataURL(file);
                };
            }
            ;
            function encodeImageFileAsURL() {

                var filesSelected = document.getElementById("inputFileToLoad").files;
                if (filesSelected.length > 0)
                {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result; // <--- data: base64

                        var newImage = document.createElement('img');
                        newImage.src = srcData;
                        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }

            function convertirABase64(direccion, callback) {
                convertImgToBase64(direccion, function (base64Img) {
                    $scope.data.imageBase64 = base64Img;
                    callback();
                });
            }



            $scope.register = function () {

                if ($scope.data.password === $scope.data.password2) {

                    convertirABase64($scope.collection.selectedImage, function () {
                        var p = $http({
                            method: 'POST',
                            url: "http://kefon94-001-site1.etempurl.com/Users/addUser",
                            //url: "http://localhost:49986/googlePlaces",
                            data: {
                                email: $scope.data.email,
                                name: $scope.data.name,
                                lastname: $scope.data.lastname,
                                password: $scope.data.password,
                                imageBase64: $scope.data.imageBase64
                            }

                        });
                        return p.success(function (data) {
                            console.log(data);
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
                    });
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Las contraseñas deben ser iguales',
                        template: 'Por favor verifique.'
                    });
                }
            };
            $scope.collection = {
                selectedImage: ''//img/Antik.jpg'
            };
            //convertirABase64($scope.collection.selectedImage);

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
                        $scope.collection.selectedImage = results[i]; // We loading only one image so we can use it like this

                        window.plugins.Base64.encodeFile($scope.collection.selectedImage, function (base64) {  // Encode URI to Base64 needed for contacts plugin
                            $scope.collection.selectedImage = base64;
                            $scope.addContact(); // Save contact

                        });
                    }

                }, function (error) {
                    console.log('Error: ' + JSON.stringify(error)); // In case of error
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
            /*$(document).on({
             'DOMNodeInserted': function () {
             $('.pac-item, .pac-item span', this).addClass('needsclick');
             }
             }, '.pac-container');*/

            var options = {timeout: 10000, enableHighAccuracy: true};
            var latLng;
            refrescar();
            var map = new google.maps.Map(document.getElementById('map'), {
                center: latLng, //{lat: -33.8688, lng: 151.2195},
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var dondeEstoy;
            var place = "";
            $scope.irAWaze = function () {

                if (place !== "") {
                    var lat = "" + place.geometry.location.lat();
                    var lng = "" + place.geometry.location.lng();
                    lat = lat.substr(0, lat.lastIndexOf(".") + 7);
                    lng = lng.substr(0, lng.lastIndexOf(".") + 7);
                    var latD = "" + dondeEstoy.position.lat();
                    var lngD = "" + dondeEstoy.position.lng();
                    latD = latD.substr(0, lat.lastIndexOf(".") + 7);
                    lngD = lngD.substr(0, lng.lastIndexOf(".") + 7);
                    //var url = 'http://waze/?ll=' + lat + ',' + lng+'&navigate=yes';  
                    //var url = 'http://waze.to/?ll=9.935474,-84.095561&navigate=yes'; //, '_system', 'location=yes' ;
                    //console.log(lat);
                    //console.log(lng);
                    var isIOS = ionic.Platform.isIOS();
                    //var isAndroid = ionic.Platform.isAndroid();
                    var url;
                    if (isIOS === true) {
                        url = "maps://?q=" + lat + "," + lng; //37.7749,-122.4194

                    } else {
                        url = "geo://" + latD + "," + lngD + "?q=" + lat + "," + lng; //37.7749,-122.4194"

                    }


                    window.location.href = url;
                    //$window.open(url, "_blank");
                    //WazeLink.open(url);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Escoge un destino.'
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
                dondeEstoy = marker;
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
                var temp = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
                var marker = new google.maps.Marker({
                    position: temp,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    title: 'Ir a destino',
                    animation: google.maps.Animation.BOUNCE
                });

                marker.addListener('click', function () {

                    $scope.irAWaze();
                });
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
                        dondeEstoy = marker;
                        var latD = "" + dondeEstoy.position.lat();
                        var lngD = "" + dondeEstoy.position.lng();
                        var infoWindow = new google.maps.InfoWindow({
                            content: "Esta es mi ubicacion"
                        });
                        googlePlacesService.obtenerLocales(position.coords.latitude, position.coords.longitude).then(function (data) {
                            resultados = data.data.result;
                            //var vecLat = new Array();
                            //var vecLng = new Array();
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
                                        content: ""//this.local.name
                                    });

                                    infowindow.setContent('<h4>' + this.local.name + '</h4>' +
                                            '<input type="button" onclick="viajar(' + this.local.geometry.location.lat + ',' + this.local.geometry.location.lng + ',' + latD + ',' + lngD + ');" value="Ir a destino"></input>');
                                    infowindow.open(this.map, this);

//                                
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
            $scope.disableTap = function () {
               var container = document.getElementsByClassName('pac-container');
                // disable ionic data tab
                angular.element(container).attr('data-tap-disabled', 'true');
                // leave input field if google-address-entry is selected
                angular.element(container).on("click", function () {
                    document.getElementById('pac-input').blur();
                });
            };

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
