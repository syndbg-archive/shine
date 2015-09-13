var app = angular.module(
  'customers',
  [
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'ui-notification',

    'ngMessages',
    'templates'
  ]
);

app.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', 'NotificationProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider, NotificationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
      url: '/?page&q',
      templateUrl: 'customer_search.html',
      controller: 'CustomerSearchController',
      resolve: {
        customers: ['Customers', function (Customers) {
          return Customers.getList();
        }]
      }
    }).state('item', {
      url: '/{id:int}',
      templateUrl: 'customer_detail.html',
      controller: 'CustomerDetailController',
      resolve: {
        customer: ['$stateParams', 'Customers', function($stateParams, Customers) {
          return Customers.getList().get($stateParams.id);
        }]
      }
    });

    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 10,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top',
      replaceMessage: true
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
