// myApp=angular.module('starter.controllers', [])
// myApp=angular.module('starter.controllers', [])

myApp.controller("AppCtrl", function($scope) {});
myApp.controller("browserInAppCtrl", function($scope, $cordovaInAppBrowser) {
  console.log("demo");
  $cordovaInAppBrowser.open(
    "http://expression.wohlig.co.in/expression/#/login",
    options
  );
});
