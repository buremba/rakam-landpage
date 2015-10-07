'use strict';

angular.module('myApp.documentation', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/doc/:page?', {
                templateUrl: '/assets/js/documentation/documentation.html',
                controller: 'DocumentationCtrl',
                resolve : {
                    markdown: function($http, $route) {
                        var page = $route.current.params.page = $route.current.params.page || 'Home';
                        return $http.get("https://raw.githubusercontent.com/buremba/rakam-wiki/master/"+page+".md").then(function(e) {
                            return e.data
                        });
                    },
                    sidebar: function($http, $route) {
                        return $http.get("https://raw.githubusercontent.com/buremba/rakam-wiki/master/_Sidebar.md").then(function(e) {
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
                        return $http.get("https://api.github.com/search/code?q="+encodeURI($route.current.params.query)+"+in%3afile+language%3amd+repo%3aburemba/rakam-wiki",
                            {headers: {"Accept": "application/vnd.github.v3.text-match+json"
                        }}).then(function(e) {
                            return e.data
                        });
                    },
                    sidebar: function($http, $route) {
                        return $http.get("https://raw.githubusercontent.com/buremba/rakam-wiki/master/_Sidebar.md").then(function(e) {
                            return e.data
                        });
                    }
                }
            })
            ;
    }])

    .controller('DocumentationCtrl', ["$http", "$scope", "$routeParams", "$sce", "sidebar", "markdown", function($http, $scope, $routeParams, $sce, sidebar, markdown) {
        var converter = new showdown.Converter();
        $scope.page = $routeParams.page;

        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));
    }])

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
                            a.setAttribute("src", "https://raw.githubusercontent.com/buremba/rakam-wiki/master/"+href);
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