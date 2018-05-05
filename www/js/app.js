// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic', 'starter.service', 'ui.select', 'ngSanitize', 'angularPromiseButtons', 'rzModule', 'ngAnimate'])

  .run(function ($ionicPlatform, $state) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (_.isEmpty($.jStorage.get("accessToken"))) {
        $state.go('login');
      } else {
        $state.go('lobby');
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();

        StatusBar.hide();
      }



      if (window.plugins && window.plugins.insomnia) {
        window.plugins.insomnia.keepAwake();
      }

      // Preload audio resources
      window.plugins.NativeAudio.preloadComplex('turn', 'audio/win.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      // window.plugins.NativeAudio.preloadComplex('coin', 'audio/coin.mp3', 1, 1, 0, function (msg) {}, function (msg) {
      //   console.log('error: ' + msg);
      // });
      // window.plugins.NativeAudio.preloadComplex('winner', 'audio/winner.wav', 1, 1, 0, function (msg) {}, function (msg) {
      //   console.log('error: ' + msg);
      // });
      // window.plugins.NativeAudio.preloadComplex('shuffle', 'audio/shuffle.wav', 1, 1, 0, function (msg) {}, function (msg) {
      //   console.log('error: ' + msg);
      // });
      // window.plugins.NativeAudio.preloadComplex('button', 'audio/button.mp3', 1, 1, 0, function (msg) {}, function (msg) {
      //   console.log('error: ' + msg);
      // });

    });
  })
  // .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {

  //   }]
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.swipeBackEnabled(false);
    //for loader
    // cfpLoadingBarProvider.includeSpinner = true;
    // cfpLoadingBarProvider.includeBar = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div class="spinner-overlay"><img class="spinner" src="img/spinner.gif" /></div>';
    //End of loader
    $stateProvider

      //   .state('app', {
      //   url: '/app',
      //   templateUrl: 'templates/app.html',
      //   controller: 'AppCtrl'
      // })

      .state('lobby', {
        url: '/lobby',
        cache: false,
        templateUrl: 'templates/lobby.html',
        controller: 'LobbyCtrl'
      })
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/sign-up.html',
        cache: false,
        controller: 'SignUpCtrl'
      })
      .state('addamount', {
        url: '/addamount',
        templateUrl: 'templates/add-amount.html',
        cache: false,
        controller: 'AddAmountCtrl'
      })
      .state('withdrawal', {
        url: '/withdrawal',
        templateUrl: 'templates/withdrawal-amount.html',
        cache: false,
        controller: 'WithDrawalCtrl'
      })
      .state('table', {
        url: '/table/:id',
        cache: false,
        templateUrl: 'templates/table.html',
        controller: 'TableCtrl'
      })

    ;
    // if none of the above states are matche d, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });



myApp.filter('uploadpath', function () {
  return function (input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});

myApp.filter('serverimage', function () {
  return function (input, width, height, style) {
    if (input) {

      if (input.substr(0, 4) == "http") {
        return input;
      } else {
        image = imgpath + "?file=" + input;
        if (width) {
          image += "&width=" + width;
        }
        if (height) {
          image += "&height=" + height;
        }
        if (style) {
          image += "&style=" + style;
        }
        return image;
      }

    } else {
      //    return "img/logo.png";
      return "img/player_pic.png";
    }
  };
});

myApp.filter('cardimg', function () {
  return function (input) {
    if (input) {
      return "img/cards/" + input + ".svg"

    } else {
      //    return "img/logo.png";
      return "img/player_pic.png";
    }
  };
});
