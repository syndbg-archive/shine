app.controller('CustomerDetailController', ['$scope', '$modal', '$state', 'Notification', 'customer',
  function($scope, $modal, $state, Notification, customer) {
    $scope.customer = customer;

    $scope.deactivate = function() {
      var modal = $modal.open({
        templateUrl: 'deactivate_modal.html',
        controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
          $scope.deactivate = $modalInstance.close;
          $scope.nevermind = function () {
            $modalInstance.dismiss('cancel');
          };
        }]
      });

      modal.result.then(function () {
        Notification.success('Customer deactivated!');
        $state.go('root');
      }, function() {
        Notification.warning('Customer still active!');
      });
    };

    $scope.save = function () {
      if ($scope.form.$valid) {
        $scope.customer.save().then(function () {
          $scope.form.$setPristine();
          $scope.form.$setUntouched();

          Notification.success('Saved changes');
        }, function (response) {
          Notification.error('Oops! Server responded with:'  + response.statusText);
        });
      } else {
        Notification.warning('Invalid form. Please correct it before submitting again.');
      }
    };
  }
]);
