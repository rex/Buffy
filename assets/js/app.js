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
      .primaryPalette('blue-grey')
      .accentPalette('light-blue')
      // .dark()
  }])

buffyApp
  .controller('AppCtrl', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
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
    var showId = $scope.params.showId
    var show = window.BuffyTracker_Shows[showId]
    var basic_seasons = show.seasons
    var seasons = []
    basic_seasons.forEach(function(s) {
      var full_season = window.BuffyTracker_Seasons[showId +"-"+ s.season_number]
      console.log(full_season)
      full_season.episodes = _.map(full_season.episodes, function(episode) {
        episode.name = episode.name.replace(/ \([0-9]\)/g, '')

        var watched = window.localStorage[episode.id +'_watched']
        var favorited = window.localStorage[episode.id +'_favorited']

        episode.favorited = (favorited && favorited == "true")
        episode.watched = (watched && watched == "true")
        return episode
      })
      seasons.push(full_season)
    })

    $scope.seasons = seasons
  }])
  .controller('SeasonCtrl', ['$scope', '$routeParams', '$attrs', function($scope, $routeParams, $attrs) {
    $scope.name = 'SeasonCtrl'
    $scope.params = $routeParams
    $scope.season = $attrs.season

    console.log('season: ', season)
  }])
  .controller('EpisodeCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'EpisodeCtrl'
    $scope.params = $routeParams
  }])
