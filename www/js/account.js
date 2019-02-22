myApp.controller("AccountCtrl", function(
  $scope,
  $ionicPlatform,
  $ionicHistory,
  $window,
  Service
) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });
  $ionicPlatform.ready(function() {
    screen.orientation.lock("portrait");
  });
  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $window.history.back();
  };

  Service.getProfile(function(data) {
    console.log("fdfdfdg", data);
    $scope.playerData = data.data.data;
    $scope.playerDataId = data.data.data._id;
    $scope._id = $.jStorage.set("_id", $scope.playerDataId);
  });
});
