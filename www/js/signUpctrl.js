myApp.controller("SignUpCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  $scope.notMatching = false;
  $scope.matchPasswords = function (data) {
    if (!_.isEqual(data.password, data.confirmPassword)) {
      $scope.notMatching = true;
    } else {
      $scope.notMatching = false;
    }
  }
  $scope.signUpStatus = false;
  $scope.signUpError = false;
  $scope.signUp = function (data, signup) {
    console.log("sif");
    $scope.signUpPromise = Service.signUp(data, function (data) {
      console.log("sign up data", data);
      if (data.value) {
        $scope.signUpError = false;
        $scope.signUpStatus = data.data;
        $timeout(function () {
          $state.go('login');
        }, 1000)
        console.log("signup", $scope.signUpStatus);
      } else {
        $scope.signUpStatus = false;
        $scope.signUpError = true;
      }
    })
  };

  $scope.state = {
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "BR": "Bihar",
    "CG": "Chhattisgarh",
    "Chandigarh": "Chandigarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "PB": "Punjab",
    "PY": "Pondicherry",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UK": "Uttarakhand",
    "WB": "West Bengal"
  }
})
