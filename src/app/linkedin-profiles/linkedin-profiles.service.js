(function () {
    'use strict';
    angular
        .module('app')
        .service('LinkedinProfilesService',
        ['HttpRequestFactory', LinkedinProfilesService]);

    function LinkedinProfilesService(HttpRequestFactory) {
    	
        var feedsService = {};
        //correct

        feedsService.getLinkedinInfo = getLinkedinInfo;  
     
    
        function getLinkedinInfo() {
            return HttpRequestFactory.get(`/coachview/get/all/non/comment/profile/json`, '', false, true);
        }

        return feedsService
    }
    
})();