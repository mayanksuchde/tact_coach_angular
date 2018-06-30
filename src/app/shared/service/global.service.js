(function(){
    'use-strict';
    angular
    .module('app')
    .factory('Global', [GlobalService])

    function GlobalService(){
        var vm = this;
        vm.IsLoggedIn = false
        vm.IsEmployerLoggedIn = false        
        vm.toRequestState = ''
        vm.user = {}
        vm.employer = {}

        return {
            setIsLoggedIn: (IsLoggedIn) => {
                vm.IsLoggedIn = IsLoggedIn
            },
            getIsLoggedIn: () => vm.IsLoggedIn,
            setToRequestState: (toRequestState) => {
                vm.toRequestState = toRequestState
            },
            setIsEmployerLoggedIn: (IsLoggedIn) => {
                vm.IsEmployerLoggedIn = IsLoggedIn
            },
            getIsEmployerLoggedIn   : () => vm.IsEmployerLoggedIn,
            getToRequestState: () => vm.toRequestState
        };
    }
})()