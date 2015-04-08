/*! silex-angular-boilerplate - v0.0.0 - 2015-04-08
* Copyright (c) 2015 Johannes Neumeier; Licensed  */

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
angular.module('App.directives', [])

    // sample directive to make images preload and fade in via class
    .directive('preload', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'C',
            scope: {
                ngSrc: '@'
            },
            link: function (scope, element, attrs) {
                element.wrap("<div class='preload-wrapper'></div>");
                element.on('load', function () {
                    element.addClass('in');
                    setTimeout(function() {
                        element.unwrap("<div class='preload-wrapper'></div>");
                    }, 500);
                }).on('error', function () {
                    //
                });

                scope.$watch('ngSrc', function (newVal) {
                    element.removeClass('in');
                });
            }
        };
    }])
;
angular.module('App.filters', [])
    // example filter useful for printing out html
    .filter('raw', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);
angular.module('App', [
    'ngRoute',
    'ngAnimate',
    'App.controllers',
    'App.services',
    'App.filters',
    'App.directives'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexController'
        });
        $routeProvider.otherwise({redirectTo: '/'});

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
angular.module('App.services', ['ngResource'])

    // example resource service
    .factory('Items', ['$resource', function ($resource) {
        return $resource('/api/items/:what', {}, {
            featured: {
                method: 'GET',
                params: {
                    what: 'featured'
                },
                isArray: true
            }
        });
    }])

    // useful service for updating pages' meta information
    .factory('Meta', function () {
        var defaults = {
            'title': 'Default title',
            'description': 'Default description',
            'keywords': 'Default, Meta, Tags',
            'image': 'http://domain.com/default.jpg'
        };
        var meta = defaults;

        return {
            title: function () {
                return meta.title;
            },
            description: function () {
                return meta.description;
            },
            keywords: function () {
                return meta.keywords;
            },
            image: function () {
                return meta.image;
            },

            set: function (newMeta) {
                for (var attr in newMeta) {
                    meta = $.extend(meta, newMeta);
                }
            },
            prepend: function (newMeta) {
                $.map(defaults, function (value, index) {
                    if (newMeta.hasOwnProperty(index)) {
                        meta[index] = newMeta[index] + " " + value;
                    } else {
                        meta[index] = value;
                    }
                });
            },
            reset: function () {
                meta = $.extend({}, defaults);
            }
        };
    });