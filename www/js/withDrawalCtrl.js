myApp.controller("WithDrawalCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait');
  })
  $scope.withdrawDetails = []

  //withdraw Coins
  $scope.withdrawCoins = function (data) {
    $scope.withdrawPromise = Service.withdrawCoins(data, function (data) {
      $scope.pageNo = 0
      $scope.withdrawDetails = []
      $scope.loadMore();
    });
    $scope.table = ""
  };
  //Initialized maxpage and pageNo 
  $scope.pageNo = 0
  $scope.paging = {
    maxPage: 1
  }
  //getTransactions
  $scope.getTransactionDetails = function () {
    Service.getTransaction($scope.pageNo, function (data) {
      if (data) {
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.withdrawDetails.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    })
  }
  //loadMore
  $scope.loadMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.loadingDisable = true;
      $scope.getTransactionDetails();
      $scope.pageNo++;
    } else {}
  };
  $scope.loadMore();
})
