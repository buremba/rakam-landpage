'use strict';

angular.module('myApp.landpage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/assets/js/landpage/landpage.html',
            controller: 'LandPageCtrl'
        });
    }])

    .controller('LandPageCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.scroll = function () {
            document.getElementById('seeitinaction').scrollIntoView();
        }


        $scope.user = {};
        $scope.subscribe = function () {
            console.log($scope.user);
            $http.jsonp('//rakam.us13.list-manage.com/subscribe/post-json?u=5586cfd2d893a0c97269cd25f&amp;id=61c0197d80&c=JSON_CALLBACK&EMAIL=' + $scope.user.EMAIL)
                .then(function (data) {
                    console.log(data);
                    $scope.subscribed = data.data.msg;
                    $scope.subscribedType = data.data.result == 'success' ? 'success' : 'danger';
                }, function (data) {
                    $scope.subscribed = "An error occurred";
                    $scope.subscribedType = 'danger';
                });
        };
    }])

    .directive('imageTransition', [function () {
        return {
            controller: function ($scope, $element) {
                var speed = 250,
                    easing = mina.easeinout;

                var s = Snap($element[0].querySelector('svg')), path = s.select('path'),
                    pathConfig = {
                        from: path.attr('d'),
                        to: $element[0].getAttribute('data-path-hover')
                    };

                $element[0].addEventListener('mouseenter', function () {
                    path.animate({'path': pathConfig.to}, speed, easing);
                });

                $element[0].addEventListener('mouseleave', function () {
                    path.animate({'path': pathConfig.from}, speed, easing);
                });
            }
        }
    }]);
