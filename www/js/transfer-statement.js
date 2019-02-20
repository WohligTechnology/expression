myApp.controller("TransferStatementCtrl", function(
  $scope,
  $window,
  $ionicPlatform,
  $ionicSideMenuDelegate,
  $window,
  $ionicModal,
  Service
) {
  $scope.goBackToPage = function() {
    console.log("Go Back ", $window.history);
    $window.history.back();
  };

  $ionicPlatform.ready(function() {
    screen.orientation.lock("potrait");
  });
  $ionicPlatform.registerBackButtonAction(function(event) {
    event.preventDefault();
  }, 100);
  //end of ionic cordova

  /**api call for getting table data as per transaction type */
  $scope.allTransactions = [];
  $scope.getTransferStatement = function(data) {
    $scope.transactionsLoaded = false;
    if (!$scope.tableListLoading) {
      data.pageno = data.pageno + 1;
      $scope.tableListLoading = true;
      Service.getTransferStatementDetails(data.transType, data.pageno, function(
        data
      ) {
        $scope.tableListLoading = false;
        if (data.data.value) {
          if (_.isEmpty(data.data.data.results)) {
            $scope.transactionsLoaded = true;
          } else {
            // $scope.allTransactions = data.data.data.results;
            $scope.allTransactions = _.concat(
              $scope.allTransactions,
              data.data.data.results
            );
          }
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }
      });
    }
  };

  $scope.selectedTab = "Add";

  /**get table data by type of transaction */
  $scope.transferType = function(type) {
    $scope.selectedTab = type;
    switch ($scope.selectedTab) {
      case "Add":
        $scope.allTransactions = [];
        $scope.transactionData = {};
        $scope.transactionData.transType = "diposit";
        $scope.transactionData.pageno = 0;
        $scope.getTransferStatement($scope.transactionData);
        break;
      case "Withdraw":
        $scope.allTransactions = [];
        $scope.transactionData = {};
        $scope.transactionData.transType = "withdraw";
        $scope.transactionData.pageno = 0;
        $scope.getTransferStatement($scope.transactionData);
        break;
      default:
        break;
    }
  };
  $scope.transferType("Add");
  /**get table data end */

  $scope.onInfinite = function() {
    console.log("onInfinite called");
    $scope.getTransferStatement($scope.transactionData);
  };

  /**For each transaction info */

  $ionicModal
    .fromTemplateUrl("templates/modal/transaction-info.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.transactionModal = modal;
    });

  $scope.getTransactionInfo = function(transaction) {
    $scope.transactionInfo = transaction;
    console.log("modal transaction", $scope.transactionInfo);
    // $scope.transactionDate = moment().format("DD/MM/YYYY hh:mm ss");
    $scope.transactionModal.show();
  };
  $scope.closeTransactionInfoModal = function() {
    $scope.transactionModal.hide();
  };
  /**transaction info End */
});
