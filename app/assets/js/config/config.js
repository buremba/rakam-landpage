'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config', {
                templateUrl: '/assets/js/config/config.html',
                controller: 'ConfigCtrl'
            })
        ;
    }])

    .controller('ConfigCtrl', function($http, $scope, $location, $routeParams, $sce) {
        $scope.apiAddress = $routeParams.addr || "http://generator.swagger.io/api/swagger.json";
    })