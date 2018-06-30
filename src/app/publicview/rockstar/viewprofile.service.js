(function () {
    'use strict';
    angular
        .module('app')
        .service('RSPService',
        ['HttpRequestFactory', createRSPService]);

    function createRSPService(HttpRequestFactory) {
    	
        var RSPService = {};

        RSPService.getRSPInfo = getRSPInfo;         
        RSPService.submitComment = submitComment;       

        function getRSPInfo(rid) {
            return HttpRequestFactory.get(`/eview/rockstar/${rid}/json`);
        }

        function submitComment(rockstarId, comments){
            return HttpRequestFactory.post(`/exview/add/rockstar/${rockstarId}/profile/comments/by/expert/json`, comments, false, true);
        }
        
        return RSPService
    }
    
})();