'use strict';

var sourceAddress = "//rawgit.com";

angular.module('myApp.deploy', ['ngRoute'])

    .controller('DeployCtrl', function ($http, $scope, $sce, $document, $routeParams) {
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

        $scope.currentTab = $scope.onClickTab($scope.tabs[0]);
    })