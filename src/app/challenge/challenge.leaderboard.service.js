(function () {
    'use strict';
    angular
        .module('app')
        .service('leaderBoardService',
        ['HttpRequestFactory', createLeaderBoardService]);

    function createLeaderBoardService(HttpRequestFactory) {
    	
        var weeklyLeaderBoardService = {};

        weeklyLeaderBoardService.getWeeklyLeaderBoard = getWeeklyLeaderBoard;                

        function getWeeklyLeaderBoard() {
            return HttpRequestFactory.get(`/public/get/challenge/weekly/leaderboard/json`);
        }
        return weeklyLeaderBoardService
    }
    
})();