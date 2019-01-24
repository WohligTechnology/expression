myApp.controller("ProfileCtrl", function ($scope, $ionicPlatform, $ionicHistory) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });
  $scope.showThis = 'Personal';
  $scope.goToTab = function (tab) {
    $scope.showThis = tab;
    console.log("Tab Name", tab);
  }

  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };
})
