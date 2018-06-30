(function () {
    'use strict';
    angular
        .module('app')
        .service('adminReportService',
        ['HttpRequestFactory', createAdminReportService]);

    function createAdminReportService(HttpRequestFactory) {
    	
        var weeklyAdminReportService = {};

        weeklyAdminReportService.getAdminReportInfo = getAdminReportInfo;                

        function getAdminReportInfo() {
            return HttpRequestFactory.get(`/public/get/weekly/report/admin/json`);
        }
        return weeklyAdminReportService
    }
    
})();