(function() {
  angular.module('notely.login')
    .factory('AuthInterceptor', AuthInterceptor);

  function AuthInterceptor() {
    return {
      request: function(config) {
        return config;
      }
    }
  }

  angular.module('notely')
    .config(function($httpProvider) {
      return $httpProvider.interceptors.push('AuthInterceptor');
    });
})();
