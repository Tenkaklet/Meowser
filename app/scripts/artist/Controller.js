angular.module('app')
  .controller('ArtistCtrl', ['$scope', '$location', '$routeParams', 'Jamendo', 'Auth', '$firebaseArray', function($scope, $location, $routeParams, Jamendo, Auth, $firebaseArray) {
    console.log($routeParams);
    $scope.back = function () {
      history.back();
    };
    Auth.$onAuthStateChanged(function (user) {
      $scope.user = user;
      $scope.message = 'Add to library';
      var artistReference = firebase.database().ref().child('users/' + user.uid + '/library/artists');
      var library = $firebaseArray(artistReference);

      artistReference.orderByChild('id').equalTo($routeParams.id).on('value', function (snap) {
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

      $scope.addToLibrary = function (data, type) {
        console.log(data, type);
        library.$add({
          artist_name: data.name,
          id: data.id,
          image: data.image,
          added: true
        }).then(function (ref) {
          var id = ref.key;
          console.log('added album with id (key)' + id);
          library.$indexFor(id);
          var notify = new Notification('Success', {
            body: data.name + ' Added to My Library',
            silent: true,
            icon: data.image
          });
        });
        $scope.added = true;
        $scope.message = 'In Library';
      };

    });



      Jamendo.getLocationByArtistsID($routeParams.id)
      .then(function (res) {
        $scope.location = res[0];
        console.log('Location --> ', $scope.location);
        var shell = require('electron').shell;
        $scope.open = function (link) {
          console.log(link);
          shell.openExternal(link);
        };
      });
      Jamendo.getAlbumsByArtistsID($routeParams.id)
      .then(function (res) {
        $scope.albums = res[0].albums;
        console.log('Artist Album --> ' , $scope.albums);
        $scope.listen = function (id, type) {
          console.log(id);
          console.log(type);
          $location.path('/listing/' + type + '/' + id);
        };
      });

      Jamendo.getMusicInfoByArtistsID($routeParams.id)
      .then(function (res) {
        $scope.info = res[0];
        console.log('Info --> ', $scope.info);
        $scope.artistBio = res[0].musicinfo.description.en;
      });



  }]);
