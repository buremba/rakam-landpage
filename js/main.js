app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.form = {
        email:"",
        name:"",
        phone:"",
        message:""
    }
    $scope.submitForm = function(){
        console.log($scope.form);
    }
}]);