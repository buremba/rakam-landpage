'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/:clazz?', {
                templateUrl: '/assets/js/config/config.html',
                controller: 'ConfigCtrl',
                resolve : {
                    modules: function($http, $route) {
                        return $http.get("http://127.0.0.1:9999/admin/modules").then(function(e) {
                            return e.data;
                        });
                    }
                }
            })
        ;
    }])

    .controller('ConfigCtrl', function($http, $scope, $routeParams, modules, $document) {
        $scope.modules = modules;
        console.log(11);
        //console.log($routeParams.clazz, document.getElementById($routeParams.clazz))


    })