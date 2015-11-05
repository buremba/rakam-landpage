'use strict';

var sourceAddress = "//rawgit.com";

angular.module('myApp.documentation', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/doc/:page?', {
                templateUrl: '/assets/js/documentation/documentation.html',
                controller: 'DocumentationCtrl',
                reloadOnSearch: false,
                resolve : {
                    markdown: function($http, $route) {
                        var page = $route.current.params.page ?
                            sourceAddress+"/buremba/rakam-wiki/master/"+$route.current.params.page+".md" :
                            sourceAddress+"/buremba/rakam/master/README.md";
                        return $http.get(page, { cache: true}).then(function(e) {
                            return e.data
                        });
                    },
                    sidebar: function($http, $route) {
                        return $http.get(sourceAddress+"/buremba/rakam-wiki/master/_Sidebar.md", { cache: true}).then(function(e) {
                            return e.data
                        });
                    }
                }
            })
            .when('/doc-search', {
                templateUrl: '/assets/js/documentation/search.html',
                controller: 'DocumentationSearchCtrl',
                resolve : {
                    result: function($http, $route) {
                        return $http.get("//api.github.com/search/code?q="+encodeURI($route.current.params.query)+"+in%3afile+language%3amd+repo%3aburemba/rakam-wiki",
                            {headers: {"Accept": "application/vnd.github.v3.text-match+json"
                        }}).then(function(e) {
                            return e.data
                        });
                    },
                    sidebar: function($http, $route) {
                        return $http.get(sourceAddress+"/buremba/rakam-wiki/master/_Sidebar.md").then(function(e) {
                            return e.data
                        });
                    }
                }
            });
    }])

    .controller('DocumentationCtrl', function($http, $scope, $routeParams, $sce, sidebar, markdown, $q) {
        var converter = new showdown.Converter();
        $scope.page = $routeParams.page || "Home";
        $scope.promise = null;

        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));

        $scope.test = function() {
            $scope.promise = $q.defer().promise;
        }
    })

    .controller('DocumentationSearchCtrl', function($http, $scope, $sce, $routeParams, sidebar, result) {
        var converter = new showdown.Converter();
        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.result = result;
        $scope.query = $routeParams.query;
    })

    .directive('markdownContent', function ( $compile ) {
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');

        return {
            scope: { content: '=markdownContent' },
            controller: function ( $scope, $element ) {
                $scope.$watch('content', function(content) {
                    $element[0].innerHTML = content;
                    [].forEach.call($element[0].querySelectorAll('a'), function(a) {
                        var href = a.getAttribute("href");
                        if(!r.test(href)) {
                            a.setAttribute("href", "/doc/"+href);
                        }
                    });
                    [].forEach.call($element[0].querySelectorAll('img'), function(a) {
                        var href = a.getAttribute("src");
                        if(!r.test(href)) {
                            a.setAttribute("src", sourceAddress+"/buremba/rakam-wiki/master/"+href);
                        }
                    })
                })
            }
        };
    })

    .directive('highlightIndice', function () {
        return {
            scope: { match: '=highlightIndice' },
            controller: function ( $scope, $element ) {
                var html = "", cursor = 0;
                $scope.match.matches.forEach(function(match) {
                    html += $scope.match.fragment.substring(cursor, match.indices[0]);
                    html += "<i>" + match.text +"</i>";
                    cursor = match.indices[1]
                });
                html += $scope.match.fragment.substring(cursor);
                $element[0].innerHTML = html;
            }
        };
    })

    .directive('showMarkdownInPage', function($document){
        scope: { match: '=callback' }
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {
                elem.on('click', function(e) {
                    //e.preventDefault();
                    $scope.test();
                });
            }
        }
    })