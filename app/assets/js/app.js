'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.landpage',
  'myApp.documentation',
  'myApp.api',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/blog', {
        templateUrl: '/assets/js/blog.html',
        controller: 'BlogCtrl'
    })
    .when('/pricing', {
        templateUrl: '/assets/js/pricing.html',
        controller: 'PricingCtrl'
    })
    .when('/support', {
        templateUrl: '/assets/js/support.html',
        controller: 'SupportCtrl'
    })
})

.controller('BlogCtrl', [function() {
}])
.controller('PricingCtrl', [function() {
}])
.controller('SupportCtrl', [function() {
}])
