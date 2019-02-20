myApp.controller("PandLstatementCtrl", function(
  $scope,
  $state,
  $ionicHistory,
  $window,
  Service,
  ionicDatePicker
) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });

  $scope.plStmtData = {};
  $scope.plStmtData.toDate = moment().format("DD-MM-YYYY");
  $scope.plStmtData.fromDate = moment().format("DD-MM-YYYY");

  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $window.history.back();
  };
  $scope.time = moment().format("HH:mm");
  $scope.tableData = [];
  $scope.data = {
    page: 0
  };
  var currentDate = new Date();
  $scope.data.fromDate = $scope.data.toDate = moment(currentDate).subtract(1);
  $scope.getTableData = function() {
    $scope.transactionsLoaded = false;
    if (!$scope.tableListLoading) {
      $scope.data.page = $scope.data.page + 1;
      $scope.tableListLoading = true;
      Service.getProfitLossDetails($scope.data, function(data) {
        $scope.tableListLoading = false;
        if (data.data.value) {
          if (_.isEmpty(data.data.data.tableData.results)) {
            $scope.transactionsLoaded = true;
          } else {
            // $scope.allTransactions = data.data.data.results;
            $scope.netProfit = data.data.data.netProfit;
            $scope.tableData = _.concat(
              $scope.tableData,
              data.data.data.tableData.results
            );
          }
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }
      });
    }
  };
  $scope.getTableData();
  $scope.onInfinite = function() {
    console.log("onInfinite called");
    $scope.getTableData();
  };
  /**Date Picker */

  var ipObj2 = {
    to: new Date(),
    callback: function(val) {
      $scope.toDate = moment(val);
      $scope.data.page = 0;
      $scope.data.toDate = $scope.toDate;
      $scope.tableData = [];
      $scope.plStmtData.toDate = moment(val).format("DD-MM-YYYY");
      $scope.getTableData();
    },
    disabledDates: [],
    templateType: "popup" //Optional
  };

  var ipObj1 = {
    callback: function(val) {
      $scope.fromDate = moment(val);
      ipObj2.from = new Date(
        moment(val).year(),
        moment(val).month(),
        moment(val).date()
      );
      $scope.data.page = 0;
      $scope.data.fromDate = $scope.fromDate;
      $scope.tableData = [];
      $scope.plStmtData.fromDate = moment(val).format("DD-MM-YYYY");
      $scope.getTableData();
    },
    disabledDates: [],
    templateType: "popup" //Optional
  };

  $scope.openFromDatePicker = function() {
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.openToDatePicker = function() {
    ionicDatePicker.openDatePicker(ipObj2);
  };
});
