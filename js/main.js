app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.form = {
        email:"",
        name:"",
        phone:"",
        message:""
    }
   $scope.submitForm = function(email, name, message) {
        $http.post("https://mp3ssd6ej8.execute-api.us-east-1.amazonaws.com/prod/rakam-landing-send-email", {
            email: email,
            subject: '[Rakam.io] Contact form message',
            message: {
                name: name,
                message: message
            }
        }).then(function() {
           alert('We received your message and get back soon, thanks!');
        }, function(e) {
            alert('An error occurred, please send message to emre@rakam.io: '+e);
        });
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