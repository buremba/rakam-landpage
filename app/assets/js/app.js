'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.landpage',
    'bootstrapLightbox',
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
    $locationProvider.hashPrefix('!');
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
app.controller('ContactCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.sendMessage = function(email, name, message) {
        $http.post("https://mp3ssd6ej8.execute-api.us-east-1.amazonaws.com/prod/rakam-landing-send-email", {
            email: email,
            subject: '[Rakam.io] Contact form message',
            message: {
                name: name,
                message: message
            }
        }).then(function() {
           alert('We received your message and get back soon, thanks!');
        }, function(e) {
            alert('An error occurred, please send message to emre@rakam.io: '+e);
        });
    }
}]);

app.run(function ($rootScope, $route, $document, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {

        $rootScope.loadedTemplate = $route.current.loadedTemplateUrl;

        if ($route.current.params.hash) {
            $timeout(function () {
                var someElement = document.getElementById($route.current.params.hash);
                $document.scrollToElement(someElement);
            }, 1);
        }
    });
})