angular.module('app')
.controller('LibraryCtrl', ['$scope', '$location', 'Auth', '$firebaseArray', function($scope, $location, Auth, $firebaseArray) {

  Auth.$onAuthStateChanged(function (user) {

    var albumRef = firebase.database().ref().child('users/' + user.uid + '/library/albums');
    $scope.albums = $firebaseArray(albumRef);
    console.log('the albums are--> ' , $scope.albums);
    $scope.goToListing = function (id, type) {
      console.log(id);
      console.log(type);
      $location.path('/listing/' + type + '/' + id);
    };

    $scope.removeAlbum = function (album) {
      
      $scope.albums.$remove(album)
      .then(function () {
        console.log('removed album');
      });
    };




    var artistRef = firebase.database().ref().child('users/' + user.uid + '/library/artists');
    $scope.artists = $firebaseArray(artistRef);
    console.log('the artists are--> ' , $scope.artists);
    $scope.goTo = function (id) {
      $location.path('/artist/' + id);
    };

    $scope.remove = function (artist) {
      $scope.artists.$remove(artist)
      .then(function () {
        console.log('removed artist');
      });
    };




  });






}]);
