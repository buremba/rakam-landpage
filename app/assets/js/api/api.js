'use strict';

angular.module('myApp.api', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/api', {
                templateUrl: '/assets/js/api/api.html',
                controller: 'APICtrl'
            })
        ;
    }])

    .controller('APICtrl', function($http, $scope, $location, $routeParams, $sce) {
       $scope.apiAddress = $routeParams.addr || "http://generator.swagger.io/api/swagger.json";
       $scope.apiAddressHolder = "http://generator.swagger.io/api/swagger.json";
       $scope.tags;

       $scope.locationChanged = function(hash) {
           var lochash    = hash.substr(1),
               mylocation = lochash.substr(lochash.indexOf('tags='))
                   .split('&')[0]
                   .split('=')[1];

           console.log(hash, mylocation);
       }

       $scope.getTrustedAddress = function() {
           return $sce.trustAsResourceUrl("/swagger-api-editor/#/?tags="+($scope.tags||"")+"&import="+encodeURI($scope.apiAddress));
       }

       $scope.showApi = function() {
           $scope.apiAddress = $scope.apiAddressHolder;
           $location.search('addr', $scope.apiAddress);
       }
    })

    .directive('fullWidthIframe', function () {

        // taken from http://stackoverflow.com/questions/2429045/iframe-src-change-event-detection
        var onElementHeightChange = function (body, html, callback){
            var lastHeight = body.clientHeight, newHeight;
            (function run(){
                newHeight = Math.max( body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
                if( lastHeight != newHeight )
                    callback(newHeight);
                lastHeight = newHeight;

                if( body.onElementHeightChangeTimer )
                    clearTimeout(body.onElementHeightChangeTimer);

                body.onElementHeightChangeTimer = setTimeout(run, 200);
            })();
        }

        return {
            scope: {
                location : '=location'
            },
            controller: function ( $scope, $element ) {
                $element[0].onload = function() {
                    var contentWindow = $element[0].contentWindow;
                    //$scope.location(contentWindow.location.hash);

                    var document = contentWindow.document;
                    var body = document.body,
                        html = document.documentElement;
                    body.style.margin = '0 auto';
                    body.style.width = '1000px';
                    body.style.height = 'auto';
                    html.style.height = 'auto';
                    body.style.overflow = 'hidden';

                    onElementHeightChange(body, html, function(newHeight){
                        $element[0].style.height = newHeight;
                    });

                    var element = document.createElement("style");
                    element.innerHTML = 'li.path > header { \
                                        display: none; \
                                        } \
                                        li.path { \
                                            margin: 0; \
                                        } \
                                        li.operation>header .focus-editor { \
                                            display: none !important; \
                                        } \
                                        .info .info-container { \
                                            padding-left:0; \
                                            margin-top:20px \
                                        } \
                                        .info h4, .info h4>span { \
                                            font-family: Source Sans Pro,Arial,sans-serif; \
                                        } \
                                        .info-header { \
                                            display:none; \
                                        } \
                                        li.operation { \
                                            margin: 0; \
                                        } \
                                        .section-content.definitions { \
                                            display:none; \
                                        } \
                                        header[ng-if="specs.definitions"] { \
                                            display: none; \
                                        }';
                    body.appendChild(element);
                }
            }
        };
    })