'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/:clazz?', {
                templateUrl: '/assets/js/config/config.html',
                controller: 'ConfigCtrl',
                resolve : {
                    modules: function($http, $route) {
                        return $http.get("https://gist.githubusercontent.com/buremba/0bade37ae72895fe0031/raw/4129efa704c86dda9ee2d0940a1f9cd64f8dbf41/rakam-registry.json").then(function(e) {
                            return e.data.modules;
                        });
                    }
                }
            })
        ;
    }])

    .controller('ConfigCtrl', function($http, $scope, $routeParams, modules, $document) {
        $scope.modules = modules;
        //console.log($routeParams.clazz, document.getElementById($routeParams.clazz))
    })