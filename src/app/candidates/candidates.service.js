(function () {
    'use strict';
    angular
        .module('app')
        .service('CandidatesService',
        ['HttpRequestFactory', createCandidatesService]);

    function createCandidatesService(HttpRequestFactory) {
        var CandidatesService = {};

        CandidatesService.getCandidates = getCandidates;
        CandidatesService.getRangedProfiles = getRangedProfiles;
        CandidatesService.selectedBarProfiles = selectedBarProfiles;
       
        function getRangedProfiles(){
            return HttpRequestFactory.get('/coachview/view/rockstar/profile/json');
        }

        function selectedBarProfiles(){
            return HttpRequestFactory.get('/coachview/view/rockstar/profile/json');
        }

        function getCandidates(){
            return HttpRequestFactory.get(`/eview/candidates/json`);
        }

        return CandidatesService
    }
})();