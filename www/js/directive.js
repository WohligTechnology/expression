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
          $scope.style = {
            width: $scope.width + "px",
            height: $scope.height + "px"
          };
          $scope.cardFile = "img/cards/" + _.toUpper($scope.card) + ".svg";
          // $scope.cardFile = "img/cards/CARDCLOSE.png";
        }
        calc();
        $scope.$watch("card", function () {
          calc();
        });
      }
    };
  })
  .directive("onlyDigits", function ($window) {
    return {
      require: "ngModel",
      restrict: "A",
      link: function ($scope, element, attr, ctrl) {
        var digits;

        function inputValue(val) {
          if (val != undefined) {
            var otherVal = val + "";
            if (attr.type == "text") {
              digits = otherVal.replace(/[^0-9\-\.\\]/g, "");
            } else {
              digits = otherVal.replace(/[^0-9\-\.\\]/g, "");
            }

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits, 10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
        $scope.checkChange = function (value) {
          // console.log($scope.$parent.formName);
          switch (value) {
            case 4:
              if ($scope.$parent.formName.digit4 == undefined) {
                var element = $window.document.getElementById('part3');
                if (element)
                  element.focus();
              }
              break;

            case 3:
              if ($scope.$parent.formName.digit3 == undefined) {
                var element = $window.document.getElementById('part2');
                if (element)
                  element.focus();
              }
              break;

            case 2:
              if ($scope.$parent.formName.digit2 == undefined) {
                var element = $window.document.getElementById('part1');
                if (element)
                  element.focus();
              }
              break;

            case 1:
              if ($scope.$parent.formName.digit1 == undefined) {
                var element = $window.document.getElementById('part1');
                if (element)
                  element.focus();
              }
              break;
            default:
              console.log("invalid choice");
          }
        }
      }
    };
  })
  .directive("moveNextOnMaxlength", function () {
    return {
      restrict: "A",
      link: function ($scope, element) {
        element.on("input", function (e) {
          if (element.val().length == element.attr("maxlength")) {
            var $nextElement = element.next();
            if ($nextElement.length) {
              $nextElement[0].focus();
            }
          }
        });
        $(":input").keyup(function (e) {
          if ($(this).val() == "" && e.which == 8) {
            $(this)
              .prev("input")
              .focus();
          }
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
  })
  .directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        var digits;

        function inputValue(val) {
          if (val) {
            var otherVal = val + "";
            if (attr.type == "text") {
              digits = otherVal.replace(/[^0-9\\\\]/g, '');
            } else {
              digits = otherVal.replace(/[^0-9\\\\]/g, '');
            }


            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits, 10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  });
