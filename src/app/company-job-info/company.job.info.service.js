(function () {
    'use strict';
    angular
        .module('app')
        .service('JobService',
        ['HttpRequestFactory', createJobService]);

    function createJobService(HttpRequestFactory) {
        var jobService = {};

        jobService.getJobInfo=getJobInfo;  

        function getJobInfo(jobInfo){
            //alert(JSON.stringify(obj))
            return HttpRequestFactory.getWithParam(`/cview/get/jobs/description/json`,jobInfo,false, true);            
        }

        return jobService
    }
})();