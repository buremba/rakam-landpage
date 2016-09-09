'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.landpage',
    'myApp.documentation',
    'myApp.api',
    'myApp.deploy',
    'myApp.config',
    'myApp.library',
    'myApp.integration',
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
        .when('/pricing', {
            templateUrl: '/assets/js/pricing.html',
            controller: 'PricingCtrl'
        })
        .when('/privacy', {
            templateUrl: '/assets/js/privacy_policy.html',
            controller: 'PricingCtrl'
        })
        .when('/deploy', {
            templateUrl: '/assets/js/deploy/deploy.html',
            controller: 'DeployCtrl'
        })
        .when('/integrate', {
            templateUrl: '/assets/js/integration/integration.html',
            controller: 'IntegrationCtrl'
        })
        .when('/support', {
            templateUrl: '/assets/js/support.html',
            controller: 'SupportCtrl'
        })
        .when('/contact', {
            templateUrl: '/assets/js/contact.html',
            controller: 'ContactCtrl'
        })
        .when('/404', {
            templateUrl: '/assets/404.html'
        })
});

app.controller('PricingCtrl', ['$scope', function ($scope) {
    $scope.pricingType = 'PaaS';
}])
app.controller('SupportCtrl', [function () {
}]);
app.controller('ContactCtrl', [function () {
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