angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG ) {
         $urlRouterProvider
              .otherwise('/');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '',
                  templateUrl: 'views/layout.html'
              })
              .state('app.main', {
                  url: '/',
                  templateUrl: 'views/main.html',
                  controller: 'mainController'

              })
              .state('app.product', {
                  abstract:true ,
                  url: '/product',
                  template: '<ui-view></ui-view>',
              })
              .state('app.product.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'views/product_dashboard.html'
              })

               .state('app.product.api', {
                  url: '/api',
                  templateUrl: 'views/product_api.html'
              })
               .state('app.product.ui', {
                  url: '/ui',
                  templateUrl: 'views/product_ui.html'
              })
               .state('app.product.prebuilt', {
                  url: '/prebuilt',
                  templateUrl: 'views/product_prebuilt.html'
              })

            


              .state('app.pricing', {
                  url: '/pricing',
                  templateUrl: 'views/pricing.html',
                  controller: 'pricingController'
              })

              .state('app.careers', {
                  url: '/careers',
                  templateUrl: 'views/careers.html'
              })
              .state('app.about', {
                  url: '/about',
                  templateUrl: 'views/about.html'
              })
              .state('app.contact', {
                  url: '/contact',
                  templateUrl: 'views/contact.html'
              })
              .state('app.privacy', {
                  url: '/privacy',
                  templateUrl: 'views/privacy.html'
              })

              .state('app.terms', {
                  url: '/terms',
                  templateUrl: 'views/terms.html'
              })

              .state('app.deploy', {
                  url: '/deploy',
                  templateUrl: 'views/deploy.html',
                  controller: 'deployController'
              })


              .state('app.config', {
                  url: '/config',
                  reloadOnSearch: false,
                  resolve: {
                       modules: function($http) {
                        return $http.get("https://gist.githubusercontent.com/buremba/0bade37ae72895fe0031/raw/rakam-registry.json").then(function(e) {
                            return e.data.modules;
                        });
                    }
                  },
                  templateUrl: 'views/config.html',
                  controller: 'configController',

              })

              .state('app.documents', {
                  url: '/docs',
                  reloadOnSearch: false,
                  resolve: {
                        markdown: function ($http, $location) {
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
                        parent: function () {
                            return "buremba/rakam-wiki";
                        }
                  },
                  templateUrl: 'views/documents.html',
                  controller: 'docsController',

              })
              .state('app.document', {
                  url: '/doc/:name/:repo/*page',
                  templateUrl: 'views/documents.html',
                  controller: 'docsController',
                  reloadOnSearch: false,
                  resolve: {
                    markdown: function ($http, $stateParams,$state, $location) {
                        
                        var page = sourceAddress + "/" + ($stateParams.name + "/" + ($stateParams.repo || 'rakam-wiki')) +
                            "/" + $stateParams.page + ".md";
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
                    parent: function ($stateParams) {
                        return $stateParams.name +  "/" + ($stateParams.repo || 'rakam-wiki');
                    }
                }
                
              })

            .state('app.doc-search', {
                url: '/doc-search?query',
                templateUrl: 'views/documents-search.html',
                controller: 'docsSearchController',
                resolve: {
                    result: function ($http, $stateParams,$state) {

                        return $http.get("//api.github.com/search/code?q=" + encodeURI($stateParams.query) + "+in%3afile+language%3amd+repo%3aburemba/rakam-wiki",
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
             })


              .state('app.integrate', {
                  url: '/integrate/:name/:repo/*page',
                  templateUrl: 'views/integrate.html',
                  controller: 'integrateController',
                  params: {
                      name: {value: "buremba", squash: true},
                      repo: {value: "rakam-javascript", squash: true},
                      page: {value: null, squash: true}
                  },
                  resolve: {
                    markdown: function ($http, $stateParams) {
                        var name = $stateParams.name;
                        var repo = $stateParams.repo;

                        if(name != 'buremba' && name != 'rakam') {
                            return "";
                        }

                        var page = sourceAddress + "/" + (name + "/" + (repo || 'rakam-wiki')) +
                            "/" + ($stateParams.page || 'master/README') + ".md";
                        return $http.get(page, {cache: true}).then(function (e) {
                            return e.data
                        }, function () {
                            return "Document not found :(";
                        });
                    }
                   }

              })

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    console.log(deferred);
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });

                        return $ocLazyLoad.inject(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );