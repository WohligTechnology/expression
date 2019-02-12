myApp.controller("AccountCtrl", function(
  $scope,
  $ionicPlatform,
  $ionicHistory,
  $window
) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });
  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $window.history.back();
  };
});
