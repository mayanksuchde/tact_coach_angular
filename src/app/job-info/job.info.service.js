(function () {
    'use strict';
    angular
        .module('app')
        .service('JobInfoService',
        ['HttpRequestFactory', createJobInfoService]);

    function createJobInfoService(HttpRequestFactory) {
        var jobInfoService = {};

        jobInfoService.getJobInfo = getJobInfo;

        function getJobInfo(jpid) {
            return HttpRequestFactory.get(`/coachview/get/job/post/by/id/{jpid}/json`);
        }

        return jobInfoService
    }
})();