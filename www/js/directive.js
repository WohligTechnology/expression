var globalPlayer;
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
        allInPlayers: "=ngAllIn",
        activePlayer: "=ngActivePlayer",
        extra: "=ngExtra",
        chalAmt: "=ngChalAmount",
        bigBlindAmt: "=ngBigBlind",
        smallBlindAmt: "=ngSmallBlind",
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
  .directive('potAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        pots: "=ngPots",
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
  .directive('currentRound', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        players: "=ngPlayer"
      },
      templateUrl: 'templates/directive/current-round.html',
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
  .directive('customLoader', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/loader.html',
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
  // .directive('youtube', function ($sce) {
  //   return {
  //     restrict: 'EA',
  //     scope: {
  //       code: '='
  //     },
  //     replace: true,
  //     template: '<iframe id="popup-youtube-player" src="{{url}}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
  //     link: function (scope) {
  //       scope.$watch('code', function (newVal) {
  //         if (newVal) {
  //           scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?modestbranding=1");
  //         }
  //       });
  //     }
  //   };
  // });
  .directive('youtube', function ($timeout) {
    return {
      restrict: 'EA',
      link: function ($scope) {
        $timeout(function () {
          player = new YT.Player("ytplayer", {
            events: {
              'onReady': onPlayerReady
            }
          });
        }, 1000);

        function onPlayerReady(event) {
          console.log("played video");
          event.target.playVideo();
        }
      }
    }
  })
  .directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
          if (parseInt(inputValue) <= 150000 && parseInt(inputValue) > 0) {
            modelCtrl.$setValidity('numbersOnly', true);
            return inputValue;
          } else {
            modelCtrl.$setValidity('numbersOnly', false);
            return modelCtrl.$modelValue;
          }

        });
      }
    };
  });
