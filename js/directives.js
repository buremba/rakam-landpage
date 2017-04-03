
app.directive('markdownContent', function ($compile) {
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');

    return {
        scope: {content: '=markdownContent', parent: '=', afterLoaded: '='},
        controller: function ($scope, $element) {
            $scope.$watch('content', function (content) {
                content = content || "";

                var content = $compile(content)($scope.$parent);
                $element.append(content);

                [].forEach.call($element[0].querySelectorAll('a'), function (a) {
                    var href = a.getAttribute("href");
                    if(href.startsWith('#')) {
                        return a.setAttribute("href", document.location.pathname + href);
                    }

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

                $scope.afterLoaded($element);
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
.directive('dropMenu', function ($timeout) {
   return {
          restrict: 'A',
          link: function ($scope, element, attrs) {
              element.on('click', function () {
              });
              element.on('mouseenter', function () {
                  var dc = $(element).find(".drop-content")
                 
                  dc.css({'margin-left':-1*dc.width()/2+$(element).width()/2-5+'px'});

                  dc.fadeIn();
              });
              element.on('mouseleave', function () {
                  $(element).find(".drop-content").fadeOut();
              });
          }
      };
})