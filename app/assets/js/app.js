'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.landpage',
    'myApp.documentation',
    'myApp.api',
    'myApp.config',
    'myApp.library',
    'angular-loading-bar',
    'cgBusy',
    'duScroll'
]);

app.config(function ($routeProvider) {
    $routeProvider.otherwise('/404');
});

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/blog', {
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
        .when('/404', {
            templateUrl: '/assets/404.html'
        })
});

app.controller('BlogCtrl', [function () {
}]);
app.controller('PricingCtrl', [function () {
}])
app.controller('SupportCtrl', [function () {
}]);

app.run(function ($rootScope, $route, $document, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {

        if ($route.current.params.hash) {
            $timeout(function () {
                var someElement = document.getElementById($route.current.params.hash);
                $document.scrollToElement(someElement);
            }, 1);
        }
    });
})