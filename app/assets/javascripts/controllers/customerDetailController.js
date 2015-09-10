app.controller('CustomerDetailController', ['$scope', 'customer',
  function($scope, customer) {
    $scope.customer = customer;
  }
]);
