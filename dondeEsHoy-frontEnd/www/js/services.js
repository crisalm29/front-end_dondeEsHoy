angular.module('starter.services', [])

        .service('googlePlacesService', function ($http, $ionicLoading, $ionicPopup, $timeout) {
            var obtenerLocales = function (lat, long) {
                var p = $http({
                    method: 'POST',
                    url: "http://crisalm29-001-site1.dtempurl.com/googlePlaces",
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
        })
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