// myApp=angular.module('starter.controllers', [])
// myApp=angular.module('starter.controllers', [])

myApp.controller("AppCtrl", function($scope) {});
myApp.controller("browserInAppCtrl", function($scope) {
  console.log("demo");
  var ref = cordova.InAppBrowser.open(
    "http://expression.wohlig.co.in/expression/",
    "_blank",
    "location=yes"
  );
});
