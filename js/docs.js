


app.controller('docsController', function ($http, $scope, $sce, sidebar, markdown, $q, parent) {

    var converter = new showdown.Converter({tables: true});
    window.converter = converter;
    $scope.promise = null;

    $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
    $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));
    $scope.parent = parent;

})


.controller('configController', function($http, $scope, modules, $document) {
        $scope.modules = modules;
        //console.log($routeParams.clazz, document.getElementById($routeParams.clazz))
})

.controller('deployController', function ($http, $scope, $location, $sce) {

        $scope.tabs = [{
            title: 'Docker',
            url: 'h3#docker'
        }, {
            title: 'Heroku',
            url: 'h3#heroku'
        }, {
            title: 'AWS (Cloudformation)',
            url: 'h3#awscloudformation'
        }, {
            title: 'Custom',
            url: 'h3#custom'
        }, {
            title: 'Managed',
            url: 'h3#managed'
        }];

        var converter = new showdown.Converter();
        var page = sourceAddress + "/rakam-io/rakam/master/README.md";
        $scope.promise = $http.get(page, {cache: true}).then(function (e) {
            var div = document.createElement('div');
            div.innerHTML = converter.makeHtml(e.data);
            return div;
        }, function (error) {
            $scope.error = error;
        });

        $scope.onClickTab = function (tab) {
            $scope.selected = tab;
            $scope.promise.then(function (dom) {
                var actualElement = dom.querySelector(tab.url);

                if (!actualElement) {
                    return null;
                }

                var element = actualElement.nextElementSibling;
                var html = "";
                while (true) {
                    if (element.tagName === 'H2' || element.tagName === 'H3') {
                        break;
                    } else {
                        html += element.outerHTML;
                    }

                    element = element.nextElementSibling;
                }

                $scope.content = $sce.trustAsHtml(html);
            });
        }

        var target = $location.search().target;
        var tab = $scope.tabs.filter(function(tab) {
            return tab.title == target;
        })[0] || $scope.tabs[0];

        $scope.onClickTab(tab);
    })




.directive('markdownContent', function () {
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');

        return {
            scope: {content: '=markdownContent', parent: '=parent'},
            controller: function ($scope, $element) {
                $scope.$watch('content', function (content) {
                    content = content || "";
                    $element[0].innerHTML = content;
                    [].forEach.call($element[0].querySelectorAll('a'), function (a) {
                        var href = a.getAttribute("href");

                        if (!r.test(href)) {
                            var path = a.pathname.replace(/.md$/, '') + a.search + a.hash;
                             a.setAttribute("href", "/document/" + $scope.parent + "/master/" + path);
         

                        } else if (href.match(/^\/\/github.com\/buremba/) || href.match(/^\/\/github.com\/rakam-io/)) {
                             a.setAttribute("href", "/document/" + href.replace(/^\/\/github.com\//, ""));
     
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