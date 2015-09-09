app.controller('CustomerSearchController', ['$scope', 'customers', 'Customer', '$timeout',
  function($scope, customers, Customer, $timeout) {
    $scope.page = 1;

    $scope.customers = customers;
    $scope.keywords = '';

    $scope.search = function(searchTerm) {
      if (searchTerm.length !== 0 && searchTerm.length < 3) {
        return;
      }

      $scope.loading = true;

      Customer.getList({ 'keywords': searchTerm, 'page': $scope.page })
        .then(function (customers) {
          $scope.customers = customers
          $scope.loading = false;
        });
    }

    $scope.previousPage = function() {
      if ($scope.page > 0) {
        $scope.page -= 1;
        $scope.search($scope.keywords);
      }
    }

    $scope.nextPage = function() {
      $scope.page += 1;
      $scope.search($scope.keywords);
    }
  }
]);
