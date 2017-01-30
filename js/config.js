var app =
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$locationProvider',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide,$locationProvider) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
      
        $locationProvider.html5Mode(true);        
    }
  ])
  .constant('JQ_CONFIG', {
      }
  )
  .constant('MODULE_CONFIG', [])

  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug:  false,
        events: true,
        modules: MODULE_CONFIG
    });
  }])
var sourceAddress = "//rawgit.com";