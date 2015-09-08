var app = angular.module(
  'customers',
  [
    'restangular',
    'ui.router',

    'templates'
  ]
);

app.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
      url: '/',
      templateUrl: 'customer_search.html',
      controller: 'CustomerSearchController',
      resolve: {
        customers: ['Customer', function (Customer) {
          return Customer.getList();
        }]
      }
    }).state('item', {
      url: '/:id',
      templateUrl: 'customer_detail.html',
      controller: 'CustomerDetailController',
      resolve: {
        customer: ['$stateParams', 'Customer', function($stateParams, Customer) {
          return Customer.get($stateParams.id);
        }]
      }
    });

    RestangularProvider.setBaseUrl('/api/');
}]);
