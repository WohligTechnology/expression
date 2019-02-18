myApp.controller("LoginCtrl", function(
  $scope,
  Service,
  $state,
  $ionicPlatform,
  $ionicModal,
  $timeout,
  $window
) {
  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("portrait");
    } else {
    }
  });
  console.log(window.location.href);
  console.log($state.current.name);
  // var accessToken = $.jStorage.get("accessToken");
  // console.log("accesstoken", $.jStorage.get("accessToken"));
  $ionicModal
    .fromTemplateUrl("templates/modal/terms-and-condition.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.modal = modal;
    });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $ionicModal
    .fromTemplateUrl("templates/modal/message.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.messageModal = modal;
      // $scope.messageModal.show();
    });

  $scope.showMessageModal = function() {
    $scope.messageModal.show();
    $timeout(function() {
      $scope.closeMessageModal();
    }, 2000);
  };
  $scope.closeMessageModal = function() {
    $scope.messageModal.hide();
  };

  $scope.invalidUser = false;
  $scope.playerLogin = function(data, login) {
    $scope.loginPromise = Service.playerLogin(data, function(data) {
      if (data.value) {
        $scope.invalidUser = false;
        console.log("login", data);
        $.jStorage.set("id", data.data._id);
        $scope.modalotp();
      } else {
        console.log(data.error);
        $scope.invalidUser = data.error;
      }
    });
  };

  $scope.VerifyOtp = function(data1) {
    var data = {};
    data.otp =
      _.toString(data1.digit1) +
      _.toString(data1.digit2) +
      _.toString(data1.digit3) +
      _.toString(data1.digit4);
    $scope.regenerateOtp = false;
    $scope.invalidOTP = false;
    $scope.expiredOTP = false;
    var id = $.jStorage.get("id");
    data._id = id;
    Service.verifyOtp(data, function(data) {
      // console.log(data.data.accessToken[0]);
      if (data.value == true) {
        $scope.closeModalOtp();
        $.jStorage.set("accessToken", data.data.accessToken[0]);
        $state.go("lobby");
      } else {
        if (data.error == "OTP Expired.") {
          $scope.expiredOTP = true;
          $scope.invalidOTP = false;
        } else {
          $scope.expiredOTP = false;
          $scope.invalidOTP = true;
        }
      }
    });
  };

  $scope.resendOtp = function() {
    $scope.regenerateOtp = false;
    var id = $.jStorage.get("id");
    var data = {};
    data._id = id;
    Service.resendOtp(data, function(data) {
      if (data.value == true) {
        $scope.regenerateOtp = true;
      }
    });
  };

  // //js Storage
  // $scope.accessToken = $.jStorage.get("accessToken");
  // if ($scope.accessToken) {
  //   $state.go("lobby");
  // }
  $ionicPlatform.registerBackButtonAction(function(event) {
    ionic.Platform.exitApp();
  }, 100);

  /************otp modal****** */
  $ionicModal
    .fromTemplateUrl("templates/modal/otp.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(otpModal) {
      $scope.otpModal = otpModal;
    });
  $scope.modalotp = function() {
    $scope.otpModal.show();
  };
  $scope.closeModalOtp = function() {
    $scope.otpModal.hide();
  };

  /**********confirm otp****** */
  $ionicModal
    .fromTemplateUrl("templates/modal/confirm-otp.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(confirmotpModal) {
      $scope.confirmotpModal = confirmotpModal;
    });
  $scope.modalconfirmotp = function() {
    $scope.confirmotpModal.show();
  };
  $scope.closeConfirmModal = function() {
    $scope.confirmotpModal.hide();
  };

  /**OTP on backspapce change */
  $scope.formName = {};
  // $scope.checkChange = function (value) {
  //   switch (value) {
  //     case 4:
  //       if ($scope.formName.digit4 == undefined) {
  //         var element = $window.document.getElementById('part3');
  //         if (element)
  //           element.focus();
  //       }
  //       break;

  //     case 3:
  //       if ($scope.formName.digit3 == undefined) {
  //         var element = $window.document.getElementById('part2');
  //         if (element)
  //           element.focus();
  //       }
  //       break;

  //     case 2:
  //       if ($scope.formName.digit2 == undefined) {
  //         var element = $window.document.getElementById('part1');
  //         if (element)
  //           element.focus();
  //       }
  //       break;

  //     case 1:
  //       if ($scope.formName.digit1 == undefined) {
  //         var element = $window.document.getElementById('part1');
  //         if (element)
  //           element.focus();
  //       }
  //       break;
  //     default:
  //       console.log("invalid choice");
  //   }
  // }
});
