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