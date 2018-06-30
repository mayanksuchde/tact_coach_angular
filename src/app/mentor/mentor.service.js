(function () {
    'use strict';
    angular
        .module('app')
        .service('MentorService',
        ['HttpRequestFactory', createMentorService]);

    function createMentorService(HttpRequestFactory) {
        var mentorService = {};

        mentorService.getMentors = getMentors;
        mentorService.getMentorInfo = getMentorInfo; 

        function getMentors() {
            return HttpRequestFactory.get(`/public/get/mentors/1/json`);
        }

        function getMentorInfo(title) {
            return HttpRequestFactory.get(`/cview/get/mentor/info/${title}/json`);
        }
        
        return mentorService
    }
})();