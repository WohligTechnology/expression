myApp.controller('LobbyCtrl', function ($scope, $window, $ionicPlatform, $state, $timeout, Service, $ionicModal) {
  console.log($state.current.name)
  //ionic cordova 
  console.log($window.location.href)
  $ionicPlatform.ready(function () {

    screen.orientation.lock("landscape");
    console.log('Orientation is ' + screen.orientation.type);
    if (window.cordova) {
      window.plugins.NativeAudio.stop('timer');
      window.plugins.NativeAudio.stop('coin');
      window.plugins.NativeAudio.stop('winner');
      window.plugins.NativeAudio.stop('shuffle');
      window.plugins.NativeAudio.stop('button');
    }

  })
  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  //end of ionic cordova

  $scope.accessToken = $.jStorage.get("accessToken");
  if (!$scope.accessToken) {
    $state.go("login");
  }
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
  //*************basic ui login***************
  //to close all tab,modal,popup
  $scope.closeAll = function () {
    $scope.rightMenu = false;
    $scope.leftMenu = false;
    $scope.activeVariation = false;
  }

  $scope.closeAll();


  //toggle active
  $scope.toggleVariations = function () {
    $scope.activeVariation = !$scope.activeVariation;
  }


  //left menu
  $scope.openLeftMenu = function () {
    $scope.leftMenu = true;
  }

  $scope.closeLeftMenu = function () {
    $scope.leftMenu = false;
  }

  // right menu
  $scope.openRightMenu = function () {
    $scope.rightMenu = true;
  }
  $scope.closeRightMenu = function () {
    $scope.rightMenu = false;
  }

  //end of basic ui login


  // modal initialize

  $ionicModal.fromTemplateUrl('templates/modal/pl_statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.PLStatementModal = modal;
  });
  $scope.openPLStatementModal = function () {
    $scope.PLStatementModal.show();
  }
  $scope.closePLStatementModal = function () {
    $scope.PLStatementModal.hide();
  }

  $ionicModal.fromTemplateUrl('templates/modal/transfer_statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.TransferStatementModal = modal;
  });

  $scope.openTransferStatementModal = function () {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.TransferStatementModal.show();
  }
  $scope.closeTransferStatement = function () {
    $scope.TransferStatementModal.hide();
  }
  //Transfer Statement
  $scope.loadTransferMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.tableTransaction();
    } else {

    }
  };

  $scope.transferStatement = function () {
    Service.searchPlayerTransaction($scope.memberId, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          // $scope.displayMessage = {
          //   main: "<p>No Data Found.</p>",
          // };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.transferStatementData.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  $ionicModal.fromTemplateUrl('templates/modal/account_statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.results = [];
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal = modal;
  });
  $scope.openACStatementModal = function () {
    $scope.results = [];
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal.show();
  }
  $scope.closeACStatement = function () {
    $scope.ACStatementModal.hide();
  }

  //Account Statement
  $scope.loadMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.tableTransaction();
    } else {

    }
  };

  $scope.tableTransaction = function () {
    Service.getTableTransaction($scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.results.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  $ionicModal.fromTemplateUrl('templates/modal/table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.priceRangeModal = modal;

  });
  $scope.openPriceRangeModal = function () {
    $scope.priceRangeModal.show();
  }
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }


  //password change
  $ionicModal.fromTemplateUrl('templates/modal/change-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.changePasswordModal = modal;
  });

  $scope.openChangePasswordModal = function () {
    $scope.data = {};
    $scope.fail1 = false;
    $scope.success = false;
    $scope.fail2 = false;
    $scope.changePasswordModal.show();
  }
  $scope.closeChangePasswordModal = function () {
    $scope.changePasswordModal.hide();
  }

  //my private Table Info 
  $ionicModal.fromTemplateUrl('templates/modal/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.myPrivateModal = modal;
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
  });
  $scope.openMyPrivateModal = function () {
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.myPrivateModal.show();
  }
  $scope.closeMyPrivateModal = function () {
    $scope.myPrivateModal.hide();
  }


  $scope.getAllTableData = function (data) {
    Service.getAllTable(function (data) {
      // console.log(data);
      $scope.getAllTables = data.data;
      // console.log($scope.getAllTables);
    });
  };
  $scope.getAllTableData();


  $scope.goToPokerPrivateTable = function (tableID, password) {
    console.log(password);
    Service.getAccessToTable({
      'tableId': tableID,
      'password': password
    }, function (data) {
      if (data.data.value) {
        $scope.tableId = data.data.data._id;
        $timeout(function () {
          $state.go('table', {
            'id': $scope.tableId
          });
        }, 300)
      } else {
        $scope.errorInPrivateLogIn = true;
      }
    });
  };

  $scope.goToTable = function (tableId, type) {
    $scope.ShowLoader = true;
    $scope.tableId = tableId;
    $scope.tableType = type;
    if ($scope.tableType == "Public") {
      $timeout(function () {
        $state.go('table', {
          'id': $scope.tableId
        });
        $scope.ShowLoader = false;
      }, 300);
    } else {
      $scope.privateCModal(tableId);
    }

  };

  //Logout
  $scope.logout = function () {
    $.jStorage.flush();
  };

  //create private Table

  $ionicModal.fromTemplateUrl('templates/modal/create-private-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalCreate = modal;
  });

  $scope.createPrivateModal = function ($event) {
    $scope.ModalCreate.show();
    $event.stopPropagation();
  }
  $scope.closePrivateTable = function () {
    $scope.ModalCreate.hide();
  };

  //private table
  $ionicModal.fromTemplateUrl('templates/modal/private-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalPCreate = modal;
  });

  $scope.privateModal = function ($event) {
    $scope.ModalPCreate.show();
  }
  $scope.closePTable = function () {
    $scope.ModalPCreate.hide();
  };

  //private table card 

  $ionicModal.fromTemplateUrl('templates/modal/private-table-card.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalCCreate = modal;
  });

  $scope.privateCModal = function (tableID) {
    $scope.ModalCCreate.show();
    $scope.privateTableId= tableID;
    console.log("$scope.privateTableId////////",$scope.privateTableId);
  }
  $scope.closeCTable = function () {
    $scope.ModalCCreate.hide();
  };
  //Rules

  $scope.goToPrivateTable = function (password) {
    Service.getAccessToTable({
      'tableId': $scope.privateTableId,
      'password': password
    }, function (data) {
      if (data.data.value) {
        $scope.tableId = data.data.data._id;
        $scope.closeCTable();
        $timeout(function () {
          $state.go('table', {
            'id': $scope.tableId
          });
        }, 300)
      } else {
        $scope.errorInPrivateLogIn = true;
      }

    })
  };

  $ionicModal.fromTemplateUrl('templates/modal/rules.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.rulesModal = modal;
  });

  $scope.openRulesModal = function ($event) {
    $scope.rulesModal.show();
    $event.stopPropagation();
  }
  $scope.closeRulesModal = function () {
    $scope.rulesModal.hide();
  };

  //private table info modal

  $ionicModal.fromTemplateUrl('templates/modal/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalInfo = modal;
  });

  $scope.openMyPrivateTable = function () {
    $scope.privateTableDatas = [];
    $scope.ModalInfo.show();

  }

  $scope.accessToken = $.jStorage.get("accessToken");

  //playerData
  $scope.playerDataFunction = function () {
    Service.getProfile(function (data) {
      $scope.playerData = data.data.data;
      $scope.playerDataId = data.data.data._id;
      $scope._id = $.jStorage.set("_id", $scope.playerDataId);
    })
  };

  $scope.playerDataFunction();
  //destroy every modal
  $scope.$on('$destroy', function () {
    $scope.closeAll();
    $scope.PLStatementModal.remove();
    $scope.TransferStatementModal.remove();
    $scope.ACStatementModal.remove();
    $scope.priceRangeModal.remove();

    // $scope.PLModal.remove();
    $scope.changePasswordModal.remove();
    // $scope.privateLogInModal.remove();
    $scope.rulesModal.remove();
  });
  //terms and condition modal
  $ionicModal.fromTemplateUrl('templates/modal/terms-and-condition.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.termsAndCondition = function () {
    $scope.modal.show();
  };
  $scope.closeTermsModal = function () {
    $scope.modal.hide();
  };

  //faq modal
  $ionicModal.fromTemplateUrl('templates/modal/faq.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (faqModal) {
    $scope.faqModal = faqModal;
  });
  $scope.modalfaq = function () {
    $scope.faqModal.show();
  };
  $scope.closeFaqModal = function () {
    $scope.faqModal.hide();
  };
  $scope.changetab = "question";
  $scope.changeTab = function (data) {
    console.log("***********", data)
    $scope.changetab = data;
  }

  //game-price-range modal

  $ionicModal.fromTemplateUrl('templates/modal/game-price-range.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (gameModal) {
    $scope.gameModal = gameModal;
  });
  $scope.modalgame = function () {
    $scope.gameModal.show();
  };
  $scope.closeGameModal = function () {
    $scope.gameModal.hide();
  };
  $scope.changetab = "question";
  $scope.changeTab = function (data) {
    console.log("***********", data)
    $scope.changetab = data;
  }
  //range slider
  $scope.slider = {
    value: 150,
    options: {
      floor: 10,
      ceil: 200
    },
  }
  //range slider
  $scope.verticalSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  //user profile modal
  $ionicModal.fromTemplateUrl('templates/modal/user-profile.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (profileModal) {
    $scope.profileModal = profileModal;
  });
  $scope.modalProfile = function () {
    $scope.profileModal.show();
  };
  $scope.closeProfileModal = function () {
    $scope.profileModal.hide();
  };


  //voucher modal
  $ionicModal.fromTemplateUrl('templates/modal/voucher.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (voucherModal) {
    $scope.voucherModal = voucherModal;
  });
  $scope.modalVoucher = function () {
    $scope.voucherModal.show();
  };
  $scope.closeVoucherModal = function () {
    $scope.voucherModal.hide();
  };
  //voucher 

  $scope.vouchers = function (data) {
    Service.getVoucher(data, function (data) {
      console.log(data);
      $scope.message = {};
      if (data.data.value) {
        console.log(data.data.data[1]);
        $scope.voucher = data.data.data[1];
        $scope.voucherAmount = $scope.voucher[0].amount;
        console.log($scope.voucherAmount);
        $scope.closeVoucherModal();
        $scope.message = {
          heading: "Voucher Redeem Successfully",
          content: "Voucher amount of " + $scope.voucherAmount + " has been Redeem Successfully",
          error: true
        };
        $scope.showMessageModal();
      };
      if (data.data.error) {
        if (data.data.error.msg == "Voucher code already used") {
          $scope.message = {
            heading: "Voucher code already used",
          };
        };
        if (data.data.error.msg == "Invalide voucher code.") {
          $scope.message = {
            heading: "Invalid voucher code.",
          };
        };
      };
    });
  };
});
