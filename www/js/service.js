myApp = angular.module("starter.service", []);
var url = adminUUU + "/api/";
// var imgurl = url + "upload/";
// var imgpath = imgurl + "readFile";
var maxRow = 10;
myApp.factory("Service", function(
  $http,
  $ionicLoading,
  $ionicActionSheet,
  $timeout,
  $state
) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  io.socket.on("connect", function(socket) {
    socketId = io.socket._raw.id;
    $.jStorage.set("socketId", io.socket._raw.id);
    obj.connectSocket(function() {});
  });

  var obj = {
    all: function() {
      return chats;
    },
    getNavigation: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    removeAccessToken: function(data, callback) {
      $.jStorage.flush();
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },

    playerLogin: function(data, callback) {
      return $http.post(url + "User/login", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    verifyOtp: function(data, callback) {
      return $http.post(url + "User/verifyOtp", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    resendOtp: function(data, callback) {
      return $http.post(url + "User/resendOtp", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    forgetPassword: function(data, callback) {
      return $http.post(url + "User/forgetPassword", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    verifyOtpForForgetPassword: function(data, callback) {
      return $http
        .post(url + "User/verifyOtpForForgetPassword", data)
        .then(function(data) {
          data = data.data;
          callback(data);
        });
    },
    setForgetPassword: function(data, callback) {
      return $http
        .post(url + "User/setForgetPassword", data)
        .then(function(data) {
          data = data.data;
          callback(data);
        });
    },
    signUp: function(data, callback) {
      // console.log(data, "signup");
      return $http.post(url + "User/signUp", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    changePassword: function(data, callback) {
      return $http.post(url + "User/changePassword", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    saveUser: function(data, callback) {
      console.log(data);
      return $http.post(url + "User/updateUser", data).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    getProfile: function(callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http
          .post(url + "User/profile", {
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      } else {
        $state.go("login");
      }
    },
    getEarningPoint: function(callback) {
      $http.post(url + "EarningPoint/earningPoint").then(function(data) {
        callback(data);
      });
    },

    buyCoins: function(coins, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/buyCoins", {
            coins: coins,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    withdrawCoins: function(coins, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/withdrawCoins", {
            coins: coins,
            accessToken: accessToken
          })
          .then(function(data) {
            console.log(data);
            callback(data);
          });
      }
    },
    getTableDetails: function(data, callback) {
      return $http
        .post(url + "Table/getTableDetails", data)
        .then(function(data) {
          data = data.data;
          callback(data);
        });
    },
    getTableAndPlayerCount: function(callback) {
      return $http
        .post(url + "Table/getTableAndPlayerCount")
        .then(function(data) {
          data = data.data;
          callback(data);
        });
    },
    getAccessToTable: function(data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Table/getAccessToTable", {
            tableId: data.tableId,
            password: data.password
          })
          .then(function(data) {
            callback(data);
          });
      }
    },

    getOneTableDetails: function(id, callback) {
      return $http
        .post(url + "Player/getAllDetails", {
          tableId: id
        })
        .then(function(data) {
          callback(data);
        });
    },
    savePlayerToTable: function(dataPlayer, callback) {
      console.log("dataPlayer", dataPlayer);
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http
          .post(url + "Table/addUserToTable", {
            playerNo: dataPlayer.playerNo,
            tableId: dataPlayer.tableId,
            amount: dataPlayer.amount,
            autoRebuy: dataPlayer.autoRebuy,
            payBigBlind: dataPlayer.payBigBlind,
            socketId: socketId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    getHistory: function(tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http
          .post(url + "Table/tableHistory", {
            tableId: tableId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    connectSocket: function(callback) {
      var accessToken = $.jStorage.get("accessToken");
      var tableId = $.jStorage.get("tableId");
      if (!_.isEmpty(accessToken) && tableId) {
        callApi();
      } else {
        $timeout(function() {
          callApi();
        }, 2000);
      }

      function callApi() {
        var accessToken = $.jStorage.get("accessToken");
        if (!_.isEmpty(accessToken)) {
          $http
            .post(url + "Player/updateSocket", {
              accessToken: accessToken,
              socketId: socketId
            })
            .then(function(data) {
              callback(data);
            });
        }
      }
    },

    getReFillBuyIn: function(data, callback) {
      console.log("autobuyin", data);
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/reFillBuyIn", {
            accessToken: accessToken,
            tableId: data.tableId,
            amount: data.amount
          })
          .then(function(data) {
            callback(data);
          });
      }
    },

    getVoucher: function(data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/useVoucher", {
            accessToken: accessToken,
            voucherCode: data.code
          })
          .then(function(data) {
            callback(data);
          });
      }
    },

    raise: function(tableId, raiseAmount, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/raise", {
            tableId: tableId,
            accessToken: accessToken,
            amount: raiseAmount
          })
          .then(function(data) {
            callback(data);
          });
      }
    },

    fold: function(tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/fold", {
            tableId: tableId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    allIn: function(tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/allIn", {
            tableId: tableId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    check: function(tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/check", {
            tableId: tableId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    call: function(tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Player/call", {
            tableId: tableId,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    },
    randomCard: function(tableId) {
      var cardValue = cards[_.random(0, cards.length - 3)].name;
      $http
        .post(url + "Player/serve", {
          tableId: tableId,
          card: cardValue
        })
        .then(function(data) {
          console.log(data.data);
        });
    },
    removePlayer: function(tableId, playerNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http
          .post(url + "Table/removePlayer", {
            tableId: tableId,
            playerNo: playerNo,
            accessToken: accessToken
          })
          .then(function(data) {
            console.log(data.data);
            callback(data);
          });
      }
    },
    newGame: function(tableId, callback) {
      var isDealer = "true";
      $http
        .post(url + "Player/newGame", {
          tableId: tableId,
          isDealer: isDealer
        })
        .then(function(data) {
          callback(data);
        });
    },
    getTransaction: function(pageNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/getPaymentDetails", {
            page: pageNo,
            accessToken: accessToken
          })
          .then(function(data) {
            if (data.data) {
              var totalCount = data.data.data.total;
              data.data.data.options.maxPage = _.ceil(
                data.data.data.total / data.data.data.options.count
              );
              callback(data);
            }
          });
      }
    },
    getTableTransaction: function(pageNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/getProfitLossDetails", {
            page: pageNo,
            accessToken: accessToken
          })
          .then(function(data) {
            if (data.data) {
              var totalCount = data.data.data.total;
              data.data.data.options.maxPage = _.ceil(
                data.data.data.total / data.data.data.options.count
              );
              callback(data);
            }
          });
      }
    },
    makeTip: function(amount, tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http
          .post(url + "Transaction/makeTip", {
            tableId: tableId,
            amount: amount,
            accessToken: accessToken
          })
          .then(function(data) {
            callback(data);
          });
      }
    }
  };
  return obj;
});
