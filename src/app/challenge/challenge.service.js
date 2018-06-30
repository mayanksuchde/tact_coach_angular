(function () {
    'use strict';
    angular
        .module('app')
        .service('ChallengeService',
        ['HttpRequestFactory', createChallengeService]);

    function createChallengeService(HttpRequestFactory) {
        var challengeService = {};

        challengeService.getChallenges = getChallenges;
        challengeService.getChallengeInfo = getChallengeInfo; 
        challengeService.acceptChallenge = acceptChallenge;
        challengeService.syncProject =syncProject;  
        challengeService.forwardChallenge = forwardChallenge;
        challengeService.finishProjectInfo = finishProjectInfo;
        
        function getChallenges() {
            return HttpRequestFactory.get(`/public/get/challenges/1/json`);
        }

        function getChallengeInfo(title) {
            return HttpRequestFactory.get(`/cview/get/challenge/info/${title}/json`);
        }
         // To do: remove dummy api call
        function submitCodingLinks(codingLinks){
            return HttpRequestFactory.post(`/public/post/coding/info/json`, codingLinks);            
        }

        // To do: remove dummy api call
        function sharingInfo(emailInfo){
            return HttpRequestFactory.post(`/public/post/coding/info/json`, emailInfo);            
        }        

        function acceptChallenge(challengeId){
            //alert(JSON.stringify(challengeId));
            //return;
            return HttpRequestFactory.post(`/cview/challenge/${challengeId}/accept/json`, null, false, true);            
        }

        function syncProject(challengeHistory, obj){
            //alert(JSON.stringify(obj))
            //return;
           return HttpRequestFactory.post(`/cview/update/challenge/${challengeHistory}/project_link/json`,obj,false, true); 
        }

        function forwardChallenge(challengeId, obj){
            //alert(JSON.stringify(obj));
            //return;

            return HttpRequestFactory.getWithParam(`/cview/forward/challenge/${challengeId}/json`, obj);            
        }
        function finishProjectInfo(challengeHistory){
            return HttpRequestFactory.post(`/cview/finish/challenge/${challengeHistory}/json`,null, false, true);
        }

        
        
/*
       function acceptChallenge(challengeInfo){
        return HttpRequestFactory.post(`/test/dummy/post`, challengeInfo);            
    }
   */

        return challengeService
    }
})();