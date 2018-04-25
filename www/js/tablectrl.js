var newGameSocketFunction;
var updateSocketFunction;
var showWinnerFunction;
var sideShowSocket;
var myTableNo = 0;

myApp.controller('TableCtrl', function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams, $timeout, $interval) {

  $scope.tableId = $stateParams.id;
  //Basic ui login
  $.jStorage.set("tableId", $scope.tableId);


  $scope.verticalSlider = {};
  //range slider
  $scope.slider = {
    value: 100,
    options: {
      floor: 10,
      ceil: 150000
    },
  };

    //range slider
    $scope.raiseSlider = {
      value: 100,
      options: {
        floor: 10,
        ceil: 150000
      },
    };

  $scope._id= $.jStorage.get("_id");
  $scope.playerDataFunction = function () {
    Service.getProfile(function (data) {
      if (data && data.data && data.data.data) {
        $scope.playerData = data.data.data;
        $scope.playerDataId = data.data.data._id;
      } else {
        $state.go("login");
      }
    });
  };

  $scope.playerDataFunction();

  //Message Ui
  $ionicModal.fromTemplateUrl('templates/modal/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
    // $scope.showMessageModal();

  });

  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 3000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };



  // Game Play functions
  $scope.botAmount = 0;
  $scope.PotAmount = 0;
  $scope.startAnimation = false;
  $scope.insufficientFunds = false;
  $scope.chaalAmt = 0;
  $scope.startCoinAnime = false;
  $scope.winnerPlayerNo = -1;
  $scope.showNewGameTime = false;
  $scope.tipAmount = -1;
  $scope.TipPlayerNo = -1;
  $scope.tableMessageShow = false;
  $scope.tableMessage = "";
  $scope.runVibratorFlag = true;
  $scope.updateSocketVar = 0;
  $scope.changeTableMessage = function (message) {
    $scope.tableMessageShow = true;
    $scope.tableMessage = message;
    $scope.$apply();
    $timeout(function () {
      $scope.tableMessageShow = false;
    }, 5000);

  };

  function reArragePlayers(playersData) {
    var diff = myTableNo - 1;
    var players = _.times(9, function (n) {
      var playerReturn = _.find(playersData, function (singlePlayer) {
        if (singlePlayer) {
          var checkNo = (singlePlayer.playerNo);
          if ((n + 1) == checkNo) {
            return singlePlayer;
          } else {
            return null;
          }
        }

      });
      return _.cloneDeep(playerReturn);
    });
    $scope.players = players;
    console.log("rearr", $scope.players);
  }

  //sound initialize
  $scope.destroyAudio = function () {
    $ionicPlatform.ready(function () {
      if (window.cordova) {
        // running on device/emulator
        window.plugins.NativeAudio.stop('timer');
        window.plugins.NativeAudio.stop('coin');
        window.plugins.NativeAudio.stop('winner');
        window.plugins.NativeAudio.stop('shuffle');
        window.plugins.NativeAudio.stop('button');
      }
    });
  }

  // Socket Update function with REST API
  $scope.updatePlayers = function () {
    if (!_.isEmpty($scope.tableId)) {
      Service.getOneTableDetails($scope.tableId, function (data) {
        console.log("getOneTableDetails", data.data.data);
        // check whether dealer is selected or not
        $scope.communityCards = data.data.data.communityCards;
        $scope.table = data.data.data.table;
        $scope.hasTurn = data.data.data.hasTurn;
        $scope.isCheck = data.data.data.isCheck;
        $scope.minimumBuyin = data.data.data.table.minimumBuyin;
        $scope.isCalled = data.data.isCalled;
        $scope.isCheck = data.data.isChecked;
        $scope.isRaised = data.data.isRaised;

        $scope.fromRaised = data.data.data.fromRaised;
        $scope.fromRaised = data.data.data.toRaised;
    
        $scope.slider.value = $scope.minimumBuyin;
        $scope.slider.options.floor = $scope.minimumBuyin;
    
        $scope.raiseSlider.value = $scope.fromRaised;
        $scope.raiseSlider.options.floor = $scope.fromRaised;
        $scope.raiseSlider.options.ceil = $scope.toRaised;

        if (data.data.data.pot) {
          $scope.potAmount = data.data.data.pot[0].totalAmount;
        }
        $scope.slider.value = $scope.minimumBuyin;
        $scope.slider.options.floor = $scope.minimumBuyin;
        reArragePlayers(data.data.data.players);
       console.log($scope.players);
        $scope.iAmThere($scope.players);
        $scope.activePlayer = _.filter($scope.players, function (player) {
          if (player && (player.user._id == $scope._id)) {
            return true;
          }
        });
        console.log("$scope.activePlayer",$scope.activePlayer);
        $scope.sideShowDataFrom = 0;
        $scope.remainingActivePlayers = _.filter($scope.players, function (player) {
          if ((player && player.isActive) || (player && player.isActive == false)) {
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

        $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
          if (player && player.isActive && !player.isFold) {
            return true;
          }
        }).length;
        // $scope.changeTimer(data.data.data.table.autoFoldDelay);
      });
    }
  };
  $scope.updatePlayers();

  // range slider



  // console.log($scope.minimumBuyin);

  // Update Socket Player
  updateSocketFunction = function (data,dontDigest) {
    console.log("updateSocketFunction",data);
    $scope.communityCards = data.data.communityCards;
    $scope.table = data.data.table;
    $scope.extra = data.data.extra;
    $scope.pots = data.data.pots;
    $scope.hasTurn = data.data.hasTurn;
    $scope.isCalled = data.data.isCalled;
    $scope.isCheck = data.data.isChecked;
    $scope.isRaised = data.data.isRaised;
    $scope.fromRaised = data.data.fromRaised;
    $scope.toRaised = data.data.toRaised;
  

    $scope.slider.value = $scope.minimumBuyin;
    $scope.slider.options.floor = $scope.minimumBuyin;

    $scope.raiseSlider.value = $scope.fromRaised;
    $scope.raiseSlider.options.floor = $scope.fromRaised;
    $scope.raiseSlider.options.ceil = $scope.toRaised;


    console.log($scope.raiseSlider.value,"$scope.raiseSlider.value");
    console.log($scope.raiseSlider.options.floor,"$scope.raiseSlider.options.floor");
    console.log($scope.raiseSlider.options.ceil,"$scope.raiseSlider.options.ceil");
    $scope.minimumBuyin = data.data.table.minimumBuyin;
    if (data.data.pots[0]) {
      $scope.potAmount = data.data.pots[0].totalAmount;
    }
    if ($scope.updateSocketVar == 0) {
      reArragePlayers(data.data.players);
    }
    console.log($scope.players);
    $scope.activePlayer = _.filter($scope.players, function (player) {
      if (player && (player.user._id == $scope._id)) {
        return true;
      }
    });
    console.log("$scope.activePlayer",$scope.activePlayer);
    $scope.remainingActivePlayers = _.filter($scope.players, function (player) {
      if ((player && player.isActive) || (player && player.isActive == false)) {
        return true;
      }
    }).length;
    $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
      if (player && player.isActive && !player.isFold) {
        return true;
      }
    }).length;
    console.log($scope.remainingPlayerCount);
    // $scope.$apply();
    if ($scope.remainingActivePlayers == 9) {
      $scope.message = {
        heading: "Table Full",
        content: "Try after sometime !!",
        error: true
      };
      $scope.showMessageModal();
    };
    if (!dontDigest) {
      $scope.$apply();
    }

  };

  function startSocketUpdate() {
    io.socket.off("Update", updateSocketFunction);
    io.socket.on("Update", updateSocketFunction);
  }

  //Sitting There
    $scope.iAmThere = function (data) {
      $scope.isThere = false;
      console.log($scope._id);
      _.forEach(data, function (value) {

        if (value && value.user._id == $scope._id) {
          $scope.isThere = true;
          myTableNo = value.playerNo;
          startSocketUpdate();
          return false;
        }
      });
      console.log($scope.isThere);
      $scope.sitHere = !$scope.isThere;
      // In Case he is already Sitting Please Enable the Game
    };


  //table info modal
  $ionicModal.fromTemplateUrl('templates/modal/game-price-range.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.gameModal = modal;
    // $scope.gameModal.show();
  });

  $scope.modalgame = function (sitNum) {
    console.log(sitNum);
    $scope.gameModal.show();
    $scope.sitNo = sitNum;
  };

  $scope.closeGameModal = function () {
    $scope.gameModal.hide();
  };

  //sit Here Function
  //player sitting
  $scope.sitHereFunction = function (amount) {
    if (!$scope.sitHere) {
      return;
    }
    $scope.ShowLoader = true;
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = $scope.sitNo;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.amount = amount;

    $timeout(function () {
      if ($scope.ShowLoader) {
        $scope.ShowLoader = false;
        $scope.updatePlayers();
      }
    }, 5000);
    if ($scope.dataPlayer.amount >= $scope.playerData.balance) {
      console.log("inside not save Player");
      $scope.message = {
        heading: "Insufficent Balance",
        content: "Min Buy In for this table is " + $scope.minimumBuyin + "<br/> Try Again!"
      };
      $scope.showMessageModal();
      $state.go('lobby');
    };
    if (!_.isEmpty($scope.dataPlayer.tableId)) {
      if ($scope.dataPlayer.amount >= $scope.minimumBuyin) {
        console.log("inside save Player");
        Service.savePlayerToTable($scope.dataPlayer, function (data) {
          $scope.ShowLoader = false;
          if (data.data.value) {
            $scope.sitHere = false;
            myTableNo = data.data.data.playerNo;
            $scope.activePlayerNo = data.data.data.playerNo;
            $scope.updatePlayers();
            startSocketUpdate();
          } else {
            if (data.data.error == "Player Already Added") {
              $scope.message = {
                heading: "Player Already Added",
                content: "Player Already Added"
              };
              $scope.showMessageModal();

            } else if (data.data.error == "Insufficient Balance") {
              // $scope.showInsufficientFundsModal();
              $scope.message = {
                heading: "Insufficient Funds",
                content: "Minimum amount required to enter this table is <span class='balance-error'> " + ($scope.chalAmt * 10) + "</span>",
                error: true
              };
              $scope.showMessageModal();
            }
          }
        });
      } else {
        console.log("inside not save Player");
        $scope.message = {
          heading: "Insufficent Balance",
          content: "Min Buy In for this table is " + $scope.minimumBuyin + "<br/> Try Again!"
        };
        $scope.showMessageModal();
      }
    }
  };
  $scope.openPlayerDetails = function () {
    if (!$scope.sitHere) {
      $scope.playerDetails.show();
    }
  };
  $scope.removePlayer = function () {
    Service.removePlayer($scope.tableId, $scope.activePlayerNo, function (data) {
      $state.go('lobby');
    });
  };
  // Turn Actions
  $scope.allIn = function () {
    Service.allIn(function (data) { });
  };
  $scope.fold = function () {
    Service.fold($scope.tableId, function (data) { });
  };
  $scope.raise = function (raiseAmount) {
    Service.raise($scope.tableId,raiseAmount, function (data) { });
  };
  $scope.move = function () {
    Service.move($scope.tableId, function (data) { });
  };
  $scope.call = function () {
    Service.call($scope.tableId, function (data) { });
  };
  $scope.check = function () {
    Service.check($scope.tableId, function (data) { });
  };

  //random card serve
  $scope.randomCard = function () {
    Service.randomCard($scope.tableId, function (data) { });
  };

  //check player from table
  $scope.check = function () {
    Service.check($scope.tableId, function (data) { });
  };


  //withdraw Coins
  $scope.withdrawCoins = function (data) {
    Service.withdrawCoins(data, function (data) { });
  };
  //buy Coins
  $scope.buyCoins = function (data) {
    console.log(data);
    Service.buyCoins(data, function (data) { });
  };

  //tip socket
  io.socket.on("tip", function (data) {
    $scope.tipAmount = data.data.amount;
    $scope.TipPlayerNo = data.data.playerNo;

    //to reset tip and plyr no
    $timeout(function () {
      $scope.tipAmount = -1;
      $scope.TipPlayerNo = -1;
    }, 2000);

  });
  $scope.makeTip = function (data) {
    // $scope.coinAudio.play();
    // $ionicPlatform.ready(function () {
    //   if (window.cordova) {
    //     window.plugins.NativeAudio.play('coin');
    //   }
    // })

    $scope.amount = {};
    $scope.amount = data;
    Service.giveTip($scope.amount, function (data) { });
  };
  //winner
  function showWinnerFunction(data) {
    console.log("show winner",data);
    $scope.updateSocketVar = 1;

    $scope.showWinnerMainPot = data.data.pots[0].winner;
   

 
    $scope.showNewGameTime = true;

    if(data.data.pots[0]){
      $scope.winnerMainPot = _.find($scope.showWinnerMainPot, {
        'winRank': 1,
        'winner': true
      });
    };
    
    if(data.data.pots[1]){
      $scope.showWinnerSidePotOne = data.data.pots[1].winner;
      $scope.winnerSidePotOne = _.find($scope.showWinnerSidePotOne, {
        'winRank': 1,
        'winner': true
      });
    };

    if(data.data.pots[2]){
      $scope.showWinnerSidePotTwo = data.data.pots[2].winner;
      $scope.winnerSidePotTwo = _.find($scope.showWinnerSidePotTwo, {
        'winRank': 1,
        'winner': true
      });
    };

    if(data.data.pots[3]){
      $scope.showWinnerSidePotThree = data.data.pots[3].winner;
      $scope.winnerSidePotThree = _.find($scope.showWinnerSidePotThree, {
        'winRank': 1,
        'winner': true
      });
    };
 

    // _.forEach($scope.showWinnerPlayer,
    //   function (p) {
    //     var playerNo = -1;
    //     playerNo = _.findIndex($scope.players, function (pl) {
    //       if (pl) {
    //         return pl.playerNo == p.playerNo;
    //       }
    //     });
    //     if (playerNo >= 0) {
    //       $scope.players[playerNo] = p;
    //       reArragePlayers($scope.players);
    //     }
    //   });

    // if ($scope.winner && $scope.winner.playerNo) {
    //   $scope.winnerPlayerNo = $scope.winner.playerNo;
    // }
    // console.log($scope.winner);
    // $scope.changeTableMessage($scope.winner.name + " won the game");
  }

  //showWinner
  $scope.showWinner = function () {
    if (!_.isEmpty($scope.tableId)) {
      $scope.showWinnerPromise = Service.showWinner($scope.tableId, function (data) { });
    }
  };


  io.socket.on("showWinner", showWinnerFunction);
  io.socket.off("showWinner", function (data) {
    $scope.message = {
      heading: "Internet Connection",
      content: "Check Your Internet Connection",
      error: true
    };
    $scope.showMessageModal();
  });

  newGameSocketFunction = function (data) {
    $scope.communityCards = data.data.communityCards;
    $scope.playersChunk = data.data.players;
    $scope.table = data.data.table;
    $scope.extra = data.extra;
    $scope.hasTurn = data.hasTurn;
    $scope.isCheck = data.isCheck;
    $scope.pots = data.data.pots;
    $scope.$apply();
  };

  $ionicModal.fromTemplateUrl('templates/modal/table-range-slider.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (rangeModal) {
    $scope.rangeModal = rangeModal;
  });
  $scope.modalrange = function () {
    $scope.rangeModal.show();
  };
  $scope.closeRangeModal = function () {
    $scope.rangeModal.hide();
  };


  //left menu
  $scope.openLeftMenu = function () {
    $scope.leftMenu = true;
  }

  $scope.closeAll = function () {
    $scope.rightMenu = false;
    $scope.leftMenu = false;
    $scope.activeVariation = false;
  }

  $scope.closeAll();
});
