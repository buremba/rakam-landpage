app.controller('docsController', ['$scope', '$http','$sce','$stateParams','$state', function($scope, $http, $sce, $stateParams, $state) {
    
    console.log($stateParams);
    console.log($state.params);
    $scope.converter = new showdown.Converter({tables: true});
    $http.get(sourceAddress + "/buremba/rakam-wiki/master/_Sidebar.md", {cache: false})
    .then(function (e) {
        $scope.sidebar = $sce.trustAsHtml($scope.converter.makeHtml(e.data));
    });

    var page = sourceAddress + "/" + ($state.params.name + "/" + ($state.params.repo || 'rakam-wiki')) +
                            "/" + $state.params.page + ".md";
    return $http.get(page, {cache: true}).then(function (e) {
        $scope.content = $sce.trustAsHtml($scope.converter.makeHtml(e.data));
    }, function () {
        return "Document not found :(";
    });
  
    
}])

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

                            a.setAttribute("href", "#!/documents/" + $scope.parent + "/master/" + path);
                        } else if (href.match(/^\/\/github.com\/buremba/) || href.match(/^\/\/github.com\/rakam-io/)) {
                            a.setAttribute("href", "#!/documents/" + href.replace(/^\/\/github.com\//, ""));
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