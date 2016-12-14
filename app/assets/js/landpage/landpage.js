'use strict';

angular.module('myApp.landpage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/assets/js/landpage/landpage.html',
            controller: 'LandPageCtrl'
        });
    }])

    .directive("mySrc", function () {
        return {
            link: function (scope, element, attrs) {
                var img, loadImage;
                img = null;

                var placeholder = document.createElement('div');
                placeholder.classList.add('placeholder');
                placeholder.style.background = 'rgba(0, 0, 0, .2)';
                placeholder.style.width = '100%';
                placeholder.style.height = '550px';
                placeholder.innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style="font-size: 5em;margin-left: 45%;margin-top: 45%;"></i>'

                element[0].parentNode.appendChild(placeholder);

                loadImage = function () {
                    placeholder.style.display = 'block';
                    element[0].style.display = 'none';

                    img = new Image();
                    img.src = attrs.mySrc;

                    img.onload = function () {
                        element[0].style.display = 'block';
                        placeholder.style.display = 'none';
                        element[0].src = attrs.mySrc;
                    };
                };

                scope.$watch((function () {
                    return attrs.mySrc;
                }), function (newVal, oldVal) {
                    loadImage();
                });
            }
        };
    })

    .controller('LandPageCtrl', ['$scope', '$interval', '$http', '$timeout', 'Lightbox', function ($scope, $interval, $http, $timeout, Lightbox) {
        $scope.Lightbox = Lightbox;

        $timeout(function() {
            ['dashboard', 'event-explorer', 'funnel', 'query-builder', 'report', 'retention', 'sql-editor'].forEach(function(name) {
                var img = new Image();
                img.src = '/assets/images/landpage/'+name+'.png';
            });
        }, 2000);

        $scope.scroll = function () {
            document.getElementById('seeitinaction').scrollIntoView();
        }

        $scope.trustedby = [
            {thumbnail: '/assets/images/trustedby/bionluk.png', title: 'Bionluk'},
            {thumbnail: '/assets/images/trustedby/us-polo-assn.png', title: 'US POLO'},
            {thumbnail: '/assets/images/trustedby/scorp.png', title: 'Scorp'}
        ];

        $scope.clickedRegister = function () {
            analytics.track('Click register');
        }


        $scope.active_text = 0;
        $interval(function() {
            $scope.active_text = ($scope.active_text + 1) % 6;
        }, 2000);

        $scope.user = {};
        $scope.subscribe = function () {
            analytics.identify($scope.user.EMAIL);
            analytics.track('Subscribed mail-list');

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
                var speed = 250;
                var easing = mina.easeinout;

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
