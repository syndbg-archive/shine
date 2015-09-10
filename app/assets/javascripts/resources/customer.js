'use strict';

app.factory('Customers', ['Restangular', function (Restangular) {
  return Restangular.service('customers');
}]);
