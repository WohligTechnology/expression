myApp.controller("TablesListCtrl", function(
  $scope,
  $state,
  $ionicPlatform,
  $ionicHistory,
  $stateParams,
  $ionicModal,
  Service,
  $window,
  $cordovaClipboard
) {
  $scope.maxPlayers = 9;
  $scope.createTableData = {};
  $scope.tableLists = [];
  $scope.resetValues = false;
  $scope.filterData = {};
  $scope.searchData = {};
  $scope.param = {
    pokerType: $stateParams.type
  };

  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("landscape");
    } else {
    }
  });

  if (!_.isEmpty($stateParams)) {
    $scope.heading = $stateParams.type;
  }

  $scope.searchByName = function(name) {
    if (!_.isEmpty(name)) {
      $scope.param.name = {
        $regex: name,
        $options: "i"
      };
      $scope.tableLists = undefined;
      $scope.tableType("All");
    } else {
      // if($scope.filterData){

      // }
      // $scope.param = {
      //   pokerType: $stateParams.type
      // };
      console.log("DATA Before", $scope.param);
      delete $scope.param.name;
      $scope.tableLists = undefined;
      console.log("DATA", $scope.param, $scope.params);
      $scope.tableType("All");
    }
  };
  $ionicModal
    .fromTemplateUrl("templates/modal/filter-table.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.filterModal = modal;
    });
  $scope.openFilterTableModal = function() {
    $scope.filterModal.show();
  };
  $scope.closeFilterTableModal = function(data) {
    if (data !== "apply") {
      $scope.filterData = {};
    }
    $scope.filterModal.hide();
  };

  $scope.applyFilter = function(filters) {
    console.log("filter Data", filters);
    if (filters.private) {
      $scope.param.type = "Private";
    }
    if (filters.public) {
      $scope.param.type = "Public";
    }
    if (!filters.private && !filters.public) {
      delete $scope.param.type;
    }
    if (filters.omaha) {
      $scope.param.gameType = "Omaha";
    }
    if (filters.holdem) {
      $scope.param.gameType = "Texas hold 'em";
    }
    if (!filters.omaha && !filters.holdem) {
      delete $scope.param.gameType;
    }
    if (filters.minimumBuyin) {
      $scope.param.minimumBuyin = filters.minimumBuyin;
      // $scope.param.minimumBuyin = {
      //   $regex: filters.minimumBuyin,
      //   $options: "i"
      // };
    } else {
      delete $scope.param.minimumBuyin;
    }
    if (filters.maximumBuyin) {
      $scope.param.maximumBuyin = filters.maximumBuyin;
      // $scope.param.maximumBuyin = {
      //   $regex: filters.maximumBuyin,
      //   $options: "i"
      // };
    } else {
      delete $scope.param.maximumBuyin;
    }
    if (filters.smallBlind) {
      $scope.param.smallBlind = filters.smallBlind;
      // $scope.param.smallBlind = { $regex: filters.smallBlind, $options: "i" };
    } else {
      delete $scope.param.smallBlind;
    }
    if (filters.bigBlind) {
      $scope.param.bigBlind = filters.bigBlind;
      // $scope.param.bigBlind = { $regex: filters.bigBlind, $options: "i" };
    } else {
      delete $scope.param.bigBlind;
    }
    $scope.tableLists = undefined;
    $scope.tableType("All");
    $scope.closeFilterTableModal("apply");
  };

  $scope.resetFilter = function() {
    $scope.filterData = {};
    if ($scope.param.name) {
      delete $scope.param.name;
      // delete $scope.searchData;
      $scope.searchData = {};
      console.log("$scope.search", $scope.searchData);
    }
    if ($scope.param.name) {
      $scope.tempStore = $scope.param.name;
    }
    if ($scope.tempStore) {
      $scope.param = {
        pokerType: $stateParams.type,
        name: $scope.tempStore
      };
    } else {
      $scope.param = {
        pokerType: $stateParams.type
      };
    }
    $scope.tableLists = undefined;
    $scope.tableType("All");
  };

  $scope.clearFilter = function() {
    $scope.filterData = {};
  };

  $scope.getTableDetails = function(params) {
    $scope.listLoaded = false;
    console.log("params", params);
    var constraints = {};
    constraints = params;
    if (!$scope.tableListLoading) {
      $scope.params.page = $scope.params.page + 1;
      $scope.tableListLoading = true;
      Service.getTableDetails(constraints, function(data) {
        $scope.tableListLoading = false;
        if (data.value) {
          if (_.isEmpty(data.data.results)) {
            $scope.listLoaded = true;
            if (_.isEmpty($scope.tableLists)) {
              $scope.tableLists = [];
            }
          } else {
            if ($scope.tableLists == undefined) {
              $scope.tableLists = data.data.results;
            } else {
              $scope.tableLists = _.concat(
                $scope.tableLists,
                data.data.results
              );
            }
          }
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }
      });
    }
  };

  $scope.getTableAndPlayerCount = function() {
    Service.getTableAndPlayerCount(function(data) {
      if (data.value) {
        $scope.tableCount = data.data.liveTable;
        $scope.playersCount = data.data.activePlayers;
      } else {
        $scope.tableCount = 0;
        $scope.playersCount = 0;
      }
    });
  };
  $scope.getTableAndPlayerCount();

  $scope.selectedTab = "All";
  /**To select Table type as per tabs */
  $scope.tableType = function(tableType) {
    $scope.selectedTab = tableType;
    var holdem = {};
    var omaha = {};
    var private = {};
    $scope.tableLists = undefined;
    $scope.params = {
      pokerType: $stateParams.type
    };
    $scope.params.page = 0;
    console.log($scope.param);
    if ($scope.param.name) {
      $scope.params.name = $scope.param.name;
    }
    if ($scope.param.smallBlind) {
      $scope.params.smallBlind = $scope.param.smallBlind;
    }
    if ($scope.param.bigBlind) {
      $scope.params.bigBlind = $scope.param.bigBlind;
    }
    if ($scope.param.minimumBuyin) {
      $scope.params.minimumBuyin = $scope.param.minimumBuyin;
    }
    if ($scope.param.maximumBuyin) {
      $scope.params.maximumBuyin = $scope.param.maximumBuyin;
    }
    switch ($scope.selectedTab) {
      case "All":
        if ($scope.param.type) {
          $scope.params.type = $scope.param.type;
        }
        if ($scope.param.gameType) {
          $scope.params.gameType = $scope.param.gameType;
        }
        $scope.getTableDetails($scope.params);
        break;
      case "HoldEm":
        if ($scope.param.type) {
          $scope.params.type = $scope.param.type;
        }
        $scope.params.gameType = "Texas hold 'em";
        $scope.getTableDetails($scope.params);
        break;
      case "Omaha":
        if ($scope.param.type) {
          $scope.params.type = $scope.param.type;
        }
        $scope.params.gameType = "Omaha";
        $scope.getTableDetails($scope.params);
        break;
      case "Private":
        if ($scope.param.gameType) {
          $scope.params.gameType = $scope.param.gameType;
        }
        $scope.params.type = "Private";
        $scope.params.creator = $.jStorage.get("_id");
        $scope.getTableDetails($scope.params);
        break;
      default:
        $scope.getTableDetails({
          pokerType: $stateParams.type
        });
        break;
    }
  };
  $scope.tableType("All");
  $scope.onInfinite = function() {
    console.log("onInfinite called", $scope.params);
    $scope.getTableDetails($scope.params);
  };
  /**Select table End */
  $scope.goBackToPage = function() {
    console.log("Go Back Called", $window.history);
    $window.history.back();
  };

  /**to open private table ask for password */
  $ionicModal
    .fromTemplateUrl("templates/modal/private-table-login.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.privateTableLogin = modal;
    });
  $scope.openPrivateTableLogin = function() {
    $scope.privateTableLogin.show();
  };
  $scope.closePrivateTableLogin = function() {
    $scope.privateTableLogin.hide();
  };

  /**Selected Table */

  $scope.selectedTable = function(table) {
    $scope.tableName = table.name;
    $scope.tableId = table._id;
    if (table.type == "Private") {
      $scope.user_id = $.jStorage.get("_id");
      if (table.creator == $scope.user_id) {
        $state.go("table", {
          id: table._id
        });
      } else {
        console.log("Private table open modal for password");
        $scope.openPrivateTableLogin();
        $scope.invalidCredentials = false;
        $scope.goToPrivateTable = function(data) {
          var data1 = {};
          data1.password = data.password;
          data1.tableId = $scope.tableId;
          console.log("join Table", data1);
          Service.goToPrivateTable(data1, function(data) {
            if (data.value == true) {
              $scope.closePrivateTableLogin();
              $state.go("table", {
                id: table._id
              });
            } else {
              $scope.invalidCredentials = true;
              $scope.showError = data.error;
            }
          });
        };
      }
    } else {
      $state.go("table", {
        id: table._id
      });
    }
  };

  $scope.dateTime = moment().format("DD/MM/YY HH:mm");

  /**Create Private Table Modal */
  $ionicModal
    .fromTemplateUrl("templates/modal/create-private-table.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.modal = modal;
    });
  $scope.createTable = function() {
    $scope.modal.show();
  };
  $scope.closePrivateTable = function() {
    $scope.modal.hide();
  };

  /**Create Table Small and Big blind amounts */
  $scope.compareAmounts = function(smallBlind, bigBlind) {
    $scope.createTableData.bigBlind = 2 * smallBlind;
  };

  $scope.compareBuyin = function(minimumBuyin, maximumBuyin) {
    if (minimumBuyin < maximumBuyin && minimumBuyin != 0) {
      $scope.buyInError = false;
    } else if (minimumBuyin != undefined) {
      $scope.buyInError = true;
    }

    if (maximumBuyin > minimumBuyin && maximumBuyin != 0) {
      $scope.buyInErrorMax = false;
    } else if (maximumBuyin != undefined) {
      $scope.buyInErrorMax = true;
    }
  };

  /**to open private table ask for password */
  $ionicModal
    .fromTemplateUrl("templates/modal/private-table-code.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function(modal) {
      $scope.privateTableInfo = modal;
    });
  $scope.openPrivateTableInfo = function(tableData) {
    $scope.privateTableData = tableData;
    $scope.privateTableInfo.show();
  };
  $scope.closePrivateTableInfo = function() {
    $scope.privateTableInfo.hide();
  };
  $scope.createPrivateTable = function(tableData) {
    $scope.privateTableData = tableData;
    $scope.privateTableData.type = "Private";
    $scope.privateTableData.accessToken = $.jStorage.get("accessToken");
    Service.savePrivateTable($scope.privateTableData, function(data) {
      console.log("create Data", data);
      if (data.value) {
        $scope.closePrivateTable();
        var data1 = {};
        data1.name = data.data.name;
        data1.password = data.data.password;
        $scope.openPrivateTableInfo(data1);
      } else {
        //do nothing
      }
    });
  };

  /**To copy code of private table */
  $scope.copyCode = function(code) {
    console.log("password", code);
    $ionicPlatform.ready(function() {
      $cordovaClipboard.copy(code).then(
        function() {
          // success
        },
        function() {
          // error
        }
      );

      $cordovaClipboard.paste().then(
        function(result) {
          // success, use result
        },
        function() {
          // error
        }
      );
    });
  };
});
