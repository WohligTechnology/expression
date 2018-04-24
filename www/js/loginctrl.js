myApp.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  screen.orientation.lock('portrait');


  $ionicModal.fromTemplateUrl('templates/modal/terms-and-condition.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $ionicModal.fromTemplateUrl('templates/modal/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
    // $scope.messageModal.show();
  });

  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 2000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };

  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    $scope.loginPromise = Service.playerLogin(data, function (data) {

      if (data.value) {
        $scope.invalidUser = false;
        console.log("login", data);
        $.jStorage.set("id", data.data._id);
        $scope.modalotp();

      } else {
        console.log(data.error);
        $scope.invalidUser = data.error;
      }



      // $.jStorage.set("accessToken", data.data);
      // if (data && !_.isEmpty(data.data)) {
      //   $state.go("lobby");
      // } else if (data.error == "Member already Logged In") {
      //   $scope.message = {
      //     heading: "User Already Loged In",
      //     content: "User already loged in another device. Logout from that device. Try Again!!!"
      //   };
      //   $scope.showMessageModal();
      // } else if(data.error=="Login denied")
      // {
      //   $scope.message = {
      //     heading: "Login denied",
      //     content: "Login denied"
      //   };
      //   $scope.showMessageModal();
      // }

      //   else {
      //   $scope.message = {
      //     heading: "Incorrect Username Password",
      //     content: "Try Again!!!"
      //   };
      //   $scope.showMessageModal();
      // }
    });
  };

  $scope.VerifyOtp = function (data) {
    var id = $.jStorage.get("id");
    data._id = id;
    Service.verifyOtp(data, function (data) {
      // console.log(data.data.accessToken[0]);
      if (data.value) {
        $scope.closeModalOtp();
        $.jStorage.set("accessToken", data.data.accessToken[0]);
        $state.go("lobby");
      } else {

      }
      // $.jStorage.set("accessToken");
    })
  }



  // //js Storage 
  $scope.accessToken = $.jStorage.get("accessToken");
  if ($scope.accessToken) {
    $state.go("lobby");
  }
  $ionicPlatform.registerBackButtonAction(function (event) {
    ionic.Platform.exitApp();
    // event.preventDefault();
  }, 100);

  /************otp modal****** */
  $ionicModal.fromTemplateUrl('templates/modal/otp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (otpModal) {
    $scope.otpModal = otpModal;
    // $scope.otpModal.show();
  });
  $scope.modalotp = function () {
    $scope.otpModal.show();
  };
  $scope.closeModalOtp = function () {
    $scope.otpModal.hide();
  };

  /**********confirm otp****** */
  $ionicModal.fromTemplateUrl('templates/modal/confirm-otp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (confirmotpModal) {
    $scope.confirmotpModal = confirmotpModal;
  });
  $scope.modalconfirmotp = function () {
    $scope.confirmotpModal.show();
  };
  $scope.closeConfirmModal = function () {
    $scope.confirmotpModal.hide();
  };


  $scope.verticalSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };
});
