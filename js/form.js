app.controller('formController',  function($scope, $http, $sce, $stateParams, $state) {
     $scope.form = {
        email:"",
        name:"",
        phone:"",
        message:""
    }
   $scope.submitForm = function() {

       console.log("burada");
       console.log($scope.contactForm.$valid);
        $scope.isLoading = true;
        $scope.complete = false;
        $http.post("https://mp3ssd6ej8.execute-api.us-east-1.amazonaws.com/prod/rakam-landing-send-email", {
            email: $scope.form.email,
            phone: $scope.form.phone,
            subject: '[Rakam.io] Contact form message',
            message: {
                name: $scope.form.name,
                message: $scope.form.message
            }
        }).then(function() {
            $scope.isLoading = false;
            $('.form-success').fadeIn(400);
            $('.form-error').hide();
            $('.email-icon').animate({ marginTop: '200px' }, 400);
            $('.inputs').animate({ height: '0px' }, 400,function(){$(this).hide()});
            $scope.complete = true;
        }, function(e) {
            $('.form-error').fadeIn(400);
            $('.form-success').hide();
            $scope.isLoading = false;
        });
        
        

    }

    $scope.isLoading = false;

    
})