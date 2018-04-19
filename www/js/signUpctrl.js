myApp.controller("SignUpCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  $scope.signUpStatus = false;
  $scope.signUpError = false;
  $scope.signUp = function (data, signup) {
    console.log("sif");
    $scope.signUpPromise = Service.signUp(data, function (data) {
      console.log("sign up data", data);
      if (data.value) {
        $scope.signUpError = false;
        $scope.signUpStatus = data.data;
        $timeout(function () {
          $state.go(login);
        }, 1000)
        console.log("signup", $scope.signUpStatus);
      } else {
        $scope.signUpStatus = false;
        $scope.signUpError = true;
      }
    })
  }
})
