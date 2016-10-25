angular.module('starter.services', [])
    .service('promosByEstablishment', function ($http, $ionicLoading, $timeout) {
            var promosByEstablishment = function (id) {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/PromosEvents/promosEventsThisMothByEstablishment",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                       establishment: id 
                    }

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    console.log("Success");
                    return data;
                }).error(function (e) {
                    console.log("Error");
                    $ionicLoading.hide();

                });

            };
            return {
                promosByEstablishment: promosByEstablishment
            };
        })
        .service('promosEventsToday', function ($http, $ionicLoading, $timeout) {
            var promosToday = function () {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/PromosEvents/promosEventsToday"
                    //url: "http://localhost:49986/googlePlaces",
                    

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    console.log("Success");
                    return data;
                }).error(function (e) {
                    console.log("Error");
                    $ionicLoading.hide();

                });

            };
            return {
                promosToday: promosToday
            };
        })
        .service('promosEventsThisWeek', function ($http, $ionicLoading, $timeout) {
            var promosWeek = function () {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/PromosEvents/promosEventsThisWeek"
                    //url: "http://localhost:49986/googlePlaces",
                    

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    console.log("Success");
                    return data;
                }).error(function (e) {
                    console.log("Error");
                    $ionicLoading.hide();

                });

            };
            return {
                promosWeek: promosWeek
            };
        })
        .service('promosEventsThisMonth', function ($http, $ionicLoading, $timeout) {
            var promosMonth = function () {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/PromosEvents/promosEventsThisMoth"
                    //url: "http://localhost:49986/googlePlaces",
                    

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    console.log("Success");
                    return data;
                }).error(function (e) {
                    console.log("Error");
                    $ionicLoading.hide();

                });

            };
            return {
                promosMonth: promosMonth
            };
        })
        .service('obtenerInfoPorEmail', function ($http, $ionicLoading, $timeout) {
            var obtenerInfo = function (usuario) {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/Users/infoByEmail",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                        email: usuario
                    }

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    return data;
                }).error(function (e) {
                    $ionicLoading.hide();

                });

            };
            return {
                obtenerInfo: obtenerInfo
            };
        })
        .service('googlePlacesService', function ($http, $ionicLoading, $ionicPopup, $timeout) {
            var obtenerLocales = function (lat, long) {
                var p = $http({
                    method: 'POST',
                    url: "http://kefon94-001-site1.etempurl.com/googlePlaces",
                    //url: "http://localhost:49986/googlePlaces",
                    data: {
                        lat: lat,
                        lng: long
                    }

                });
                return p.success(function (data) {
                    $ionicLoading.hide();
                    return data;
                }).error(function (e) {
                    $ionicLoading.hide();

                });
            };


            return {
                obtenerLocales: obtenerLocales
            };
        });
//        .service('userServices', function ($http, $ionicLoading, $ionicPopup, $timeout) {
//            
//            var obtenerLocales = function (lat, long) {
//                var p = $http({
//                    method: 'POST',
//                    url: "http://localhost:49986/googlePlaces",
//                    data: {
//                        lat: lat,
//                        lng: long
//                    }
//
//                });
//                return p.success(function (data) {
//                    $ionicLoading.hide();
//                    return data;
//                }).error(function (e) {
//                    $ionicLoading.hide();
//
//                });
//            };
//
//
//            return {
//                obtenerLocales: obtenerLocales
//            };
//        })
//        