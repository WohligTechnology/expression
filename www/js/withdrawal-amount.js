myApp.controller("WithdrawalCtrl", function(
  $scope,
  Service,
  $state,
  $ionicPlatform,
  $ionicModal,
  $window,
  $timeout
) {
  $ionicPlatform.ready(function() {
    screen.orientation.lock("portrait");
  });
  $scope.goBackToPage = function() {
    console.log("Go Back ", $window.history);
    $state.go("account");
  };
  $scope.withdrawDetails = [];

  //withdraw Coins
  $scope.err = "";
  $scope.showWithdrawError = false;
  $scope.withdrawCoins = function(data) {
    $scope.withdrawPromise = Service.withdrawCoins(data, function(data) {
      console.log("withdraw coins function return data::", data.data.value);
      if (data.data.value) {
        $.jStorage.set("transactionDetail", data.data.data.transaction);
        $scope.err = "";
        $scope.showWithdrawError = false;
        $scope.modalotp();
        $scope.pageNo = 0;
        $scope.withdrawDetails = [];
        $scope.loadMore();
      } else {
        $scope.err = data.data.error;
        $scope.showWithdrawError = true;
      }
    });
    $scope.table = "";
  };
  //Initialized maxpage and pageNo
  $scope.pageNo = 0;
  $scope.paging = {
    maxPage: 1
  };
  //getTransactions
  $scope.getTransactionDetails = function() {
    Service.getTransaction($scope.pageNo, function(data) {
      if (data) {
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function(n) {
          $scope.withdrawDetails.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast("scroll.infiniteScrollComplete");
      } else {
      }
    });
  };
  //loadMore
  $scope.loadMore = function() {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.loadingDisable = true;
      $scope.getTransactionDetails();
      $scope.pageNo++;
    } else {
    }
  };
  $scope.loadMore();

  /************otp modal****** */
  $ionicModal
    .fromTemplateUrl("templates/modal/otp.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(otpModal) {
      $scope.hideText = true;
      $scope.otpModal = otpModal;
    });

  $scope.modalotp = function() {
    $scope.otpModal.show();
  };

  $scope.VerifyOtp = function(data1) {
    console.log(
      "transaction from withdraw callback:::",
      $.jStorage.get("transactionDetail")
    );
    var data = {};
    data.transaction = $.jStorage.get("transactionDetail");
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
    Service.verifyTransactionOtp(data, function(data) {
      if (data.value == true) {
        $scope.closeModalOtp();
        // $state.go("lobby");
        $state.go("account");
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
    Service.resendTransactionOtp(data, function(data) {
      if (data.value == true) {
        $scope.regenerateOtp = true;
      }
    });
  };

  $scope.closeModalOtp = function() {
    $scope.otpModal.hide();
  };

  /**OTP on backspapce change */
  $scope.formName = {};
});
