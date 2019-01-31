myApp.controller('NewLobbyCtrl', function (
  $scope,
  $state,
  $window,
  $ionicPlatform,
  $ionicSideMenuDelegate,
  $ionicModal
) {

  //   $ionicPlatform.ready(function () {

  //     screen.orientation.lock("landscape");
  //     console.log('Orientation is ' + screen.orientation.type);
  //     if (window.cordova) {
  //       window.plugins.NativeAudio.stop('timer');
  //       window.plugins.NativeAudio.stop('coin');
  //       window.plugins.NativeAudio.stop('winner');
  //       window.plugins.NativeAudio.stop('shuffle');
  //       window.plugins.NativeAudio.stop('button');
  //     }
  //   })
  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  //end of ionic cordova
  $scope.toggleRightSideMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };


  $ionicModal.fromTemplateUrl('templates/modal/terms-and-condition.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.termsModal = modal;
  });
  $scope.termsAndCondition = function () {
    $scope.termsModal.show();
  };
  $scope.closeTermsModal = function () {
    $scope.termsModal.hide();
  };


  $ionicModal.fromTemplateUrl('templates/modal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.privacyModal = modal;
  });
  $scope.openPrivacyPolicyModal = function () {
    $scope.privacyModal.show();
  };
  $scope.closePrivacyPolicyModal = function () {
    $scope.privacyModal.hide();
  };

  $scope.logout = function () {
    $.jStorage.flush();
    $state.go("login");
  };

})
