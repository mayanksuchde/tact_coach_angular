(function () {
    'use strict';
    angular
        .module('app')
        .service('FeedBackService',
        ['HttpRequestFactory', CreateFeedBackService]);

    function CreateFeedBackService(HttpRequestFactory) {
    	
        var feedsService = {};
        //correct

        feedsService.postFeedBack = postFeedBack;  
    
        function postFeedBack(projectid) {
            return HttpRequestFactory.getWithParam(`/cview/get/project/details/${projectid}/json`, projectid, false, true);
        }

        return feedsService
    }
    
})();