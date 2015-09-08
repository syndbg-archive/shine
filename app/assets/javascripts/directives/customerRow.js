app.directive('customerRow', function () {
  return {
    restrict: 'E',
    scope: {
      customer: '=for'
    },
    templateUrl: 'customer_row.html',
    link: function($scope, $element, $attrs) {
    }
  };
});
