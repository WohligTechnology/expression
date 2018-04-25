myApp.controller("AddAmountCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  screen.orientation.lock('portrait');

  //buy Coins
  $scope.buyCoins = function (data) {
    console.log(data)
    Service.buyCoins(data, function (data) {
      console.log(data)
      $scope.getTransactionDetails();
    });
  };
  $scope.pageNo = 1
  //getTransactions
  $scope.getTransactionDetails = function () {
    Service.getTransaction($scope.pageNo, function (data) {
      console.log(data)
    })
  }
  $scope.getTransactionDetails();

})
