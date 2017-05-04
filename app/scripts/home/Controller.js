angular.module('app')
  .controller('HomeCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
    Auth.$onAuthStateChanged(function (user) {
      console.log(user);
      $scope.loggedInUser = user;
    });

    console.log(Auth);

$scope.login = function (user) {
  console.log(user);
  var email = user.email;
  var password = user.password;
  Auth.$signInWithEmailAndPassword(email, password)
  .then(function (user) {
    console.log(user);
    console.info('successfully logged in');
    modal.style.display = 'none';
    $scope.user = {};
    $scope.loggedInUser = theUser;
  })
  .catch(function (err) {
    console.log(err);
  });
};




$scope.signUp = function (user) {
  console.log(user);
  Auth.$createUserWithEmailAndPassword(user.email, user.password)
  .then(function (newUser) {
    console.log(user);
    var ref = firebase.database().ref('users');
    var theUser = firebase.auth().currentUser;
    console.log(theUser);
    theUser.updateProfile({
      displayName: user.username
    });
    console.log('updated ', theUser);
    console.info('successfully made e-mail & username');
    modal.style.display = 'none';
    $scope.user = {};
    $scope.loggedInUser = theUser;
  });
};

// Get the modal
var modal = document.getElementById('modal');
$scope.showLoginModal = function () {
  $scope.signUpForm = false;
  $scope.signIn = true; 
  modal.style.display = 'block';  
};

$scope.showSignUpForm = function () {
  $scope.signIn = false;
  $scope.signUpForm = true;
};

$scope.close = function () {
  
  modal.style.display = 'none';
  $scope.user = {};
};


$scope.signOut = function () {
  Auth.$signOut();
  console.log('user logged out');
  $location.path('/search');
};



  }]);
