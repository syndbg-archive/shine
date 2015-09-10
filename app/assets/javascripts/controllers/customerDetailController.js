app.controller('CustomerDetailController', ['$scope', 'customer',
  function($scope, customer) {
    $scope.customer = customer;

    $scope.save = function () {
      alert($scope.form.$valid);
    };
  }
]);
