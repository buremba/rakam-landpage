'use strict';

// var sourceAddress = "//raw.githubusercontent.com";
var sourceAddress = "//rawgit.com";

angular.module('myApp.documentation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/doc/:name/:repo/:page*', {
                templateUrl: '/assets/js/documentation/documentation.html',
                controller: 'DocumentationCtrl',
                reloadOnSearch: false,
                resolve: {
                    markdown: function ($http, $route, $location) {
                        var page = sourceAddress + "/" + ($route.current.params.name + "/" + ($route.current.params.repo || 'rakam-wiki')) +
                            "/" + $route.current.params.page + ".md";
                        return $http.get(page, {cache: true}).then(function (e) {
                            return e.data
                        }, function () {
                            return "Document not found :(";
                        });
                    },
                    sidebar: function ($http) {
                        return $http.get(sourceAddress + "/buremba/rakam-wiki/master/_Sidebar.md", {cache: true}).then(function (e) {
                            return e.data
                        });
                    },
                    parent: function ($route) {
                        return $route.current.params.name +  "/" + ($route.current.params.repo || 'rakam-wiki');
                    }
                }
            })
            .when('/doc/', {
                templateUrl: '/assets/js/documentation/documentation.html',
                controller: 'DocumentationCtrl',
                reloadOnSearch: false,
                resolve: {
                    markdown: function ($http, $route, $location) {
                        var page = sourceAddress + "/buremba/rakam/master/README.md";
                        return $http.get(page, {cache: true}).then(function (e) {
                            return e.data
                        }, function () {
                            $location.path('/404');
                        });
                    },
                    sidebar: function ($http) {
                        return $http.get(sourceAddress + "/buremba/rakam-wiki/master/_Sidebar.md", {cache: true}).then(function (e) {
                            return e.data
                        });
                    },
                    parent: function ($route) {
                        return "buremba/rakam-wiki";
                    }
                }
            })
            .when('/doc-search', {
                templateUrl: '/assets/js/documentation/search.html',
                controller: 'DocumentationSearchCtrl',
                resolve: {
                    result: function ($http, $route) {
                        return $http.get("//api.github.com/search/code?q=" + encodeURI($route.current.params.query) + "+in%3afile+language%3amd+repo%3aburemba/rakam-wiki",
                            {
                                headers: {
                                    "Accept": "application/vnd.github.v3.text-match+json"
                                }
                            }).then(function (e) {
                            return e.data
                        });
                    },
                    sidebar: function ($http) {
                        return $http.get(sourceAddress + "/buremba/rakam-wiki/master/_Sidebar.md").then(function (e) {
                            return e.data
                        });
                    }
                }
            });
    }])

    .controller('DocumentationCtrl', function ($http, $scope, $routeParams, $sce, sidebar, markdown, $q, parent) {
        var converter = new showdown.Converter({tables: true});
        window.converter = converter;
        $scope.page = $routeParams.page || "Home";
        $scope.promise = null;

        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));
        $scope.parent = parent;

        $scope.test = function () {
            $scope.promise = $q.defer().promise;
        }
    })

    .controller('DocumentationSearchCtrl', function ($http, $scope, $sce, $routeParams, sidebar, result) {
        var converter = new showdown.Converter();
        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.result = result;
        $scope.query = $routeParams.query;
    })

    .directive('markdownContent', function () {
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');

        return {
            scope: {content: '=markdownContent', parent: '=parent'},
            controller: function ($scope, $element) {
                $scope.$watch('content', function (content) {
                    $element[0].innerHTML = content;
                    [].forEach.call($element[0].querySelectorAll('a'), function (a) {
                        var href = a.getAttribute("href");

                        if (!r.test(href)) {
                            var path = a.pathname.replace(/.md$/, '') + a.search + a.hash;

                            a.setAttribute("href", "/doc/" + $scope.parent + "/master/" + path);
                        } else if (href.match(/^\/\/github.com\/buremba/) || href.match(/^\/\/github.com\/rakam-io/)) {
                            a.setAttribute("href", "/doc/" + href.replace(/^\/\/github.com\//, ""));
                        }
                    });
                    [].forEach.call($element[0].querySelectorAll('img'), function (a) {
                        var href = a.getAttribute("src");

                        if (!r.test(href)) {
                            a.setAttribute("src", sourceAddress + "/"+$scope.parent+"/master/" + href);
                        } else if (href.match(/^\/\/github.com\//)) {
                            a.setAttribute("src", href.replace(/^\/\/github.com\/buremba/, sourceAddress));
                        }
                    });
                    [].forEach.call($element[0].querySelectorAll('table'), function (a) {
                        a.classList.add('table');
                        a.classList.add('table-bordered');
                    });

                })
            }
        };
    })

    .directive('highlightIndice', function () {
        return {
            scope: {match: '=highlightIndice'},
            controller: function ($scope, $element) {
                var html = "", cursor = 0;
                $scope.match.matches.forEach(function (match) {
                    html += $scope.match.fragment.substring(cursor, match.indices[0]);
                    html += "<i>" + match.text + "</i>";
                    cursor = match.indices[1]
                });
                html += $scope.match.fragment.substring(cursor);
                $element[0].innerHTML = html;
            }
        };
    })

    .directive('showMarkdownInPage', function ($document) {
        scope: {
            match: '=callback'
        }
        return {
            restrict: 'A',
            link: function ($scope, elem, attr) {
                elem.on('click', function (e) {
                    //e.preventDefault();
                    $scope.test();
                });
            }
        }
    })

    .directive('markdownSidebar', function ($timeout) {
        return {
            link: function ($scope, elem) {
                $scope.$watch('sidebar', function (sidebar, o) {
                    $timeout(function () {
                        [].forEach.call(elem[0].querySelectorAll('li > a'), function (a) {
                            if (a.href.endsWith($scope.parent+"/"+$scope.page)) {
                                a.classList.add('active');
                                var previousSibling = a.parentNode.parentNode.previousSibling;
                                if (previousSibling) {
                                    previousSibling.previousSibling.classList.add('active');
                                }
                            }
                        });
                    });
                });
            }
        }
    })

    .directive('script', function ($window) {
        return {
            restrict: 'E',
            scope: false,
            link: function (scope, elem, attr) {
                if (attr.type === 'text/javascript-lazy') {
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    var src = elem.attr('src');
                    if (src !== undefined) {
                        s.src = src;
                    }
                    else {
                        var code = elem.text();
                        s.text = code;
                    }
                    document.head.appendChild(s);
                    elem.remove();

                    s.addEventListener('load', function (e) {
                        $window.docsearch({
                            apiKey: 'e65794b4b5457f5121ebed08daff7a15',
                            indexName: 'rakam',
                            inputSelector: '#search-doc'
                        });
                    });
                }
            }
        };
    });