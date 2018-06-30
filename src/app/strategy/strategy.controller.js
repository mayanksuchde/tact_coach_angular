/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('StrategyController', StrategyController);
    
    function StrategyController(HttpRequestFactory, $q, $stateParams, StrategyService) {
        var vm = this
        
        vm.strategyInfo = {}
        vm.getStrategyInfo = getStrategyInfo
       // vm.strategy = {}

        function getStrategyInfo(){
            var deferred = $q.defer();

            //vm.strategy.page = vm.page;

            //alert('trap 1');
            //var page = vm.strategyInfo.page;
            //alert('trap 2')

            var promise = StrategyService.getStrategyInfo();
            promise.then(function (response) {


                if (response.apiresult == 0) {
                    
                	//alert(JSON.stringify(response.apivalue));
                	//return;
                	vm.strategyInfo = angular.copy(response.apivalue)
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        
        }
        

        function init(){
            vm.getStrategyInfo()
        }

        init()
        
    }
})();
