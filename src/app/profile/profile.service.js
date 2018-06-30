(function () {
    'use strict';
    angular
        .module('app')
        .service('ProfileService',
        ['HttpRequestFactory', createProfileService]);

    function createProfileService(HttpRequestFactory) {
        var profileService = {};

        profileService.getViewProfileInfo = getViewProfileInfo;

        function getViewProfileInfo() {
            return HttpRequestFactory.get('/cview/view/myprofile/json');
        }

        return profileService
    }
})();