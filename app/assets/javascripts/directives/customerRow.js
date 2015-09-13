app.directive('customerRow', ['$state', function ($state) {
  return {
    restrict: 'E',
    scope: {
      customer: '=for',
      showViewDetails: '=?'
    },
    templateUrl: 'customer_row.html',
    link: function($scope, $element, $attrs) {
      $scope.showViewDetails = angular.isDefined($scope.showViewDetails) ?
                               $scope.$eval($attrs.showViewDetails) : true;

      $scope.viewDetails = function () {
        $state.go('item', { id: $scope.customer.id});
      };
    }
  };
}]);
