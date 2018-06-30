(function () {
    'use strict';
    angular
        .module('app')
        .service('FCIService',
        ['HttpRequestFactory', createFCIService]);

    function createFCIService(HttpRequestFactory) {
        var FCIService = {};

        FCIService.getCompanyDetails = getCompanyDetails;

        function getCompanyDetails(searchKey) {
            return HttpRequestFactory.get(`/cview/get/micro_artile/${title}/json`);
        }

        return FCIService
    }
})();