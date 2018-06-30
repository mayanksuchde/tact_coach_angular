/**
 * Authentication service  
 */
(function () {
    'use strict';
    angular
        .module('app')
        .service('Authentication', function ($localStorage, $sessionStorage, $http, $q, Global, $state) {
            var userInfo = {};
            Global.setIsLoggedIn($sessionStorage.currentUser != null)
            
            return {

                storeSession: function (user) {
                    $sessionStorage.currentUser = user;
                    return true;
                },

                getCurrentUser: function () {
                    return $sessionStorage.currentUser;
                },

                isExpert: function () {
                    return $sessionStorage.currentUser && $sessionStorage.currentUser.expert ? $sessionStorage.currentUser.expert > 0: false;
                },

                isUserLoggedIn: function () {
                    if ($sessionStorage.currentUser != null) {
                        return true;
                    } else {
                        return false;
                    }
                },

                logout: function () {
                    $localStorage.$reset();
                    $sessionStorage.$reset();
                    $state.go('index')                    
                },

                setUserInfo: function (user) {
                    $localStorage.userInfo = user;
                },

                getUserInfo: function () {
                    return $localStorage.userInfo;
                }
            }
        })
}()) 