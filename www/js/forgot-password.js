myApp.controller("ForgotPasswordCtrl", function(
  $scope,
  $state,
  $ionicPlatform,
  $ionicModal,
  $window,
  Service
) {
  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("portrait");
    } else {
    }
  });
  $scope.goBackToPage = function() {
    console.log("Go Back ", $window.history);
    $window.history.back();
  };

  $scope.mobileNo = "";
  $scope.forgotPassword = {};
  $scope.numberError = false;

  $scope.showEnterMobileNumber = true;
  $scope.showChangeForgotPassword = false;
  $scope.enternumber = function(mobile) {
    console.log("mobile Number", mobile);
    var data = {};
    data.mobile = mobile;
    Service.forgetPassword(data, function(data) {
      if (data.value) {
        // console.log("forgetPassword data", data);
        $.jStorage.set("userId", data.data._id);
        $scope.modalotp();
      } else {
        $scope.numberError = true;
        $scope.notRegisteredNo = data.error;
        console.log("error", data);
      }
    });
  };

  $scope.VerifyOtp = function(data1) {
    var data = {};
    data._id = $.jStorage.get("userId");
    data.otp =
      _.toString(data1.digit1) +
      _.toString(data1.digit2) +
      _.toString(data1.digit3) +
      _.toString(data1.digit4);
    console.log("data");
    $scope.regenerateOtp = false;
    $scope.invalidOTP = false;
    $scope.expiredOTP = false;
    Service.verifyOtpForForgetPassword(data, function(data) {
      if (data.value == true) {
        $scope.closeModalOtp();
        $scope.showEnterMobileNumber = false;
        $scope.showChangeForgotPassword = true;
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

  $scope.notMatching = false;
  $scope.matchPasswords = function(data) {
    if (!_.isEqual(data.password, data.confirmPassword)) {
      $scope.notMatching = true;
    } else {
      $scope.notMatching = false;
    }
  };

  /**set new password */
  $scope.setNewPassword = function(passwordData) {
    var data = {};
    data.password = passwordData.password;
    data.confirmPassword = passwordData.confirmPassword;
    data._id = $.jStorage.get("userId");
    Service.setForgetPassword(data, function(data) {
      if (data.value) {
        $state.go("login");
      } else {
        console.log("data.error", data.error);
      }
    });
  };
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

  /**OTP on backspapce change */
  $scope.formName = {};
});
