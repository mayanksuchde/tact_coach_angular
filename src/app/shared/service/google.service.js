(function () {
    /*
     * Tact
     */
    angular.module('app')
        .service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
            var clientId = '391445302189-7vk7183ot4uu2te0k41oj2utp181qk1k.apps.googleusercontent.com',
                scopes = 'email profile openid plus.login',
                deferred = $q.defer();
            var auth2 = null;
            var vm = this;

            vm.login = function () {
                var signInPromise = gapi.auth2.getAuthInstance().signIn()
                    .then(function (googleUser) {
                        var profile = googleUser.getBasicProfile();
                        var googleUserAccountInfo = {};
                        googleUserAccountInfo.email = profile.getEmail();
                        googleUserAccountInfo.name = profile.getName();
                        googleUserAccountInfo.imageUrl = profile.getImageUrl();
                        googleUserAccountInfo.userid = profile.getId();
                        deferred.resolve(googleUserAccountInfo);
                    }, function (rejection) {
                        deferred.reject(rejection);
                    });

                return deferred.promise;
            }

            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    clientId: clientId,
                    scopes: scopes,
                    cookie_policy: 'none',
                    fetch_basic_profile: true,
                    immediate: true                    
                });
            });

            vm.signOut = function () {
                auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    auth2.disconnect();
                });
            }

        }]);
})()