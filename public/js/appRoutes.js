// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // loops page that will use the LoopController
        .when('/loops', {
            templateUrl: 'views/loops.html',
            controller: 'LoopController'
        });

    $locationProvider.html5Mode(true);

}]);
