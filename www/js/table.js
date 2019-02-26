var newGameSocketFunction;
var updateSocketFunction;
var showWinnerFunction;
var removePlayerFunction;
var seatSelectionFunction;
var myTableNo = 0;

myApp.controller("TableCtrl", function(
  $scope,
  $ionicModal,
  $ionicPlatform,
  $state,
  Service,
  $stateParams,
  $timeout,
  $interval,
  $ionicPopover
) {
  $scope.tableId = $stateParams.id;

  $scope.verticalSlider = {};
  //range slider
  $scope.slider = {
    value: 100,
    options: {
      floor: 10,
      ceil: 150000,
      step: 100
    }
  };

  //range slider
  $scope.raiseSlider = {
    value: 100,
    options: {
      floor: 10,
      ceil: 150000,
      step: 10,
      vertical: true
    }
  };
  //loader for table
  $scope.ShowLoader = true;
  if ($.jStorage.get("socketId")) {
    $scope.ShowLoader = false;
  } else {
    $timeout(function() {
      $scope.ShowLoader = false;
    }, 5000);
  }

  $scope._id = $.jStorage.get("_id");
  $scope.playerDataFunction = function() {
    Service.getProfile(function(data) {
      if (data && data.data && data.data.data) {
        $scope.playerData = data.data.data;
        $scope.playerDataId = data.data.data._id;
      } else {
        $timeout(function() {
          $state.go("login");
        }, 3000);
      }
    });
  };

  $scope.playerDataFunction();

  //Message Ui
  $ionicModal
    .fromTemplateUrl("templates/modal/message.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.messageModal = modal;
    });

  $scope.showMessageModal = function() {
    $scope.messageModal.show();
    $timeout(function() {
      $scope.closeMessageModal();
    }, 3000);
  };
  $scope.closeMessageModal = function() {
    $scope.messageModal.hide();
  };

  // Game Play functions
  $scope.botAmount = 0;
  $scope.PotAmount = 0;
  $scope.startAnimation = false;
  $scope.insufficientFunds = false;
  $scope.chaalAmt = {};
  $scope.startCoinAnime = false;
  $scope.winnerPlayerNo = -1;
  $scope.showNewGameTime = false;
  $scope.tipAmount = -1;
  $scope.TipPlayerNo = -1;
  $scope.tableMessageShow = false;
  $scope.tableMessage = "";
  $scope.runVibratorFlag = true;
  $scope.updateSocketVar = 0;
  $scope.changeTableMessage = function(message) {
    $scope.tableMessageShow = true;
    $scope.tableMessage = message;
    $scope.$apply();
    $timeout(function() {
      $scope.tableMessageShow = false;
    }, 5000);
  };

  // function reArragePlayers(playersData) {
  //     console.log("playersData", playersData);
  //     var diff = 9 - myTableNo;
  //     var players = _.times(9, function (n) {
  //       var playerReturn = _.find(playersData, function (singlePlayer) {
  //         if (singlePlayer) {
  //           var checkNo = (singlePlayer.playerNo + diff);
  //           if (checkNo > 9) {
  //             checkNo = checkNo - 9;
  //             // console.log("checkNocheckNocheckNo", checkNo);
  //           }
  //           if ((n + 1) == checkNo) {
  //             console.log("checkNocheckNocheckNo", checkNo);
  //             return singlePlayer;
  //           } else {
  //             return null;
  //           }
  //         }
  //       });
  //       return _.cloneDeep(playerReturn);
  //     });
  //     console.log("playerReturn//////////////", players);
  //     $scope.players = players;
  //     console.log("reArragePlayers", $scope.players);
  //   }

  function reArragePlayers(playersData) {
    var players = _.times(9, function(n) {
      var playerReturn = _.find(playersData, function(singlePlayer) {
        if (singlePlayer) {
          var checkNo = singlePlayer.playerNo;
          if (n + 1 == checkNo) {
            return singlePlayer;
          } else {
            return null;
          }
        }
      });
      return _.cloneDeep(playerReturn);
    });
    $scope.activePlayer = _.filter(playersData, function(player) {
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    if (!_.isEmpty($scope.activePlayer)) {
      var diff = myTableNo - 1;
      $scope.players = players;
      console.log("rearr", $scope.players);
      var playerIndex = _.findIndex($scope.players, function(player) {
        return player && player.user && player.user._id == Service.getUserId();
      });
      console.log(playerIndex, "PlayerNo");
      if (playerIndex < 4) {
        var diff = 5 + playerIndex;
        var firstArr = _.slice($scope.players, 0, diff - 1);
        var secondArr = _.slice($scope.players, diff, 9);
        $scope.players = _.concat(secondArr, firstArr);
      } else if (playerIndex > 4) {
        var diff = playerIndex - 4;
        var firstArr = _.slice($scope.players, 0, diff - 1);
        var secondArr = _.slice($scope.players, diff, 9);
        $scope.players = _.concat(secondArr, firstArr);
      }
    } else {
      $scope.players = players;
      console.log("reArrag", $scope.players);
    }
  }

  //sound initialize
  $scope.destroyAudio = function() {
    $ionicPlatform.ready(function() {
      if (window.cordova) {
        // running on device/emulator
        window.plugins.NativeAudio.stop("turn");
      }
    });
  };

  // Socket Update function with REST API
  $scope.updatePlayers = function() {
    $scope.chaalAmt = {};
    if (!_.isEmpty($scope.tableId)) {
      Service.getOneTableDetails($scope.tableId, function(data) {
        // check whether dealer is selected or not
        $scope.communityCards = data.data.data.communityCards;
        $scope.table = data.data.data.table;
        $scope.gameType = $scope.table.gameType;
        $scope.currentRoundAmt = $scope.table.currentRoundAmt;
        if ($scope.table.pokerType == "Virtual") {
          $scope.showVideo = false;
        } else {
          $scope.showVideo = true;
          $scope.tableYoutube =
            "https://www.youtube.com/embed/" +
            $scope.table.youTubeUrl +
            "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&playsinline=1&autoplay=1&cc_load_policy=1&controls=0&;disablekb=1&;modestbranding=1&;fs=1&;rel=0&;autohide=1";
        }
        $scope.pots = data.data.data.pots;
        $scope.hasTurn = data.data.data.hasTurn;
        $scope.isCheck = data.data.data.isCheck;
        $scope.minimumBuyin = data.data.data.table.minimumBuyin;
        $scope.isCalled = data.data.isCalled;
        $scope.isChecked = data.data.isChecked;
        $scope.isRaised = data.data.isRaised;
        $scope.callAmount = data.data.data.callAmount;

        $scope.fromRaised = data.data.data.fromRaised;
        $scope.toRaised = data.data.data.toRaised;

        $scope.slider.value = $scope.minimumBuyin;
        $scope.slider.options.floor = $scope.minimumBuyin;
        $scope.slider.options.step = $scope.table.smallBlind;

        $scope.raiseSlider.value = $scope.fromRaised;
        $scope.raiseSlider.options.floor = $scope.fromRaised;
        $scope.raiseSlider.options.ceil = $scope.toRaised;
        $scope.bigBlindAmt = "";
        $scope.smallBlindAmt = "";
        if (data.data.data.pot) {
          $scope.potAmount = data.data.data.pot[0].totalAmount;
        }

        reArragePlayers(data.data.data.players);
        // console.log($scope.players);
        $scope.iAmThere($scope.players);
        console.log("ENTERRRR", $scope.players);

        $scope.activePlayer = _.filter($scope.players, function(player) {
          if (player && player.user._id == $scope._id) {
            return true;
          }
        });
        // if (!_.isEmpty($scope.activePlayer)) {
        //   console.log("reArragePlayers");
        // }
        $scope.isAllInPlayers = _.filter($scope.players, function(player) {
          if (
            (player && player.isAllIn) ||
            (player && player.isAllIn == false)
          ) {
            return true;
          }
        }).length;
        if (!$scope.sitHere) {
          if ($scope.activePlayer) {
            $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
          }
        }
        if (!_.isEmpty($scope.extra)) {
          if ($scope.extra.action == "raise" || $scope.extra.action == "call") {
            $scope.chaalAmt = $scope.extra;
          }
        }
        // console.log("$scope.activePlayerNo", $scope.activePlayerNo);
        $scope.sideShowDataFrom = 0;
        $scope.remainingActivePlayers = _.filter($scope.players, function(
          player
        ) {
          if (
            (player && player.isActive) ||
            (player && player.isActive == false)
          ) {
            return true;
          }
        }).length;

        $scope.remainingPlayerCount = _.filter($scope.players, function(
          player
        ) {
          if (player && player.isActive && !player.isFold) {
            return true;
          }
        }).length;

        if ($scope.remainingActivePlayers == 9) {
          $scope.message = {
            heading: "Table Full",
            content: "Try after sometime !!",
            error: true
          };
          $scope.showMessageModal();
        }

        $scope.remainingPlayerCount = _.filter($scope.players, function(
          player
        ) {
          if (player && player.isActive && !player.isFold) {
            return true;
          }
        }).length;

        $scope.remainingActiveTableLeftPlayers = _.filter(
          $scope.players,
          function(player) {
            if (player && player.isActive && !player.tableLeft) {
              return true;
            }
          }
        ).length;
        // $scope.changeTimer(data.data.data.table.autoFoldDelay);
      });

      // _.each($scope.players, function (player) {
      //   if (player) {
      //     _.each(data.data.table.currentRoundAmt, function (number) {
      //       var currentRoundAmount = data.data.table.currentRoundAmt
      //       var currentRound = _.findIndex(currentRoundAmount, function (currentRoundAmount) {
      //         // console.log(player);
      //         return currentRoundAmount._id == player._id;
      //       });
      //       if (currentRound >= 0) {
      //         // console.log("currentRound", currentRound);
      //         player.currentRoundAmt = {
      //           currentRoundAmt: currentRoundAmt.amount
      //         };
      //       }
      //     });
      //   }
      // });
    }
  };
  $scope.updatePlayers();

  // range slider

  // console.log($scope.minimumBuyin);

  // Update Socket Player
  updateSocketFunction = function(data, dontDigest) {
    console.log("updateSocketFunction", data);
    $scope.communityCards = data.data.communityCards;
    $scope.table = data.data.table;
    $scope.currentRoundAmt = $scope.table.currentRoundAmt;
    $scope.tableYoutube1 = $scope.table.youTubeUrl;
    $scope.gameType = $scope.table.gameType;
    $scope.extra = data.data.extra;
    $scope.pots = data.data.pots;
    $scope.hasTurn = data.data.hasTurn;
    $scope.isCalled = data.data.isCalled;
    $scope.isChecked = data.data.isChecked;
    $scope.isRaised = data.data.isRaised;
    $scope.fromRaised = data.data.fromRaised;
    $scope.toRaised = data.data.toRaised;
    $scope.callAmount = data.data.callAmount;
    $scope.slider.value = $scope.minimumBuyin;
    $scope.slider.options.floor = $scope.minimumBuyin;
    $scope.slider.options.step = $scope.table.smallBlind;

    $scope.raiseSlider.value = $scope.fromRaised;
    $scope.raiseSlider.options.floor = $scope.fromRaised;
    $scope.raiseSlider.options.ceil = $scope.toRaised;
    $scope.bigBlindAmt = "";
    $scope.smallBlindAmt = "";
    $scope.minimumBuyin = data.data.table.minimumBuyin;
    if (data.data.pots[0]) {
      $scope.potAmount = data.data.pots[0].totalAmount;
    }

    if ($scope.communityCards[0].serve) {
      $scope.chaalAmt = {};
    }
    $scope.activePlayer = _.filter($scope.players, function(player) {
      // console.log("activeplayer257", player);
      if (_.isEmpty(player)) {
      } else {
        if (player.isTurn && $.jStorage.get("socketId") == player.socketId) {
          $ionicPlatform.ready(function() {
            if (window.cordova) {
              window.plugins.NativeAudio.play("turn");
              navigator.vibrate(500);
            }
          });
        } else {
        }
      }
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    if ($scope.updateSocketVar == 0) {
      reArragePlayers(data.data.players);
    }
    // if (!_.isEmpty($scope.activePlayer)) {
    //   if ($scope.updateSocketVar == 0) {
    //     reArragePlayers(data.data.players);
    //   }
    // } else {
    //   $scope.players = data.data.players;
    // }

    if ($scope.activePlayer[0].playerNo) {
      $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
    }

    $scope.remainingActiveTableLeftPlayers = _.filter($scope.players, function(
      player
    ) {
      if (player && player.isActive && !player.tableLeft) {
        return true;
      }
    }).length;

    $scope.remainingActivePlayers = _.filter($scope.players, function(player) {
      if ((player && player.isActive) || (player && player.isActive == false)) {
        return true;
      }
    }).length;

    $scope.remainingPlayerCount = _.filter($scope.players, function(player) {
      if (player && player.isActive && !player.isFold) {
        return true;
      }
    }).length;

    $scope.isAllInPlayers = _.filter($scope.players, function(player) {
      if ((player && player.isAllIn) || (player && player.isAllIn == false)) {
        return true;
      }
    }).length;

    $scope.remainingPlayerCount = _.filter($scope.players, function(player) {
      if (player && player.isActive && !player.isFold) {
        return true;
      }
    }).length;
    //tip socket
    if ($scope.extra.action == "tip") {
      $scope.tipAmount = $scope.extra.amount;
      $scope.TipPlayerNo = $scope.extra.playerNo;

      //to reset tip and plyr no
      $timeout(function() {
        $scope.tipAmount = -1;
        $scope.TipPlayerNo = -1;
      }, 2000);
    }
    //Raise socket
    if ($scope.extra.action == "raise") {
      $scope.tipAmount = $scope.extra.amount;
      $scope.TipPlayerNo = $scope.extra.playerNo;

      //to reset raise and plyr no
      $timeout(function() {
        $scope.tipAmount = -1;
        $scope.TipPlayerNo = -1;
      }, 2000);
    }

    //Raise socket
    if ($scope.extra.action == "allIn") {
      $scope.tipAmount = $scope.extra.amount;
      $scope.TipPlayerNo = $scope.extra.playerNo;

      //to reset raise and plyr no
      $timeout(function() {
        $scope.tipAmount = -1;
        $scope.TipPlayerNo = -1;
      }, 2000);
    }

    if (!_.isEmpty($scope.extra)) {
      if (
        $scope.extra.action == "raise" ||
        $scope.extra.action == "call" ||
        $scope.extra.action == "allIn"
      ) {
        $scope.chaalAmt = $scope.extra;
      }
    }

    if ($scope.extra.action == "call") {
      $scope.tipAmount = $scope.extra.amount;
      $scope.TipPlayerNo = $scope.extra.playerNo;

      //to reset call and plyr no
      $timeout(function() {
        $scope.tipAmount = -1;
        $scope.TipPlayerNo = -1;
      }, 2000);
    }

    // remainingActivePlayers
    if ($scope.remainingActivePlayers == 9) {
      $scope.message = {
        heading: "Table Full",
        content: "Try after sometime !!",
        error: true
      };
      $scope.showMessageModal();
    }
    if (!dontDigest) {
      $scope.$apply();
    }

    // _.each($scope.players, function (player) {
    //   if (player) {
    //     _.each(data.data.table.currentRoundAmt, function (pot, number) {
    //       var currentRoundAmount = data.data.table.currentRoundAmt
    //       var currentRound = _.findIndex(currentRoundAmount, function (currentRoundAmount) {
    //         // console.log(player);
    //         return currentRoundAmount._id == player._id;
    //       });
    //       if (currentRound >= 0) {
    //         player.currentRoundAmt = {
    //           currentRoundAmt: currentRoundAmt.amount
    //         };
    //       }
    //     });
    //   };
    // });
    // console.log("$scope.currentRoundAmount", $scope.players);
  };

  function startSocketUpdate() {
    // io.socket.off("Update", updateSocketFunction);
    io.socket.on("Update", updateSocketFunction);
  }

  //Sitting There
  $scope.iAmThere = function(data) {
    $scope.isThere = false;
    // console.log(data);
    _.forEach(data, function(value) {
      if (value && value.user._id == $scope._id) {
        $scope.isThere = true;
        myTableNo = value.playerNo;
        startSocketUpdate();
        return false;
      }
    });
    // console.log($scope.isThere);
    $scope.sitHere = !$scope.isThere;
    // In Case he is already Sitting Please Enable the Game
  };

  //table info modal
  $ionicModal
    .fromTemplateUrl("templates/modal/game-price-range.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.gameModal = modal;
      // $scope.gameModal.show();
    });

  $scope.modalgame = function(sitNum) {
    $scope.chatActive = false;
    if (!_.isEmpty($scope.activePlayer)) {
      if (!$scope.activePlayer[0].tableLeft) {
        if (!$scope.sitHere) {
          $scope.message = {
            heading: "You are already been seated",
            content: "No need to sit again !!!"
          };
          $scope.showMessageModal();
          return;
        }
      }
    }
    // console.log($scope.playerData.balance);
    if ($scope.playerData.balance < $scope.slider.options.ceil) {
      $scope.slider.options.ceil = $scope.playerData.balance;
    }
    $scope.gameModal.show();
    $scope.sitNo = sitNum;
  };
  $scope.autoBuygame = function(autoBuy) {
    if ($scope.playerData.balance < $scope.slider.options.ceil) {
      $scope.slider.options.ceil = $scope.playerData.balance;
    }
    $scope.autoBuy = autoBuy;
    $scope.gameModal.show();
  };
  $scope.closeGameModal = function() {
    $scope.gameModal.hide();
  };
  $scope.reBuyFunction = function(data) {
    // console.log(data);
    $scope.dataPlayer = {};
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.amount = data.value;
    if ($scope.dataPlayer.amount < $scope.minimumBuyin) {
      $scope.message = {
        heading: "Insufficent Balance",
        content:
          "Min Buy In for this table is " +
          $scope.minimumBuyin +
          "<br/> Try Again!"
      };
      $scope.showMessageModal();
    }
    if ($scope.dataPlayer.amount > $scope.slider.options.ceil) {
      $scope.message = {
        heading: "You are exceded max balance",
        content:
          "Min Buy In for this table is " +
          $scope.slider.options.ceil +
          "<br/> Try Again!"
      };
      $scope.showMessageModal();
    }
    if ($scope.playerData.balance < $scope.slider.options.ceil) {
      $scope.slider.options.ceil = $scope.playerData.balance;
    }
    if ($scope.dataPlayer.amount <= $scope.playerData.balance) {
      if (
        $scope.dataPlayer.amount >= $scope.minimumBuyin &&
        $scope.dataPlayer.amount <= $scope.slider.options.ceil
      ) {
        Service.getReFillBuyIn($scope.dataPlayer, function(data) {
          // console.log(data);
        });
      }
    }
  };

  $scope.auto = {
    isAutoBuy: false,
    payBigBlind: false
  };
  //sit Here Function
  //player sitting
  $scope.sitHereFunction = function(sliderData, data) {
    console.log("data auto", $scope.activePlayer, sliderData, data);
    if (!_.isEmpty($scope.activePlayer[0])) {
      if (!$scope.activePlayer[0].tableLeft) {
        if (!$scope.sitHere) {
          return;
        }
      }
    }
    // console.log("data auto", data);
    $scope.ShowLoader = true;
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = $scope.sitNo;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.amount = sliderData.value;
    $scope.dataPlayer.autoRebuy = data.isAutoBuy;
    $scope.dataPlayer.payBigBlind = data.payBigBlind;
    $timeout(function() {
      if ($scope.ShowLoader) {
        $scope.ShowLoader = false;
        $scope.updatePlayers();
      }
    }, 5000);
    if ($scope.dataPlayer.amount >= $scope.playerData.balance) {
      $scope.message = {
        heading: "Insufficent Balance",
        content:
          "Min Buy In for this table is " +
          $scope.minimumBuyin +
          "<br/> Try Again!"
      };
      $scope.showMessageModal();
      $state.go("lobby");
    }
    if ($scope.dataPlayer.amount <= $scope.playerData.balance) {
      // console.log("savePlayerToTable inside");
      if (!_.isEmpty($scope.dataPlayer.tableId)) {
        if (
          $scope.dataPlayer.amount >= $scope.minimumBuyin &&
          $scope.dataPlayer.amount <= $scope.slider.options.ceil
        ) {
          // console.log("inside save Player");
          Service.savePlayerToTable($scope.dataPlayer, function(data) {
            console.log("savePlayerToTable", data);
            $scope.ShowLoader = false;
            if (data.data.value) {
              $scope.sitHere = false;
              myTableNo = data.data.data.playerNo;
              $scope.activePlayerNo = data.data.data.playerNo;
              $scope.updatePlayers();
              console.log("ENTERRRR", $scope.players);
              startSocketUpdate();
            } else {
              if (data.data.error == "Player Already Added") {
                $scope.message = {
                  heading: "Player Already Added",
                  content: "Player Already Added"
                };
                $scope.showMessageModal();
              } else if (data.data.error == "Insufficient Balance") {
                $scope.message = {
                  heading: "Insufficient Funds",
                  content: "Minimum amount required to enter this table",
                  error: true
                };
                $scope.showMessageModal();
              }
            }
          });
        } else if ($scope.dataPlayer.amount < $scope.minimumBuyin) {
          // console.log("inside not save Player");
          $scope.message = {
            heading: "Insufficent Balance",
            content:
              "Min Buy In for this table is " +
              $scope.minimumBuyin +
              "<br/> Try Again!"
          };
          $scope.showMessageModal();
        } else if ($scope.dataPlayer.amount > $scope.slider.options.ceil) {
          // console.log("inside not save Player");
          $scope.message = {
            heading: "You are exceded max balance",
            content:
              "Min Buy In for this table is " +
              $scope.slider.options.ceil +
              "<br/> Try Again!"
          };
          $scope.showMessageModal();
        }
      }
    }
  };

  $scope.openPlayerDetails = function() {
    if (!$scope.sitHere) {
      $scope.playerDetails.show();
    }
  };
  //Tip Dealer
  $scope.makeTipFunction = function(amount) {
    Service.makeTip(amount, $scope.tableId, function(data) {});
  };

  //Game History
  $scope.getHistory = function() {
    Service.getHistory($scope.tableId, function(data) {
      $scope.showHistory = data.data.data;
      // console.log("getMeHistory", $scope.showHistory);
    });
  };
  // Turn Actions
  $scope.allIn = function() {
    $scope.allInPromise = Service.allIn($scope.tableId, function(data) {});
  };
  $scope.fold = function() {
    $scope.foldPromise = Service.fold($scope.tableId, function(data) {});
  };
  $scope.raise = function(raiseAmount) {
    $scope.raisePromise = Service.raise($scope.tableId, raiseAmount, function(
      data
    ) {});
  };
  $scope.move = function() {
    $scope.movePromise = Service.move($scope.tableId, function(data) {});
  };
  $scope.call = function() {
    $scope.callPromise = Service.call($scope.tableId, function(data) {});
  };

  //check
  $scope.check = function() {
    $scope.checkPromise = Service.check($scope.tableId, function(data) {});
  };

  //random card serve
  $scope.randomCard = function() {
    $scope.raisePromise = Service.randomCard($scope.tableId, function(data) {});
  };

  //winner
  function showWinnerFunction(data) {
    $scope.chaalAmt = {};
    console.log("show winner", data);
    reArragePlayers(data.data.players);
    $scope.winnerData = data.data.pots;
    _.each($scope.players, function(player) {
      if (player) {
        player.isTurn = false;
        player.isWinner = true;
        player.winnerDetails = [];
        _.each(data.data.pots, function(pot, number) {
          var winners = _.filter(pot.winner, function(potPlayer) {
            return potPlayer.winner;
          });
          console.log("winner inside", winners);
          var isThisPlayerWinner = _.findIndex(winners, function(winner) {
            // console.log(player);
            return winner.playerId == player._id;
          });
          if (isThisPlayerWinner >= 0) {
            console.log("isThisPlayerWinner", isThisPlayerWinner);
            player.winnerDetails.push({
              potMainName: pot.name,
              potName: winners[isThisPlayerWinner].winName,
              amount: pot.totalAmount,
              winnercard: winners[isThisPlayerWinner].winnigCards
            });
          }
        });
      }
      $scope.$apply();
    });
    console.log("inside Winner", $scope.players);
    $scope.activePlayer = _.filter($scope.players, function(player) {
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    // if (!_.isEmpty($scope.activePlayer)) {
    //   reArragePlayers($scope.players);
    //   console.log("reArragePlayers");
    // }
  }
  io.socket.on("showWinner", showWinnerFunction);

  seatSelectionFunction = function(data) {
    console.log("seatSelectionFunction", data);
    $scope.communityCards = data.data.communityCards;
    $scope.table = data.data.table;
    $scope.gameType = $scope.table.gameType;
    $scope.currentRoundAmt = $scope.table.currentRoundAmt;
    // $scope.tableYoutube = "https://www.youtube.com/embed/" + $scope.table.youTubeUrl + "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&autoplay=1&cc_load_policy=1&controls=0&disablekb=1&modestbranding=1";
    $scope.extra = data.data.extra;
    $scope.pots = data.data.pots;
    $scope.hasTurn = data.data.hasTurn;
    $scope.isCalled = data.data.isCalled;
    $scope.isChecked = data.data.isChecked;
    $scope.isRaised = data.data.isRaised;

    $scope.activePlayer = _.filter($scope.players, function(player) {
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    if ($scope.updateSocketVar == 0) {
      console.log("seat selection", $scope.activePlayer);
      reArragePlayers(data.data.players);
    }
    // if (!_.isEmpty($scope.activePlayer)) {
    //   if ($scope.updateSocketVar == 0) {
    //     console.log("seat selection", $scope.activePlayer);
    //     reArragePlayers(data.data.players);
    //   }
    // } else {
    //   console.log("seat");

    //   $scope.players = data.data.players;
    // }

    if (!$scope.sitHere) {
      if ($scope.activePlayer[0]) {
        $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
      }
    }
    $scope.remainingActiveTableLeftPlayers = _.filter($scope.players, function(
      player
    ) {
      if (player && player.isActive && !player.tableLeft) {
        return true;
      }
    }).length;
    $scope.$apply();
  };

  io.socket.on("seatSelection" + $scope.tableId, seatSelectionFunction);

  removePlayerFunction = function(data) {
    console.log("removePlayerFunction", data);
    $scope.communityCards = data.data.communityCards;
    $scope.table = data.data.table;
    $scope.gameType = $scope.table.gameType;
    // $scope.tableYoutube = "https://www.youtube.com/embed/" + $scope.table.youTubeUrl + "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&autoplay=1&cc_load_policy=1&controls=0&disablekb=1&modestbranding=1";
    $scope.extra = data.data.extra;
    $scope.pots = data.data.pots;
    $scope.hasTurn = data.data.hasTurn;
    $scope.isCalled = data.data.isCalled;
    $scope.isChecked = data.data.isChecked;
    $scope.isRaised = data.data.isRaised;
    $scope.callAmount = data.data.callAmount;
    $scope.bigBlindAmt = "";
    $scope.smallBlindAmt = "";

    $scope.activePlayer = _.filter($scope.players, function(player) {
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    if ($scope.updateSocketVar == 0) {
      reArragePlayers(data.data.players);
    }
    // if (!_.isEmpty($scope.activePlayer)) {
    //   if ($scope.updateSocketVar == 0) {
    //     reArragePlayers(data.data.players);
    //   }
    //   console.log("reArragePlayers");
    // } else {
    //   console.log("reArrag");
    //   $scope.players = data.data.players;
    // }
    $scope.remainingActiveTableLeftPlayers = _.filter($scope.players, function(
      player
    ) {
      if (player && player.isActive && !player.tableLeft) {
        return true;
      }
    }).length;
    $scope.$apply();
  };

  io.socket.on("removePlayer" + $scope.tableId, removePlayerFunction);

  // $ionicModal.fromTemplateUrl('templates/modal/remove-player.html.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function (modal) {
  //   $scope.gameRemovePlayerModal = modal;
  //   // $scope.gameModal.show();
  // });

  $ionicModal
    .fromTemplateUrl("templates/modal/remove-player.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.gameRemovePlayerModal = modal;
    });

  $scope.openRemovePlayerModal = function(autoBuy) {
    $scope.gameRemovePlayerModal.show();
  };
  $scope.closeRemovePlayerModal = function() {
    $scope.gameRemovePlayerModal.hide();
  };

  //remove player function
  $scope.removePlayers = function() {
    $scope.ShowLoader = true;
    Service.removePlayer($scope.tableId, $scope.activePlayerNo, function(data) {
      if (data) {
        $scope.ShowLoader = false;
        $scope.closeGameModal();
        $scope.closeRemovePlayerModal();

        $state.go("lobby");
      }
    });
  };
  $scope.removePlayersAndStay = function() {
    $scope.ShowLoader = true;
    Service.removePlayer($scope.tableId, $scope.activePlayerNo, function(data) {
      if (data) {
        $scope.ShowLoader = false;
        $state.reload();
        $scope.closeGameModal();
        $scope.closeRemovePlayerModal();
      }
    });
  };

  newGameSocketFunction = function(data) {
    console.log("NewGame", data);
    $scope.chaalAmt = {};
    $scope.communityCards = data.data.communityCards;
    $scope.playersChunk = data.data.players;
    $scope.table = data.data.table;
    $scope.gameType = $scope.table.gameType;
    $scope.extra = data.extra;
    $scope.hasTurn = data.hasTurn;
    $scope.isCheck = data.isCheck;
    $scope.pots = data.data.pots;
    $scope.bigBlindAmt = data.data.table.bigBlind;
    $scope.smallBlindAmt = data.data.table.smallBlind;
    $scope.tableYoutube2 = $scope.table.youTubeUrl;
    $scope.callAmount = data.data.callAmount;

    if ($scope.tableYoutube1 != $scope.tableYoutube2) {
      console.log("indside URL");
      $scope.tableYoutube =
        "https://www.youtube.com/embed/" +
        $scope.tableYoutube2 +
        "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&autoplay=1&cc_load_policy=1&controls=0&disablekb=1&modestbranding=1";
    }

    $scope.activePlayer = _.filter($scope.players, function(player) {
      if (player && player.user._id == $scope._id) {
        return true;
      }
    });
    if ($scope.updateSocketVar == 0) {
      reArragePlayers(data.data.players);
    }
    if (!$scope.sitHere) {
      if (
        $scope.activePlayer[0].buyInAmt - $scope.activePlayer[0].totalAmount <
        $scope.table.bigBlind
      ) {
        console.log("EnterRRRRRRRRRR INTO TAKE", $scope.table);
        if ($scope.table.pokerType == "Virtual") {
          $scope.removePlayersAndStay();
          $scope.closeGameModal();
        } else {
          var autoBuy;
          autoBuy = true;
          $scope.autoBuygame(autoBuy);
          if ($scope.activePlayer[0].buyInAmt < 0) {
            $scope.removePlayers();
            $scope.closeGameModal();
            $state.go("lobby");
          }
        }
      }
    }
    $scope.$apply();
  };

  io.socket.on("newGame", newGameSocketFunction);
  // New Game
  $scope.newGame = function() {
    Service.newGame($scope.tableId, function(data) {});
  };

  $ionicModal
    .fromTemplateUrl("templates/modal/table-range-slider.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(rangeModal) {
      $scope.rangeModal = rangeModal;
    });
  $scope.modalrange = function() {
    $scope.rangeModal.show();
  };
  $scope.closeRangeModal = function() {
    $scope.rangeModal.hide();
  };

  //left menu
  $scope.openLeftMenu = function() {
    $scope.leftMenu = true;
  };

  $scope.closeAll = function() {
    $scope.rightMenu = false;
    $scope.leftMenu = false;
    $scope.activeVariation = false;
  };

  $scope.closeAll();

  /**To open chat box */

  $ionicModal
    .fromTemplateUrl("templates/modal/chat-box.html", {
      scope: $scope,
      animation: "slide-in-right"
    })
    .then(function(modal) {
      $scope.openChatModal = modal;
    });

  $scope.openChatBox = function() {
    $scope.openChatModal.show();
    $scope.chatActive = true;
    $scope.message = {
      heading: "Chat",
      content: "",
      error: true
    };
  };
  $scope.closeChatBox = function() {
    $scope.openChatModal.hide();
    $scope.chatActive = false;
  };

  /**table info */

  $ionicPopover
    .fromTemplateUrl("templates/modal/table_info.html", {
      scope: $scope
    })
    .then(function(popover) {
      $scope.popover = popover;
    });

  $scope.openTableInfoModal = function($event) {
    $scope.popover.show($event);
  };
  $scope.closeTableInfoModal = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on("$destroy", function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on("popover.hidden", function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on("popover.removed", function() {
    // Execute action
  });
});
