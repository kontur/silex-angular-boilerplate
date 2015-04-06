angular.module('App.filters', [])
    // example filter useful for printing out html
    .filter('raw', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);