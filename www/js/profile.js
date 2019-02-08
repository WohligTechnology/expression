myApp.controller("ProfileCtrl", function ($scope, $state, $ionicPlatform, $ionicHistory, Service) {
  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock('portrait');
    } else {}
  });
  $scope.showThis = 'Personal';
  $scope.goToTab = function (tab) {
    $scope.showThis = tab;
    console.log("Tab Name", tab);
  }

  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };

  /**Change Password Function */
  $scope.oldNewMatch = false;
  $scope.newConfirmMatch = false;
  $scope.oldPasswdError = false;

  $scope.matchPasswords = function (data) {
    if (data.oldPassword == data.password) {
      $scope.oldNewMatch = true;
    } else if (data.password != data.confirmPassword && !_.isEmpty(data.confirmPassword)) {
      $scope.newConfirmMatch = true;
    } else {
      $scope.oldNewMatch = false;
      $scope.newConfirmMatch = false;
    }
  }
  $scope.changePassword = function (passwordData) {
    var data = {};
    data = _.cloneDeep(passwordData);
    data.accessToken = $.jStorage.get("accessToken");
    console.log("changePassword", data);
    Service.changePassword(data, function (data) {
      if (data.value) {
        $state.go("profile")
      } else {
        if (data.error == 'Old Password do not match') {
          $scope.oldPasswdError = true;
        }
      }
    })
  }
})
