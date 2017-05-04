var app = angular.module('app', ['ngRoute', 'angularSoundManager', 'ngSanitize', 'ngRateIt', 'angularMoment', 'firebase'])
.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}])
.constant('JamendoUrl', 'https://api.jamendo.com/v3.0/')
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './scripts/home/home.html',
    controller: 'HomeCtrl'
  })
  .when('/search', {
    templateUrl: './scripts/search/search.html',
    controller: 'SearchCtrl'
  })

  .when('/result/:input', {
    templateUrl: './scripts/result/result.html',
    controller: 'ResultCtrl'
  })
  .when('/featured/artists', {
    templateUrl: './scripts/feed/artists.html',
    controller: 'FeedCtrl'
  })
  .when('/featured/albums', {
    templateUrl: './scripts/feed/albums.html',
    controller: 'FeedCtrl'
  })
  .when('/artist/:id', {
    templateUrl: './scripts/artist/artist.html',
    controller: 'ArtistCtrl'
  })
  .when('/listing/:type/:id', {
    templateUrl: './scripts/listing/listing.html',
    controller: 'ListingCtrl'
  })
  .when('/library', {
    templateUrl: './scripts/library/library.html',
    controller: 'LibraryCtrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $routeChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
});
