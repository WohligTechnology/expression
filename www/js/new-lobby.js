myApp.controller('NewLobbyCtrl', function ($scope, $window, $ionicPlatform, $state, $timeout, Service, $ionicModal) {

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

})
