app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.onProductSelect = function(index){
        console.log(index);
    }
}]);