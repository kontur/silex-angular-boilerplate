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
                return meta.image
            },

            set: function (newMeta) {
                for (var attr in newMeta) {
                    meta = $.extend(meta, newMeta);
                }
            },
            prepend: function (newMeta) {
                ;
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