myApp.controller("NewLobbyCtrl", function(
  $scope,
  $state,
  $window,
  $ionicPlatform,
  $ionicSideMenuDelegate,
  $ionicModal,
  Service,
  $cordovaVibration
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

  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("landscape");
      // if (window.cordova) {
      //   window.plugins.NativeAudio.stop("timer");
      //   window.plugins.NativeAudio.stop("coin");
      //   window.plugins.NativeAudio.stop("winner");
      //   window.plugins.NativeAudio.stop("shuffle");
      //   window.plugins.NativeAudio.stop("button");
      // }
    } else {
    }
  });

  $ionicPlatform.registerBackButtonAction(function(event) {
    event.preventDefault();
  }, 100);
  //end of ionic cordova
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  $ionicModal
    .fromTemplateUrl("templates/modal/terms-and-condition.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.termsModal = modal;
    });
  $scope.termsAndCondition = function() {
    $scope.termsModal.show();
  };
  $scope.closeTermsModal = function() {
    $scope.termsModal.hide();
  };

  $ionicModal
    .fromTemplateUrl("templates/modal/privacy-policy.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.privacyModal = modal;
    });
  $scope.openPrivacyPolicyModal = function() {
    $scope.privacyModal.show();
  };
  $scope.closePrivacyPolicyModal = function() {
    $scope.privacyModal.hide();
  };

  $ionicModal
    .fromTemplateUrl("templates/modal/faq.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.faqModal = modal;
    });
  $scope.openFaqModal = function() {
    $scope.faqModal.show();
  };
  $scope.closeFaqModal = function() {
    $scope.faqModal.hide();
  };

  $scope.changetab = "question";
  $scope.changeTab = function(tab) {
    console.log("tab name", tab);
    $scope.changetab = tab;
  };

  $scope.logout = function() {
    $.jStorage.flush();
    $state.go("login");
  };

  $scope.accessToken = $.jStorage.get("accessToken");

  //playerData
  $scope.playerDataFunction = function() {
    Service.getProfile(function(data) {
      console.log(data);
      $scope.playerData = data.data.data;
      $scope.playerDataId = data.data.data._id;
      $scope._id = $.jStorage.set("_id", $scope.playerDataId);
    });
  };

  $scope.playerDataFunction();

  $scope.callVibrateFunction = function() {
    $ionicPlatform.ready(function() {
      $cordovaVibration.vibrate(500);
    });
  };
});
