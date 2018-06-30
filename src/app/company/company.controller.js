/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('CompanyController', CompanyController);

    function CompanyController(HttpRequestFactory, $q, $stateParams) {
        var vm = this;
        vm.fetchCompanyDetails = fetchCompanyDetails;
        vm.companyId = $stateParams.companyId ? $stateParams.companyId : -1
        this._init();

        function fetchCompanyDetails(){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.fetchCompanyDetails(vm.companyId);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.companyInfo = response.apivalue
                    vm.companyInfo.tech_stack_keys = vm.companyInfo.tech_stack_keys.split(",")
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        };
    }

    /**
     * initialize the controller
     */
    CompanyController.prototype._init = function () {
        this.pageReady = "super";
        this.fetchCompanyDetails();
    };

    CompanyController.prototype.submitLogin = function (isValid) {
        var vm = this;
        // If the form is not validated, show an error message
        if (!isValid) {
            alert("Form is invalid")
            return;
        }

    };

    CompanyController.$inject = ['HttpRequestFactory', '$q', '$stateParams'];
})();
