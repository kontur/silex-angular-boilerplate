
angular.module('App.controllers', [])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://*.vimeo.com/**'
        ]);
    })

    // sample index controller
    .controller('IndexController', ['$scope', '$http', 'Meta',
        function ($scope, $http, Meta) {
            Meta.set({
                'title': '',
                'description': ''
            });
        }])

    // define other controllers here

    // sample navigation controller to update currently selected navigation item
    .controller('NavigationController', ['$scope', '$location',
        function ($scope, $location) {
            // helper for adding active class to current nav item
            $scope.isCurrent = function (path) {
                return $location.path().indexOf(path) > -1;
            };

            // close navigation on route change (nav click)
            $scope.navopen = false;
            $scope.$on("$routeChangeSuccess", function () {
                $scope.navopen = false;
            });
        }]);