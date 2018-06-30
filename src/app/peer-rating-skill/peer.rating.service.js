(function () {
    'use strict';
    angular
        .module('app')
        .service('peerRatingService',
        ['HttpRequestFactory', createPeerRatingService]);

    function createPeerRatingService(HttpRequestFactory) {
        var peerRatingCommentService = {};

        peerRatingCommentService.peerRating = peerRating;  
        
        
        function peerRating(obj){
            return HttpRequestFactory.post(`/test/dummy/post`,obj, false, true);            
        }

        
        return peerRatingCommentService
    }
})();