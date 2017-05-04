angular.module('app')
  .controller('ListingCtrl', ['$scope', '$rootScope', '$routeParams', 'Jamendo', 'Auth', '$firebaseArray', '$firebaseObject', function($scope, $rootScope, $routeParams, Jamendo, Auth, $firebaseArray, $firebaseObject) {
    
    function addIt (data,type, user) {
      var ref = firebase.database().ref().child('users/' + user.uid + '/library/' + type);
      var addingToLibrary = $firebaseArray(ref);
      if (type === 'playlists') {
        addingToLibrary.$add({
          name: data.name,
          id: data.id,
          user_name: data.user_name
        }).then(function (ref) {
            var id = ref.key;
            console.log('added playlist with id (key)' + id);
            addingToLibrary.$indexFor(id);
            var notify = new Notification('Success', {
              body: data.name + ' Added to My Library',
              icon: 'assets/images/meowser_splash.png',
              silent: true
            });
          });
        $scope.added = true;
        $scope.message = 'In Library';
      } else if (type === 'albums') {
        addingToLibrary.$add({
          artist_name: data.artist_name,
          album_name: data.name,
          id: data.id,
          image: data.image,
          added: true
        }).then(function (ref) {
            var id = ref.key;
            console.log('added album with id (key)' + id);
            addingToLibrary.$indexFor(id);
            var notify = new Notification('Success', {
              body: data.name + ' Added to My Library',
              silent: true,
              icon: data.image
            });
          });
          $scope.added = true;
          $scope.message = 'In Library';
      }

    }



    Auth.$onAuthStateChanged(function (user) {
      $scope.loggedInUser = user;

      $scope.message = 'Add to Library';
      var albumReference = firebase.database().ref().child('users/' + user.uid + '/library/albums');

      var library = $firebaseArray(albumReference);
      albumReference.orderByChild('id').equalTo($routeParams.id).on('value', function (snap) {
        var artistObject = snap.val();
        console.log(artistObject);
        for (var check in artistObject) {
          if (artistObject.hasOwnProperty(check)) {
            if (artistObject[check].added === true) {
              $scope.added = true;
              $scope.message = 'In Library';
            } else {
              $scope.added = false;
              $scope.message = 'Add to Library';
            }
          }
        }
      });

      $scope.addToLibrary = function (data) {
        console.log(data, $routeParams.type);
        addIt(data, $routeParams.type, user);
      };
    });

    $scope.back = function () {
      history.back();
    };

    $rootScope.songs = [];
    Jamendo.listenById($routeParams.type, $routeParams.id)
    .then(function (input) {
      $scope.data = input.results[0];
      console.log('data ' ,$scope.data);

      $scope.discover = function (id, type) {
        console.log(id);
        console.log(type);
        $location.path('/artist/' + id);
      };
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
    Jamendo.getReview($routeParams.type, $routeParams.id)
    .then(function (data) {
      $scope.reviews = data.results[0];
      console.log('Reviews ' , $scope.reviews);
    });




  }]);
