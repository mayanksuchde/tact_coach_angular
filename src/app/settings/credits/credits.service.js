(function () {
    'use strict';
    angular
        .module('app')
        .service('CreditsService',
        ['HttpRequestFactory', createCreditsService]);

    function createCreditsService(HttpRequestFactory) {
        var creditsService = {};

        creditsService.getCreditsInfo = getCreditsInfo;

        function getCreditsInfo() {
            return HttpRequestFactory.get(`/cview/get/credits/json`);
        }

        return creditsService
    }
})();

(function () {
    'use strict';
    angular
        .module('app')
        .service('CreditsServicePost',
        ['HttpRequestFactory', createCreditsServicePost]);

    function createCreditsServicePost(HttpRequestFactory) {
        var creditsServicePost = {};

        creditsServicePost.updateCreditsInfo = updateCreditsInfo;

        function updateCreditsInfo(data) {
            return HttpRequestFactory.get(`/cview/get/credits/${data}/json`);
        }

        return creditsServicePost
    }
})();