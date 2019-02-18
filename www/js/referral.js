myApp.controller("ReferralCtrl", function(
  $scope,
  $state,
  $ionicHistory,
  $window,
  Service
) {
  $scope.user = {};
  $scope.user.referralCode = "a52asc100";

  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $window.history.back();
  };
  Service.getEarningPoint(function(data) {
    console.log("fdfdfdg", data);
    $scope.earningData = data.data.data[0];
    console.log("fdfdfdg", $scope.earningData);
  });

  Service.getProfile(function(data) {
    console.log("fdfdfdg", data);
    $scope.playerData = data.data.data;
    $scope.playerDataId = data.data.data._id;
    $scope._id = $.jStorage.set("_id", $scope.playerDataId);
  });
});
