angular.module('app')
  .controller('PlayerCtrl', ['$scope', '$rootScope', '$routeParams', 'Jamendo', function($scope, $rootScope, $routeParams, Jamendo) {

    $scope.back = function () {
      history.back();
    };

    $rootScope.songs = [];
    Jamendo.listenById($routeParams.type, $routeParams.id)
    .then(function (input) {
      
      $scope.albumArt = input.results[0].image;
      var firstTracks = input.results[0].tracks;

      firstTracks.forEach(function (item) {
        var track = {
          id: item.id,
          title: item.name,
          artist: item.artist_name,
          url: item.audio
        };
        $rootScope.songs.push(track);
      });
    });
    Jamendo.musicInfoById($routeParams.type, $routeParams.id)
    .then(function (data) {

      $scope.musicInfo = data.results[0];
      console.log($scope.musicInfo);
    });
  }]);
