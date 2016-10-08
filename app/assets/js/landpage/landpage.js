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

                loadImage = function () {

                    element[0].src = 'data:image/png;base64,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';
                    element[0].style.opacity = '.4';

                    img = new Image();
                    img.src = attrs.mySrc;

                    img.onload = function () {
                        element[0].style.opacity = '1';
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

    .controller('LandPageCtrl', ['$scope', '$http', 'Lightbox', function ($scope, $http, Lightbox) {
        $scope.Lightbox = Lightbox;

        $scope.scroll = function () {
            document.getElementById('seeitinaction').scrollIntoView();
        }

        $scope.firstimages = [
            {
                thumbnail: '/assets/images/query-builder.png',
                url: '/assets/images/query-builder-full.png',
                title: 'Interactive Query Builder',
                caption: 'Analyze event data without writing SQL queries, just use the interactive interface.'
            },
            {
                thumbnail: '/assets/images/sql-editor.png',
                url: '/assets/images/sql-editor-full.png',
                title: 'SQL Editor',
                caption: 'Write SQL queries, format result-set and generate charts.'
            },
            {
                thumbnail: '/assets/images/dashboard.png',
                url: '/assets/images/dashboard-full.png',
                title: 'Dashboard',
                caption: 'Create dashboards from your saved reports.'
            },
        ];

        $scope.images = [
            {
                thumbnail: '/assets/images/event-explorer.png',
                url: '/assets/images/event-explorer-full.png',
                title: 'Event explorer',
                caption: 'Analyze event data without writing SQL queries, just use the interactive interface.'
            },
            {
                thumbnail: '/assets/images/funnel.png',
                url: '/assets/images/funnel-full.png',
                title: 'Funnel',
                caption: 'Create funnels from user actions'
            },
            {
                thumbnail: '/assets/images/retention.png',
                url: '/assets/images/retention-full.png',
                title: 'Retention',
                caption: 'Generate retention tables and cohorts from user event data'
            },
        ];

        $scope.trustedby = [
            {thumbnail: '/assets/images/trustedby/bionluk.png', title: 'Bionluk'},
            {thumbnail: '/assets/images/trustedby/us-polo-assn.png', title: 'US POLO'},
            {thumbnail: '/assets/images/trustedby/scorp.png', title: 'Scorp'}
        ];

        $scope.clickedDemo = function () {
            analytics.track('Clicked demo');
        }


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
