(function () {
    'use strict';
    angular
        .module('app')
        .service('feedService',
        ['HttpRequestFactory', createFeedService]);

    function createFeedService(HttpRequestFactory) {
        var feedService = {};

        feedService.getFeedInfo = getFeedInfo;

        function getFeedInfo(page) {
            //alert(JSON.stringify(page));
            //return;
            return HttpRequestFactory.get(`/public/get/feeds/${page}/json`);
        }

        return feedService
    }
})();