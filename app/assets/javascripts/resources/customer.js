'use strict';

app.factory('Customer', ['Restangular', function (Restangular) {
  return Restangular.service('customers');
}]);
