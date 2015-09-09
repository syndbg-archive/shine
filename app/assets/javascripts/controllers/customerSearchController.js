app.controller('CustomerSearchController', ['$scope', '$stateParams', 'customers', 'Customer',
  function($scope, $stateParams, customers, Customer) {
    $scope.page = $stateParams.page || 1;
    $scope.keywords = $stateParams.q || '';

    $scope.customers = customers;
    $scope.hasNextPage = customers.hasNextPage;
    $scope.hasPreviousPage = customers.hasPreviousPage;

    $scope.search = function(searchTerm) {
      if (searchTerm.length !== 0 && searchTerm.length < 3) {
        return;
      }

      $scope.loading = true;

      Customer.getList({ 'keywords': $scope.keywords, 'page': $scope.page })
        .then(function (customers) {
          $scope.hasNextPage = customers.hasNextPage;
          $scope.hasPreviousPage = customers.hasPreviousPage;

          $scope.customers = customers;
          $scope.loading = false;
        });
    }

    $scope.previousPage = function() {
      if ($scope.hasPreviousPage) {
        $scope.page -= 1;
        $scope.search($scope.keywords);
      }
    }

    $scope.nextPage = function() {
      if ($scope.hasNextPage) {
        $scope.page += 1;
        $scope.search($scope.keywords);
      }
    }
  }
]);
