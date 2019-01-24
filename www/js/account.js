myApp.controller("AccountCtrl", function ($scope, $ionicPlatform, $ionicHistory) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });
  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };
})
