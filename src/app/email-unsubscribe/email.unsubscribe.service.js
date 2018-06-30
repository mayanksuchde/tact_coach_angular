(function () {
    'use strict';
    angular
        .module('app')
        .service('emailService',
        ['HttpRequestFactory', createEmailService]);

    function createEmailService(HttpRequestFactory) {
        var emailOptionService = {};

        emailOptionService.emailUnsubscribeOption = emailUnsubscribeOption;  
        emailOptionService.emailResubscribeOption = emailResubscribeOption;  
        
        function emailUnsubscribeOption(referrerid){
            return HttpRequestFactory.post(`/cview/unsubscribe/newsletter/by/referrerid/json`, referrerid, false, true);            
        }

        function emailResubscribeOption(referrerid){
            return HttpRequestFactory.getWithParam(`/cview/subscribe/newsletter/by/referrerid/json`, referrerid, false, true);            
        }

        return emailOptionService
    }
})();