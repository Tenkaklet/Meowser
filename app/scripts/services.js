angular.module('app')
.factory('Jamendo', ['$http', 'JamendoUrl', function ($http, JamendoUrl) {
console.log(JamendoUrl);
  var Jamendo = {
    // Gets the search albums
    getAlbum: function (album) {
      var url = JamendoUrl + 'albums?client_id=ae41e8ed&limit=50&namesearch=' + album;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets the search artist
    getArtist: function (artist) {
      var url = 'https://api.jamendo.com/v3.0/artists/?client_id=ae41e8ed&name=' + artist;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets the search tracks
    getTracks: function (tracks) {
      var url = JamendoUrl + 'tracks?client_id=ae41e8ed&limit=50&namesearch=' + tracks;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets the search playlists
    getPlaylists: function (playlists) {
      var url = JamendoUrl + 'playlists?client_id=ae41e8ed&limit=50&namesearch=' + playlists;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets tracks related to ID
    listenById: function (type, id) {
      var url = JamendoUrl + type + '/tracks?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets tracks related to ID
    musicInfoById: function (type, id) {
      var url = JamendoUrl + type + '/musicinfo?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets tracks related to ID
    getReview: function (type, id) {
      var url = JamendoUrl + 'reviews/' + type +  '?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data;
      });
    },
    // Gets feeds for album & artists
    getFeed: function (type) {
      var url = JamendoUrl + 'feeds?client_id=ae41e8ed&type=' + type + '&limit=100';
      console.log(url);
      return $http.get(url)
      .then(function (res) {
        return res.data.results;
      });
    },
    // Gets albums related to Artist ID
    getAlbumsByArtistsID: function (id) {
      var url = JamendoUrl + 'artists/albums?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data.results;
      });
    },
    // Gets music info related to Artist ID
    getMusicInfoByArtistsID: function (id) {
      var url = JamendoUrl + 'artists/musicinfo?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data.results;
      });
    },
    // Gets music info related to Artist ID
    getLocationByArtistsID: function (id) {
      var url = JamendoUrl + 'artists/locations?client_id=ae41e8ed&id=' + id;
      return $http.get(url)
      .then(function (res) {
        return res.data.results;
      });
    }
  };
  return Jamendo;
}])

.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
  return $firebaseAuth();
}]);
