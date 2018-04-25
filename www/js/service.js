myApp = angular.module('starter.service', []);
var url = adminUUU + '/api/';
// var imgurl = url + "upload/";
// var imgpath = imgurl + "readFile";
var maxRow = 10;
myApp.factory('Service', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  io.socket.on('connect', function (socket) {
    socketId = io.socket._raw.id;
    $.jStorage.set("socketId", io.socket._raw.id);
    obj.connectSocket(function () {});
  });

  var obj = {
    all: function () {
      return chats;
    },
    getNavigation: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    removeAccessToken: function (data, callback) {
      $.jStorage.flush();
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },

    playerLogin: function (data, callback) {
      return $http.post(url + "User/login", data).then(function (data) {
        data = data.data;
        callback(data);
      })
    },
    verifyOtp: function (data, callback) {
      return $http.post(url + "User/verifyOtp", data).then(function (data) {
        data = data.data;
        callback(data);
      })
    },
    signUp: function (data, callback) {
      console.log(data, "signup");
      return $http.post(url + "User/signUp", data).then(function (data) {
        data = data.data;
        callback(data);
      })
    },
    getProfile: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http.post(url + 'User/profile', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      } else {
        $state.go("login");
      }
    },
    buyCoins: function (coins, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Transaction/buyCoins',
          method: 'POST',
          data: {
            coins: coins,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },
    withdrawCoins: function (coins, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Transaction/withdrawCoins',
          method: 'POST',
          data: {
            coins: coins,
            accessToken: accessToken
          }
        }).then(function (data) {
          console.log(data);
          callback(data);
        });
      }
    },
    getAllTable: function (callback) {
      return $http.post(url + "Table/getAllTable").then(function (data) {
        data = data.data;
        callback(data);
      })
    },
    getOneTableDetails: function (id, callback) {
      $http.post(url + 'Player/getAllDetails', {
        tableId: id
      }).then(function (data) {
        callback(data);
      });
    },
    savePlayerToTable: function (dataPlayer, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Table/addUserToTable',
          method: 'POST',
          data: {
            playerNo: dataPlayer.playerNo,
            tableId: dataPlayer.tableId,
            amount: dataPlayer.amount,
            socketId: socketId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },
    connectSocket: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      var tableId = $.jStorage.set("tableId");
      if (!_.isEmpty(accessToken) && (tableId)) {
        callApi();
      } else {
        $timeout(function () {
          callApi();
        }, 2000);
      }

      function callApi() {
        var accessToken = $.jStorage.get("accessToken");
        if (!_.isEmpty(accessToken)) {
          console.log(accessToken);
          console.log("socketId", socketId);
          $http.post(url + 'Player/updateSocket', {
            accessToken: accessToken,
            socketId: socketId,
            tableId: tableId
          }).then(function (data) {
            console.log("inside socket reconnect", data);
            callback(data);
          });
        }
      };
    },
    allIn: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Player/allIn',
          method: 'POST',
          data: {
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },

    raise: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Player/raise',
          method: 'POST',
          data: {
            tableId: tableId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },

    fold: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Player/raise',
          method: 'POST',
          data: {
            tableId: tableId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },
    check: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Player/check',
          method: 'POST',
          data: {
            tableId: tableId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },
    call: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Player/call',
          method: 'POST',
          data: {
            tableId: tableId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },
    randomCard: function (tableId) {
      var cardValue = cards[_.random(0, cards.length - 3)].name;
      $http.post(url + 'Player/serve', {
        tableId: tableId,
        card: cardValue
      }).then(function (data) {
        console.log(data.data);
      });
    },
    removePlayer: function (tableId, playerNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http({
          url: url + 'Table/removePlayer',
          method: 'POST',
          data: {
            tableId: tableId,
            playerNo: playerNo,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    }
  };
  return obj;
});
