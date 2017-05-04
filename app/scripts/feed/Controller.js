angular.module('app')
  .controller('FeedCtrl', ['$scope', 'Jamendo', '$location', function($scope, Jamendo, $location) {

    Jamendo.getFeed('album')
    .then(function (res) {
      console.log(res);
      $scope.albums = res;
      $scope.listen = function (id, type) {
        console.log(id);
        console.log(type);
        $location.path('/listing/' + type + '/' + id);
      };
    });

    Jamendo.getFeed('artist')
    .then(function (res) {
      console.log(res);
      $scope.artists = res;
      console.log('Artists --> ' , $scope.artists);
      $scope.discover = function (id, type) {
        console.log(id);
        console.log(type);
        $location.path('/artist/' + id);
      };
    });
  }]);
