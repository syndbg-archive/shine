app.directive('customerRow', ['$state', function ($state) {
  return {
    restrict: 'E',
    scope: {
      customer: '=for'
    },
    templateUrl: 'customer_row.html',
    link: function($scope, $element, $attrs) {
      $scope.viewDetails = function () {
        $state.go('item', { id: $scope.customer.id});
      };
    }
  };
}]);
