(function () {
    'use strict';
    angular
        .module('app')
        .service('ResumeService',
        ['HttpRequestFactory', createResumeService]);

    function createResumeService(HttpRequestFactory) {
        var ResumeService = {};

        ResumeService.submitResume = submitResume;
        ResumeService.getResume = getResume;

        function getResume(){
            return HttpRequestFactory.get(`/cview/get/resume/details/json`);
        }

        function submitResume(resumeInfo) {
            return HttpRequestFactory.post(`/cview/upload/resume/json`, resumeInfo, true);
        }

        return ResumeService
    }
})();