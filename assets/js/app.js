var buffyApp = angular
  .module('BuffyApp', ['ngMaterial', 'ngRoute'])
  .config(['$mdThemingProvider', function($mdThemingProvider) {
    // red
    // pink
    // purple
    // deep-purple
    // indigo
    // blue
    // light-blue
    // cyan
    // teal
    // green
    // light-green
    // lime
    // yellow
    // amber
    // orange
    // deep-orange
    // brown
    // grey
    // blue-grey
    $mdThemingProvider
      .theme('default')
      .primaryPalette('red')
      .accentPalette('brown')
      // .dark()
  }])

buffyApp
  .controller('AppCtrl', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
    $scope.title1 = "Foo 1"
    $scope.title4 = "Foo 4"
    $scope.shows = window.BuffyTracker_Shows
    $scope.$route = $route
    $scope.$location = $location
    $scope.$routeParams = $routeParams
  }])
  .controller('SelectCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'SelectCtrl'
    $scope.params = $routeParams
  }])
  .controller('ShowCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'ShowCtrl'
    $scope.params = $routeParams
  }])
  .controller('SeasonCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'SeasonCtrl'
    $scope.params = $routeParams
  }])
  .controller('EpisodeCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'EpisodeCtrl'
    $scope.params = $routeParams
  }])
