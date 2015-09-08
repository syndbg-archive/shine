app.controller('CustomerSearchController', ['$scope', 'customers', 'Customer', '$timeout',
  function($scope, customers, Customer, $timeout) {
    var page = 0;

    $scope.customers = customers;
    $scope.keywords = '';

    $scope.search = function(searchTerm) {
      if (searchTerm.length !== 0 && searchTerm.length < 3) {
        return;
      }

      $scope.loading = true;

      Customer.getList({ 'keywords': searchTerm, 'page': page })
        .then(function (customers) {
          timeOut('responseTimeout', function () {
            $scope.customers = customers
            $scope.loading = false;
          });
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
