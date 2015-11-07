buffyApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/templates/select.html',
      controller: 'SelectCtrl'
    })
    .when('/shows/:showId', {
      templateUrl: '/assets/templates/show.html',
      controller: 'ShowCtrl'
    })
    .when('/shows/:showId/season/:seasonNumber', {
      templateUrl: '/assets/templates/season.html',
      controller: 'SeasonCtrl'
    })
    .when('/shows/:showId/season/:seasonNumber/episode/:episodeNumber', {
      templateUrl: '/assets/templates/episode.html',
      controller: 'EpisodeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(false)
}])
