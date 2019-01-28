myApp.controller("SignUpCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout, ionicDatePicker, $filter) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  $scope.data = {};
  $scope.notMatching = false;
  $scope.matchPasswords = function (data) {
    if (!_.isEqual(data.password, data.confirmPassword)) {
      $scope.notMatching = true;
    } else {
      $scope.notMatching = false;
    }
  }
  var ipObj1 = {
    callback: function (val) {
      var today = new Date();
      var birthDate = new Date(val);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 21) {
        $scope.ageError = true;
      } else {
        $scope.ageError = false;
        $scope.data.dob = $filter("date")(
          new Date(val), 'dd-MM-yyyy'
        );
      }
    },
    disabledDates: [],
    // from: new Date(2012, 1, 1), //Optional
    // to: new Date(2016, 10, 30), //Optional
    // inputDate: new Date(), //Optional
    // mondayFirst: true, //Optional
    // disableWeekdays: [0], //Optional
    // closeOnSelect: false, //Optional
    templateType: 'popup' //Optional
  };

  $scope.openDatePicker = function () {
    ionicDatePicker.openDatePicker(ipObj1);
  };
  // $scope.checkAge = function (dob) {
  //   console.log('dob', dob);

  // };
  $scope.signUpStatus = false;
  $scope.signUpError = false;
  $scope.referredErr = false;
  $scope.signUp = function (data, signup) {
    console.log("sif");
    $scope.signUpPromise = Service.signUp(data, function (data) {
      console.log("sign up data", data);
      if (data.value) {
        $scope.signUpError = false;
        $scope.referredErr = false;
        $scope.signUpStatus = data.data;
        $timeout(function () {
          $state.go('login');
        }, 1000)
        console.log("signup", $scope.signUpStatus);
      } else {
        if (data.error == "Referral Code is Invalid") {
          $scope.signUpStatus = false;
          $scope.signUpError = false;
          $scope.referredErr = true;
        } else {
          $scope.signUpStatus = false;
          $scope.signUpError = true;
          $scope.referredErr = false;
        }

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
