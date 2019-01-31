myApp.controller("PandLstatementCtrl", function ($scope, $state, $ionicHistory) {
  // $ionicPlatform.ready(function () {
  //   if (ionic.Platform.isAndroid()) {
  //     screen.orientation.lock('portrait');
  //   } else {}
  // });
  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };

  $scope.accountStatements = {
    statementInfo: {
      date: '13/01/2019',
      tableName: 'Table No 1',
      tableType: 'holdem',
      game: 'Win',
      betAmount: '5000',
      gameAmt: '15000',
      commissionRate: '3',
    },
    statementInfo1: {
      date: '15/01/2019',
      tableName: 'Sizzling Sixes',
      tableType: 'omaha',
      game: 'Lose',
      betAmount: '10000',
      gameAmt: '15000',
      commissionRate: '3',
    },
    statementInfo2: {
      date: '16/01/2019',
      tableName: 'Table No 12',
      tableType: 'holdem',
      game: 'Lose',
      betAmount: '3000',
      gameAmt: '5000',
      commissionRate: '3',
    },
    statementInfo2: {
      date: '16/01/2019',
      tableName: 'Table No 12',
      tableType: 'omaha',
      game: 'Win',
      betAmount: '3000',
      gameAmt: '10000',
      commissionRate: '5',
    },
  }
})
