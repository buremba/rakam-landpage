'use strict';

angular.module('myApp.library', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/library', {
            templateUrl: '/assets/js/library/library.html',
            controller: 'LibraryCtrl'
        });
    }])

    .controller('LibraryCtrl', [function() {

    }]);