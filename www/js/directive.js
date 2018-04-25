myApp.directive('card', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        card: "@",
        width: "@",
        height: "@"
      },
      templateUrl: 'templates/directive/card.html',
      link: function ($scope, element, attr) {
        function calc() {
          // $scope.style = {
          //   width: $scope.width + "px",
          //   height: $scope.height + "px"
          // };
          $scope.cardFile = "img/cards/" + _.toUpper($scope.card) + ".svg";
        }
        calc();
        $scope.$watch("card", function () {
          calc();
        });
      }
    };
  })
  .directive('players', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        remainingPlayerCount: "=ngRemainingPlayer",
        showWinnerPlayer: "=ngWinnerPlayer",
        gameType: "=ngGameType",
        pos: "=ngPos",
        sitHere: "=ngSitHere",
        winnerPlayerNo: "=ngWin",
        startAnimation: "=ngAnimation",
        activePlayer: "=ngActivePlayer",
      },
      templateUrl: 'templates/directive/player.html',
      link: function (scope, element, attr) {}
    };
  })
  .directive('mainplayer', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        gameType: "=ngGameType",
        pos: "=ngPos",
        mainplayer: "@ngMain",
        sitHere: "=ngSitHere",
        winnerPlayerNo: "=ngWin",
        startAnimation: "=ngAnimation",
        remainingPlayerCount: "=ngRemainingPlayer",
        showCard: "&"
      },
      templateUrl: 'templates/directive/main-player.html',
      link: function (scope, element, attr) {}
    };
  })
  .directive('community', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        communityCard: "=ngCommunityCard"
      },
      templateUrl: 'templates/directive/communityCard.html',
      link: function ($scope, element, attr) {

      }
    };
  })
  // .directive('gameHistory', function () {
  //   return {
  //     restrict: 'E',
  //     replace: false,
  //     templateUrl: 'templates/directive/game-history.html',
  //     link: function ($scope, element, attr) {
  //       //console.log("Player Loaded");
  //     }
  //   };
  // })
  .directive('potAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        amount: "=ngAmount",
        winnerPlayerNo: "=ngWinner",
        players: "=ngPlayer"
      },
      templateUrl: 'templates/directive/pot-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('tipAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        amount: "=ngAmount",
        PlayerNo: "=ngPlayerNo",
        players: "=ngPlayer"
      },
      templateUrl: 'templates/directive/tip-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('leftMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/left-menu.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('tableInfo', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/table-info.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('youtube', function ($sce) {
    return {
      restrict: 'EA',
      scope: {
        code: '='
      },
      replace: true,
      template: '<iframe id="popup-youtube-player" style="overflow:hidden;" src="{{url}}" frameborder="0" allowscriptaccess="always"></iframe>',
      link: function (scope) {
        scope.$watch('code', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?autoplay=1");
          }
        });
      }
    };
  });
