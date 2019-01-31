myApp.controller('TransferStatementCtrl', function (
  $scope,
  $window,
  $ionicPlatform,
  $ionicSideMenuDelegate,
  $ionicModal
) {

  $ionicPlatform.ready(function () {
    screen.orientation.lock("landscape");
    console.log('Orientation is ' + screen.orientation.type);
  })
  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  //end of ionic cordova

  $scope.currDate = moment().format('DD/MM/YYYY');

  $scope.allTransactionsData = {
    transaction: {
      'id': "101",
      'amount': "1000",
      'transactionType': "cr",
      'balance': "10000",
    },
    transaction1: {
      'id': "102",
      'amount': "5000",
      'transactionType': "db",
      'balance': "5000",
    },
    transaction2: {
      'id': "103",
      'amount': "10000",
      'transactionType': "cr",
      'balance': "15000",
    },
    transaction3: {
      'id': "104",
      'amount': "10000",
      'transactionType': "db",
      'balance': "5000",
    },
    transaction4: {
      'id': "105",
      'amount': "10000",
      'transactionType': "cr",
      'balance': "100000",
    },
    transaction5: {
      'id': "106",
      'amount': "10000",
      'transactionType': "cr",
      'balance': "100000",
    },
    transaction6: {
      'id': "107",
      'amount': "10000",
      'transactionType': "db",
      'balance': "100000",
    },
    transaction7: {
      'id': "108",
      'amount': "10000",
      'transactionType': "cr",
      'balance': "100000",
    },
    transaction8: {
      'id': "109",
      'amount': "10000",
      'transactionType': "cr",
      'balance': "100000",
    }
  }

  $scope.selectedTab = 'Add';

  /**get table data by type of transaction */
  $scope.transferType = function (type) {
    $scope.selectedTab = type;
    switch ($scope.selectedTab) {
      case 'Add':
        var temp = _.cloneDeep($scope.allTransactionsData);
        $scope.allTransactions = _.pickBy(temp, function (m) {
          return m.transactionType == 'cr'
        });
        break;
      case 'Withdraw':
        var temp = _.cloneDeep($scope.allTransactionsData);
        $scope.allTransactions = _.pickBy(temp, function (m) {
          return m.transactionType == 'db'
        });
        break;
      default:
        break;
    }
  }
  $scope.transferType('Add');
  /**get table data end */

  /**For each transaction info */

  $ionicModal.fromTemplateUrl('templates/modal/transaction-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transactionModal = modal;
  });

  $scope.getTransactionInfo = function (transaction) {
    $scope.transactionInfo = transaction;
    $scope.transactionDate = moment().format('DD/MM/YYYY hh:mm ss');
    $scope.transactionModal.show();
  }
  $scope.closeTransactionInfoModal = function () {
    $scope.transactionModal.hide();
  };
  /**transaction info End */

})
