'use strict';

angular.module('myApp.landpage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/assets/js/landpage/landpage.html',
    controller: 'LandPageCtrl'
  });
}])

.controller('LandPageCtrl', [function() {
}]);