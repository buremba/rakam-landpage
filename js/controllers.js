showdown.extension('header-anchors', function () {
    var ancTpl = '$1<a id="user-content-$3" class="anchor" href="#$3" aria-hidden="true">' +
        '<svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16">' +
        '<path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>' +
        '</svg></a> $4';

    return [{
        type: 'html',
        regex: /(<h([1-3]) id="([^"]+?)">)(.*<\/h\2>)/g,
        replace: ancTpl
    }];
});
var converter = new showdown.Converter({tables: true, extensions: ['header-anchors']});

app.controller('mainController', ['$scope', '$http', '$interval', '$state', function ($scope, $http, $interval, $state) {

    $scope.tabSelect = function (el) {
        // var w =$(".underline").parent().parent().parent().width();
        // $(".underline").width(w);
        var navOffset = $(".nav-tabs").find(".uib-tab").eq(el).offset();
        var lineOffset = $(".underline").offset();
        var currentMargin = $(".underline").margin();
        if (navOffset && lineOffset) {
            var diff = currentMargin.left + navOffset.left - lineOffset.left;
            $(".underline").animate({
                marginLeft: diff + 'px'
            }, 300);
        }
    }

    $scope.sendMessageIntercom = function () {
        Intercom('showNewMessage');
    }

    $scope.activeSlide = 0;
    $interval(function () {
        $scope.activeSlide = ($scope.activeSlide + 1) % 2;
    }, 4000);
}])

    .controller('docsController', function ($http, $state, $scope, $sce, sidebar, markdown, $q, parent) {
        $scope.promise = null;

        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));
        $scope.parent = parent;
        $scope.search = function (q) {

            $state.go('app.doc-search', {'query': q});
        }

    })

    .controller('formController', function ($scope, $http, $sce, $stateParams, $state) {
        $scope.form = {
            email: "",
            name: "",
            phone: "",
            message: ""
        }
        $scope.submitForm = function () {
            $scope.isLoading = true;
            $scope.complete = false;
            $http.post("https://mp3ssd6ej8.execute-api.us-east-1.amazonaws.com/prod/rakam-landing-send-email", {
                email: $scope.form.email,
                // phone: $scope.form.phone,
                subject: '[Rakam.io] Contact form message',
                message: {
                    name: $scope.form.name,
                    message: $scope.form.message,
                    email: $scope.form.email
                }
            }).then(function () {
                $scope.isLoading = false;
                $('.form-success').fadeIn(400);
                $('.form-error').hide();
                $('.email-icon').animate({marginTop: '200px'}, 400);
                $('.inputs').animate({height: '0px'}, 400, function () {$(this).hide()});
                $scope.complete = true;
            }, function (e) {
                $('.form-error').fadeIn(400);
                $('.form-success').hide();
                $scope.isLoading = false;
            });


        }

        $scope.isLoading = false;


    })

    .controller('docsSearchController', function ($http, $scope, $sce, $state, $stateParams, sidebar, result) {

        $scope.sidebar = $sce.trustAsHtml(converter.makeHtml(sidebar));
        $scope.result = result;
        $scope.query = $stateParams.query;
        $scope.search = function (q) {

            $state.go('app.doc-search', {'query': q});
        }
    })

    .controller('configController', function ($http, $scope, modules, $document) {
        $scope.modules = modules;

    })

    .controller('pricingController', function ($http, $scope) {

        $scope.pricingTabSelect = function (el) {

            var navOffset = $(".nav-tabs").find(".uib-tab").eq(el).offset();
            var lineOffset = $(".underline2").offset();
            var currentMargin = $(".underline2").margin();

            if (navOffset && lineOffset) {
                var diff = currentMargin.left + navOffset.left - lineOffset.left;

                $(".underline2").animate({
                    marginLeft: diff + 'px'
                }, 300);
            }

        }

    })

    .controller('demoController', ['$http', '$rootScope', '$scope', function ($http, $rootScope, $scope) {
        document.body.style.overflow = 'hidden';
        $rootScope.hiddenFooter = true;

        $scope.submitEmail = function(email) {
            if(window.Intercom) {
                window.Intercom('update', {email: email, visited_demo: true});
            }
            window.location = 'https://app.rakam.io/login?demo=187&email='+email
        }
    }])

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
                    }
                    else {
                        html += element.outerHTML;
                    }

                    element = element.nextElementSibling;
                }

                $scope.content = $sce.trustAsHtml(html);
            });
        }

        var target = $location.search().target;
        var tab = $scope.tabs.filter(function (tab) {
                return tab.title == target;
            })[0] || $scope.tabs[0];

        $scope.onClickTab(tab);
    })


    .controller('integrateController', function ($http, $scope, $sce, $stateParams, markdown, $q, $location) {
        $scope.content = $sce.trustAsHtml(converter.makeHtml(markdown));
        $scope.param = $stateParams.name + "/" + $stateParams.repo;

        var load;
        $scope.websiteIntegration = function () {
            if (!window.EmbedBox) {
                return load = true;
            }
            var page = sourceAddress + "/buremba/rakam-javascript/master/README.md";
            $scope.promise = $http.get(page, {cache: true}).then(function (e) {
                var div = document.createElement('div');
                div.innerHTML = converter.makeHtml(e.data);
                var data = div.querySelector('pre').textContent;
                $(".embedbox").empty();

                new EmbedBox({
                    name: "Rakam web tracker",
                    theme: {
                        accentColor: "#00bff3",
                        backgroundColor: "#5f6c7a",
                        textColor: "#fff"
                    },
                    beforeContent: "Do you have a running Rakam cluster? If not, you can setup using <a href='/deploy' target='_blank'>our deployment guide</a>.",
                    templateVars: {
                        registerURL: "http://app.rakam.io/register"
                    },
                    afterContent: "You just installed Rakam web tracker. You can track your events and learn more about our web tracker in " +
                    "<a href='/doc/buremba/rakam-javascript/master/README' target='_blank'>our documentation</a>.",
                    embedCode: data,
                    container: ".embedbox"
                })

            }, function (error) {
                $scope.error = error;
            });

        }

        var script = document.createElement('script');
        script.src = '//cdn.rawgit.com/EagerIO/EmbedBox/master/dist/embed-box.min.js';
        document.head.appendChild(script);
        script.onload = function () {
            if ($location.search().part == 'website' || load) {
                $scope.websiteIntegration();
            }
        };
    })


    .controller('menuController', function ($http, $scope) {

        function morphDropdown(element) {
            this.element = element;
            this.mainNavigation = this.element.find('.main-nav');
            this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
            this.dropdownList = this.element.find('.dropdown-list');
            this.dropdownWrappers = this.dropdownList.find('.dropdown');
            this.dropdownItems = this.dropdownList.find('.content');
            this.dropdownBg = this.dropdownList.find('.bg-layer');
            this.mq = this.checkMq();
            this.bindEvents();
        }

        morphDropdown.prototype.checkMq = function () {
            //check screen size
            var self = this;
            return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
        };

        morphDropdown.prototype.bindEvents = function () {
            var self = this;
            //hover over an item in the main navigation
            this.mainNavigationItems.mouseenter(function (event) {
                //hover over one of the nav items -> show dropdown
                self.showDropdown($(this));
            }).mouseleave(function () {
                setTimeout(function () {
                    //if not hovering over a nav item or a dropdown -> hide dropdown
                    if (self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0) {
                        self.hideDropdown();
                    }
                }, 50);
            });

            //hover over the dropdown
            this.dropdownList.mouseleave(function () {
                setTimeout(function () {
                    //if not hovering over a dropdown or a nav item -> hide dropdown
                    (self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
                }, 50);
            });

            //click on an item in the main navigation -> open a dropdown on a touch device
            this.mainNavigationItems.on('touchstart', function (event) {
                var selectedDropdown = self.dropdownList.find('#' + $(this).data('content'));
                if (!self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active')) {
                    event.preventDefault();
                    self.showDropdown($(this));
                }
            });

            //on small screens, open navigation clicking on the menu icon
            this.element.on('click', '.nav-trigger', function (event) {
                event.preventDefault();
                self.element.toggleClass('nav-open');
            });
        };

        morphDropdown.prototype.showDropdown = function (item) {
            this.mq = this.checkMq();
            if (this.mq == 'desktop') {
                var self = this;
                var selectedDropdown = this.dropdownList.find('#' + item.data('content')),
                    selectedDropdownHeight = selectedDropdown.innerHeight(),
                    selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
                    selectedDropdownLeft = item.offset().left + item.innerWidth() / 2 - selectedDropdownWidth / 2;


                //update dropdown position and size
                this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
                //add active class to the proper dropdown item
                this.element.find('.active').removeClass('active');
                selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
                item.addClass('active');
                //show the dropdown wrapper if not visible yet
                if (!this.element.hasClass('is-dropdown-visible')) {
                    setTimeout(function () {
                        self.element.addClass('is-dropdown-visible');
                    }, 10);
                }
            }
        };

        morphDropdown.prototype.updateDropdown = function (dropdownItem, height, width, left) {
            this.dropdownList.css({
                '-moz-transform': 'translateX(' + left + 'px)',
                '-webkit-transform': 'translateX(' + left + 'px)',
                '-ms-transform': 'translateX(' + left + 'px)',
                '-o-transform': 'translateX(' + left + 'px)',
                'transform': 'translateX(' + left + 'px)',
                'width': width + 'px',
                'height': height + 'px'
            });

            this.dropdownBg.css({
                '-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                '-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                '-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                '-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
            });
        };

        morphDropdown.prototype.hideDropdown = function () {
            this.mq = this.checkMq();
            if (this.mq == 'desktop') {
                this.element.removeClass('is-dropdown-visible').find('.active').removeClass('active').end().find('.move-left').removeClass('move-left').end().find('.move-right').removeClass('move-right');
            }
        };

        morphDropdown.prototype.resetDropdown = function () {
            this.mq = this.checkMq();
            if (this.mq == 'mobile') {
                this.dropdownList.removeAttr('style');
            }
        };

        var morphDropdowns = [];
        if ($('.cd-morph-dropdown').length > 0) {
            $('.cd-morph-dropdown').each(function () {
                //create a morphDropdown object for each .cd-morph-dropdown
                morphDropdowns.push(new morphDropdown($(this)));
            });

            var resizing = false;

            //on resize, reset dropdown style property
            updateDropdownPosition();
            $(window).on('resize', function () {
                if (!resizing) {
                    resizing = true;
                    (!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
                }
            });

            function updateDropdownPosition() {
                morphDropdowns.forEach(function (element) {
                    element.resetDropdown();
                });

                resizing = false;
            };
        }


    })

