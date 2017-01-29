app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {

  
}]).directive('dropMenu', function ($timeout) {
   return {
          restrict: 'A',
          link: function ($scope, element, attrs) {
              element.on('click', function () {
              });
              element.on('mouseenter', function () {
                  var dc = $(element).find(".drop-content")
                  console.log($(element).width()/2);
                  dc.css({'margin-left':-1*dc.width()/2+$(element).width()/2-5+'px'});

                  dc.fadeIn();
              });
              element.on('mouseleave', function () {
                  $(element).find(".drop-content").fadeOut();
              });
          }
      };
})