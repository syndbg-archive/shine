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
      url: '/?page&q',
      templateUrl: 'customer_search.html',
      controller: 'CustomerSearchController',
      resolve: {
        customers: ['Customer', function (Customer) {
          return Customer.getList();
        }]
      }
    }).state('item', {
      url: '/{id:int}',
      templateUrl: 'customer_detail.html',
      controller: 'CustomerDetailController',
      resolve: {
        customer: ['$stateParams', 'Customer', function($stateParams, Customer) {
          return Customer.get($stateParams.id);
        }]
      }
    });

    RestangularProvider.setBaseUrl('/api/');
    // Note that this is hardcoded to the paginated responses!s
    // RestangularProvider.setResponseExtractor(function(response, operation) {
    //   return response.items;
    // });

    // Add page and totalPages to response object
    RestangularProvider.addResponseInterceptor(function(data, operation, entity, url, response, deferred) {
      var extractedData;

      if (operation === 'getList') {
        // set useful pagination properties
        extractedData = data.items;
        extractedData.page = data.page;
        extractedData.totalPages = data.totalPages;
        extractedData.hasPreviousPage = data.page > 1;
        extractedData.hasNextPage = data.page < data.totalPages;
      } else {
        // get entity directly when it's not an index paginated endpoint
        extractedData = data;
      }
      return extractedData;
    });

}]);
