myApp.controller("ProfileCtrl", function(
  $scope,
  $state,
  $ionicPlatform,
  $ionicHistory,
  Service,
  $stateParams,
  $window
) {
  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("portrait");
    } else {
    }
  });
  $scope.showThis = "Personal";
  $scope.goToTab = function(tab) {
    $scope.showThis = tab;
    console.log("Tab Name", tab);
  };

  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    if ($window.history.back() !== "lobby") {
      $state.go("account");
    } else {
      $state.go("lobby");
    }
  };
  $scope.goBackToPageForPassword = function() {
    console.log("password changed");
    $window.history.back();
  };
  // $scope.profile = function() {

  Service.getProfile(function(data) {
    console.log("get Profile", data);
    $scope.playerData = data.data.data;
    $scope.playerData.dob = moment(data.data.data.dob).format("YYYY/MM/DD");
    $scope.playerDataId = data.data.data._id;
    $scope._id = $.jStorage.set("_id", $scope.playerDataId);
  });

  // $scope.cancel = function() {
  //   $window.history.back();
  // };

  $scope.saveProfile = function(playerData) {
    console.log("sdfdfdf", playerData);
    Service.saveUser(playerData, function(data) {
      if (data.value === true) {
        $window.history.back();
      } else {
        //do nothing
      }
    });
  };

  /**Change Password Function */
  $scope.oldNewMatch = false;
  $scope.newConfirmMatch = false;
  $scope.oldPasswdError = false;

  $scope.matchPasswords = function(data) {
    if (data.oldPassword == data.password) {
      $scope.oldNewMatch = true;
    } else if (
      data.password != data.confirmPassword &&
      !_.isEmpty(data.confirmPassword)
    ) {
      $scope.newConfirmMatch = true;
    } else {
      $scope.oldNewMatch = false;
      $scope.newConfirmMatch = false;
    }
  };
  $scope.changePassword = function(passwordData) {
    var data = {};
    data = _.cloneDeep(passwordData);
    data.accessToken = $.jStorage.get("accessToken");
    console.log("changePassword", data);
    Service.changePassword(data, function(data) {
      if (data.value) {
        $state.go("profile");
      } else {
        if (data.error == "Old Password do not match") {
          $scope.oldPasswdError = true;
        }
      }
    });
  };

  $scope.state = {
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    BR: "Bihar",
    CG: "Chhattisgarh",
    Chandigarh: "Chandigarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    PB: "Punjab",
    PY: "Pondicherry",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UK: "Uttarakhand",
    WB: "West Bengal"
  };
});
