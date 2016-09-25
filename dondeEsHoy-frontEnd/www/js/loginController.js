angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $window) {
    $scope.data = {};
 
    $scope.doLogin = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $window.location.href = '/dondeEsHoy-frontEnd/www/main.html#/app/map';
    }
})