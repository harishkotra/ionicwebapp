var App = angular.module("FreshlyPressed", ["ionic"]);

App.service("GetPosts", ["$http", "$log", GetPosts]);

App.controller("FreshlyPressedCtrl", ["$scope", "GetPosts", "$log", FreshlyPressedCtrl]);

function FreshlyPressedCtrl ($scope, GetPosts, $log) {
  $scope.posts = [];
  $scope.refresh = function() {
    GetPosts.getEvents($scope);
  }

}

function GetPosts($http, $log) {

  this.getEvents = function($scope) {

    $http.jsonp("https://public-api.wordpress.com/rest/v1.1/freshly-pressed?callback=JSON_CALLBACK")
      .success(function(result) {
        $scope.posts = result.posts;
        $scope.$broadcast("scroll.refreshComplete");
        //$log.info(JSON.stringify(result.posts));
      });

  };

}