angular.module('app')
  .controller('SearchCtrl', ['$scope', '$location', function($scope, $location) {


    $scope.search = function (input) {
      console.log(input);
      $location.path('/result/' + input );
    };



  }]);
