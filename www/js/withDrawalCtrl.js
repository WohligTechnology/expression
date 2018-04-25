myApp.controller("WithDrawalCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })

  //withdraw Coins
  $scope.withdrawCoins = function (data) {
    Service.withdrawCoins(data, function (data) {
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
