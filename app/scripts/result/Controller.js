angular.module('app')
  .controller('ResultCtrl', ['$scope', '$location', '$routeParams', 'Jamendo', function($scope, $location, $routeParams, Jamendo) {
    console.log($routeParams);
    $scope.back = function () {
      history.back();
    };
    $scope.search = $routeParams.input;
    Jamendo.getAlbum($routeParams.input)
    .then(function (res) {
      console.log('Albums ', res);
      $scope.albums = res.results;
      console.log($scope.albums);
    });
    Jamendo.getArtist($routeParams.input)
    .then(function (res) {
      $scope.artists = res.results;
      console.log($scope.artists);
    });
    Jamendo.getPlaylists($routeParams.input)
    .then(function (res) {
      console.log('Playlists ', res);
      $scope.playlists = res.results;
    });

    $scope.listen = function (id, type) {
      console.log(id);
      console.log(type);
      $location.path('/listing/' + type + '/' + id);
    };

    $scope.discover = function (id) {
      $location.path('/artist/' + id);
    };


  }]);
