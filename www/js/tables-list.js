myApp.controller("TablesListCtrl", function ($scope, $ionicPlatform, $ionicHistory, $stateParams) {
  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock('portrait');
    } else {}
  });
  if (!_.isEmpty($stateParams)) {
    $scope.heading = $stateParams.type;
  }

  $scope.selectedTab = 'All';
  $scope.tableType = function (tableType) {
    $scope.selectedTab = tableType;
  }

  $scope.goBackToPage = function () {
    console.log("Go Back Called")
    $ionicHistory.goBack();
  };

  $scope.tableLists = {
    tableData: {
      'id': "1",
      'name': "Sizzling sixes",
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
      'type': "Virtual",
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
      'type': "Private Holdem",
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
      'type': "Virtual",
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
      'type': "Private Holdem",
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
      'type': "Virtual",
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
      'type': "Private Holdem",
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
      'type': "Virtual",
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
      'type': "Private Holdem",
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
      'type': "Virtual",
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
      'type': "Private Holdem",
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
      'type': "Holdem",
      'minRate': "80",
      'maxRate': "200",
      'inPlayers': "8",
      'maxPlayers': "10",
      'buyInMin': "80",
      'buyInMax': "400"
    },
  }

  $scope.selectedTable = function (table) {
    console.log("Table selected", table)
  }
})
