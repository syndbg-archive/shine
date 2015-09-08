var app = angular.module(
  'customers',
  [
    'ui.router',
    'templates'
  ]
);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
      url: '/',
      templateUrl: 'customer_search.html',
      controller: 'CustomerSearchController'
    });
}]);
