'use strict';

var sourceAddress = "//rawgit.com";


angular.module('myApp.integration', ['ngRoute'])

    .controller('IntegrationCtrl', function ($http, $scope, $location) {
        var converter = new showdown.Converter();
        var load = false;

        $scope.websiteIntegration = function() {
            if(!window.EmbedBox) {
                return load = true;
            }
            var page = sourceAddress + "/buremba/rakam-javascript/master/README.md";
            $scope.promise = $http.get(page, {cache: true}).then(function (e) {
                var div = document.createElement('div');
                div.innerHTML = converter.makeHtml(e.data);
                var data = div.querySelector('pre').textContent;

                new EmbedBox({
                    name: "Rakam web tracker",
                    theme: {
                        accentColor: "#00bff3",
                        backgroundColor: "#374355",
                        textColor: "#fff"
                    },
                    beforeContent: "Do you have a running Rakam cluster? If not, you can setup using <a href='/deploy' target='_blank'>our deployment guide</a>.",
                    templateVars: {
                        registerURL: "http://example.com/register"
                    },
                    afterContent: "You just installed Rakam web tracker. You can track your events and learn more about our web tracker in " +
                    "<a href='/doc/buremba/rakam-javascript/master/README' target='_blank'>our documentation</a>.",
                    embedCode: data
                })

            }, function (error) {
                $scope.error = error;
            });

        }

        var script = document.createElement('script');
        script.src = '//cdn.rawgit.com/EagerIO/EmbedBox/master/dist/embed-box.min.js';
        document.head.appendChild(script);
        script.onload = function () {
            if($location.search().part == 'website' || load) {
                $scope.websiteIntegration();
            }
        };


    })