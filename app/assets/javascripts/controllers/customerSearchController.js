app.controller('CustomerSearchController', ['$scope','$http', '$timeout',
  function($scope , $http, $timeout) {
    var page = 0;

    $scope.customers = [];

    $scope.search = function(searchTerm) {
      $scope.loading = true;
      if (searchTerm.length < 3) {
        return;
      }
      $http.get('/customers.json',
                { 'params': { 'keywords': searchTerm, 'page': page } }
      ).then(function(response) {
        timeOut('responseTimeout', function () {
          $scope.customers = response.data;
          $scope.loading = false;
        });
      }, function (response) {
          timeOut('responseTimeout', function () {
            $scope.loading = false;
          });
          alert('Got error: ' + response.status);
      });
    }

    function timeOut(timeoutName, fn) {
      var scopeTimeout = $scope[timeoutName];

      if (angular.isDefined(scopeTimeout)) {
        $timeout.cancel(scopeTimeout);
      }

      scopeTimeout = $timeout(fn, 300);
    };

    $scope.previousPage = function() {
      if (page > 0) {
        page -= 1;
        $scope.search($scope.keywords);
      }
    }

    $scope.nextPage = function() {
      page += 1;
      $scope.search($scope.keywords);
    }
  }
]);
