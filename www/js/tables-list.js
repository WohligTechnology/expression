myApp.controller("TablesListCtrl", function(
  $scope,
  $state,
  $ionicPlatform,
  $ionicHistory,
  $stateParams,
  $ionicModal,
  Service
) {
  $scope.maxPlayers = 9;
  $scope.tableLists = undefined;
  $scope.resetValues = false;
  $scope.filterData = {};
  $scope.param = {
    pokerType: $stateParams.type
  };

  $ionicPlatform.ready(function() {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock("portrait");
    } else {
    }
  });

  if (!_.isEmpty($stateParams)) {
    $scope.heading = $stateParams.type;
  }

  $scope.searchByName = function(name) {
    if (!_.isEmpty(name)) {
      $scope.param.name = { $regex: name, $options: "i" };
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
    console.log("params", params);
    var constraints = {};
    constraints = params;
    Service.getTableDetails(constraints, function(data) {
      console.log(data);
      $scope.tableLists = data.data.results;
      $scope.tableCount = data.data.liveTable;
      $scope.playersCount = data.data.activePlayers;
    });
  };
  $scope.selectedTab = "All";

  /**To select Table type as per tabs */
  $scope.tableType = function(tableType) {
    $scope.selectedTab = tableType;
    var holdem = {};
    var omaha = {};
    var private = {};
    $scope.params = { pokerType: $stateParams.type };
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
  /**Select table End */
  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $ionicHistory.goBack();
  };

  /**Selected Table */
  $scope.selectedTable = function(table) {
    console.log("Table selected", table);
    $state.go("table", {
      id: table.id
    });
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

  /**Create Table */
  $scope.notMatching = false;
  $scope.matchPasswords = function(data) {
    if (!_.isEqual(data.password, data.confirmPassword)) {
      $scope.notMatching = true;
    } else {
      $scope.notMatching = false;
    }
  };

  $scope.createPrivateTable = function(tableData) {
    console.log("tableData", tableData);
  };
});
