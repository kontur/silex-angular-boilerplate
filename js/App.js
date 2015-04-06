/**
 * Main angular app file with different app specific modules
 * Append other more generic modules as needed
 */
angular.module('App', [
    'ngRoute',
    'ngAnimate',
    'App.controllers',
    'App.services',
    'App.filters',
    'App.directives'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'partials/index.html',
            controller: 'IndexController'
        });
        $routeProvider.otherwise({redirectTo: '/index'});

        $locationProvider.html5Mode({enabled: true, rewriteLinks: true});
    }])

    .run(function ($rootScope, $location, Meta) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
        });
        $rootScope.$on("$routeChangeSuccess", function () {
            // on page load, reset Meta, then overwrite in Controller if needed
            Meta.reset();
            setTimeout(function () {
                angular.element("document, body").scrollTop(0);
            }, 500);
        });

        // make Meta available to all controllers
        $rootScope.Meta = Meta;
    });