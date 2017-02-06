app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.tabSelect = function(el){
        // var w =$(".underline").parent().parent().parent().width();
        // $(".underline").width(w);
        var navOffset = $(".nav-tabs").find(".uib-tab").eq(el).offset();
        var lineOffset = $(".underline").offset();
        var currentMargin = $(".underline").margin();
        console.log(currentMargin);
        if( navOffset && lineOffset ){
            var diff = currentMargin.left+navOffset.left - lineOffset.left;
            console.log(diff);
             $(".underline").animate({
              marginLeft: diff+'px'
            }, 300);
        }
       

        // console.log($(".nav-tabs").find(".uib-tab").eq(el).offset());
        // console.log($(".underline").offset().left);
    }
  
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