buffyApp.directive('episode', function() {
  return {
    templateUrl: '/assets/templates/episode.html',
    restrict: 'E',
    scope: {
      model: '=model'
    },
    link: function($scope, $el, attrs) {
      $scope.addFavorite = function(episodeId) {
        console.log("Marking episode favorited: "+ episodeId)
        window.localStorage[episodeId +'_favorited'] = "true"
        $scope.model.favorited = true
      }

      $scope.removeFavorite = function(episodeId) {
        console.log("Marking episode NOT favorited: "+ episodeId)
        window.localStorage[episodeId +'_favorited'] = "false"
        $scope.model.favorited = false
      }

      $scope.markWatched = function(episodeId) {
        console.log("Marking episode watched: "+ episodeId)
        window.localStorage[episodeId +'_watched'] = "true"
        $scope.model.watched = true
      }

      $scope.markUnwatched = function(episodeId) {
        console.log("Marking episode unwatched: "+ episodeId)
        window.localStorage[episodeId +'_watched'] = "false"
        $scope.model.watched = false
      }
    }
  }
})