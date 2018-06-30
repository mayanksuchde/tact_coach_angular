(function () {
    'use strict';
    angular
        .module('app')
        .service('companySearchService',
        ['HttpRequestFactory', createCompanySearch]);

    function createCompanySearch(HttpRequestFactory) {
        var companysearchService = {};

        companysearchService.getCompanySearch = getCompanySearch;

        function getCompanySearch(obj) {
            //alert('service get bat : '+ JSON.stringify(obj));
            //return;
            return HttpRequestFactory.getWithParam(`/public/get/company/authentication/json`, obj, false, true);
        }

        return companysearchService
    }
})();