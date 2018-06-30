(function () {
    'use strict';
    angular
        .module('app')
        .service('anonymousService',
        ['HttpRequestFactory', createAnonymousService]);

    function createAnonymousService(HttpRequestFactory) {
        var anonymousService = {};

        anonymousService.anonymousReferralInfo=anonymousReferralInfo;  

        function anonymousReferralInfo(obj){
            //alert(JSON.stringify(obj))
            return HttpRequestFactory.post(`/public/refer/emails/without/session`,obj,false, true);            
        }

        return anonymousService
    }
})();