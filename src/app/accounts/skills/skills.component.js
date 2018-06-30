(function () {
    'use strict';

    /**
    * @desc skills component that can be used show the skills information
    * @file skills.component.js
    * @example <skills-component></skills-component>
    */
    angular
        .module('app')
        .component('skillsComponent', {
            templateUrl: "app/accounts/skills/skills.html",
            controllerAs: 'vm',
            controller: 'skillsComponentController'
        });

    angular.module('app').controller('skillsComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createSkillsComponentController]);

    function createSkillsComponentController(
    	Notification,		
        HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.getSkillsInfo = getSkillsInfo;
        vm.updateSkillsInfo = updateSkillsInfo;
        vm.addEmptySkillRow = addEmptySkillRow;
        vm.deleteRow = deleteRow;

        vm.skillsInfo = {};
        vm.skillsInfo.skills = []
        vm.helper = {}
        vm.helper.years = [];
        vm.helper.months = [];
        vm.helper.rating = []

        vm.refresh = function () {
            for (var i = 0; i < 16; i++) {
                var value = i
                if (i <= 12) {
                    vm.helper.months.push(value)
                }
                if (i <= 10) {
                    vm.helper.rating.push(value)
                }
                vm.helper.years.push(value)
            }
            vm.getSkillsInfo();
        }

        vm.refresh();

        function addEmptySkillRow() {
            vm.skillsInfo.skills.unshift({
                element: '',
                exp_months: 0,
                self_rating: 0,
                exp_years: 0
            })
        }

        function deleteRow(index) {
            vm.skillsInfo.skills.splice(index, 1);
        }

        function getSkillsInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getSkillsInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.skillsInfo.skills = angular.copy(response.apivalue);
                } else {
                    addEmptySkillRow();
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateSkillsInfo() {
            var data = {}
            angular.forEach(vm.skillsInfo.skills, function (value, key) {
                key++
                data["element_"+key] = value.element
                data["exp_years_"+key] = value.exp_years
                data["exp_months_"+key] = value.exp_months
                data["rating_"+key] = value.self_rating                
            });
            data["element_count"] = vm.skillsInfo.skills.length
            //alert(JSON.stringify(data))
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateSkillsInfo(data);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Successfully Saved', delay: 4000});
                } else {
                	Notification.error({message: 'Not upated properly', delay: 4000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }
    };

})();
