angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainController', 'IndexController', 'LoopService']);
.config(function($routeProvider))
    $routeProvider
        .when('/loops', {
            templateUrl: 'views/loops.html',
            controller: 'LoopController'
        });

        .when('/test3', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        });

}]);
