myApp.controller("ReferralCtrl", function(
  $scope,
  $state,
  $ionicHistory,
  $window
) {
  $scope.user = {};
  $scope.user.referralCode = "a52asc100";

  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $window.history.back();
  };
});
