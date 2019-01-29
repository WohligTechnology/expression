myApp.controller("TablesListCtrl", function ($scope, $ionicPlatform, $ionicHistory, $stateParams, $ionicModal) {
  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock('portrait');
    } else {}
  });
  if (!_.isEmpty($stateParams)) {
    $scope.heading = $stateParams.type;
  }
  $scope.listOfTables = {
    tableData: {
      'id': "1",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData1: {
      'id': "2",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData2: {
      'id': "3",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData3: {
      'id': "4",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData4: {
      'id': "5",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData5: {
      'id': "6",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData6: {
      'id': "7",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData7: {
      'id': "8",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData8: {
      'id': "9",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData9: {
      'id': "10",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData10: {
      'id': "11",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData11: {
      'id': "12",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData12: {
      'id': "13",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData13: {
      'id': "14",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData14: {
      'id': "15",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData15: {
      'id': "16",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData16: {
      'id': "17",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData17: {
      'id': "18",
      'name': "Sizzling sixes",
      'accessType': "Private",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData18: {
      'id': "19",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Omaha",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
    tableData19: {
      'id': "20",
      'name': "Sizzling sixes",
      'accessType': "Public",
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
  }
  $scope.tableLists = _.cloneDeep($scope.listOfTables);
  $scope.selectedTab = 'All';

  /**To select Table type as per tabs */
  $scope.tableType = function (tableType) {
    $scope.selectedTab = tableType;
    console.log("$scope.selectedTab", $scope.selectedTab);

    switch ($scope.selectedTab) {
      case "All":
        $scope.tempData = _.cloneDeep($scope.listOfTables);
        $scope.tableLists = $scope.tempData;
        break;
      case "HoldEm":
        $scope.tempData = _.cloneDeep($scope.listOfTables);
        $scope.tableLists = _.pickBy($scope.tempData, function (data) {
          return data.type == 'Holdem'
        });
        break;
      case "Omaha":
        $scope.tempData = _.cloneDeep($scope.listOfTables);
        $scope.tableLists = _.pickBy($scope.tempData, function (data) {
          return data.type == 'Omaha'
        });
        break;
      case "Private":
        $scope.tempData = _.cloneDeep($scope.listOfTables);
        $scope.tableLists = _.pickBy($scope.tempData, function (data) {
          return data.accessType == 'Private'
        });
        break;
      default:
        $scope.tempData = _.cloneDeep($scope.listOfTables);
        $scope.tableLists = $scope.tempData;
        break;
    }
  }
  /**Select table End */
  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };

  /**Selected Table */
  $scope.selectedTable = function (table) {
    console.log("Table selected", table)
  }

  $scope.dateTime = moment().format("Do MMM'YY HH:mm:ss");

  /**Create Private Table Modal */
  $ionicModal.fromTemplateUrl('templates/modal/create-private-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.createTable = function () {
    $scope.modal.show();
  };
  $scope.closePrivateTable = function () {
    $scope.modal.hide();
  };
})
