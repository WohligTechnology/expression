myApp.controller("ReferralCtrl", function(
  $scope,
  $state,
  $ionicHistory,
  $window,
  Service,
  $cordovaSocialSharing,
  $ionicPlatform
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
    $.jStorage.set("referralCode", $scope.playerData.referralCode);
    $scope._id = $.jStorage.set("_id", $scope.playerDataId);
  });
  var link =
    "https://play.google.com/store/apps/details?id=com.fabricterminal.app&hl=en";

  var message =
    "Hey download 'Ante Poker' app. Play and win real money directly from and to your bank account. Here's my code - " +
    $.jStorage.get("referralCode") +
    " -Just enter it while signing up to the app. You will get 10% of the amount added to the app";

  $scope.socialShare = function() {
    $ionicPlatform.ready(function() {
      $cordovaSocialSharing
        .share(message, "", "", link) // Share via native share sheet
        .then(
          function(result) {
            // Success!
          },
          function(err) {
            // An error occured. Show a message to the user
          }
        );
    });
  };

  $scope.shareOnWhatsapp = function() {
    $ionicPlatform.ready(function() {
      $cordovaSocialSharing.shareViaWhatsApp(message, "", link).then(
        function(result) {
          // Success!
        },
        function(err) {
          // An error occurred. Show a message to the user
        }
      );
    });
  };

  $scope.shareOnSms = function() {
    $ionicPlatform.ready(function() {
      $cordovaSocialSharing.shareViaSMS(message, "").then(
        function(result) {
          // Success!
        },
        function(err) {
          // An error occurred. Show a message to the user
        }
      );
    });
  };
});
