(function () {
    'use strict';

    /**
    * @desc problem solved component that can be used show the problem solved information
    * @file problem.solved.component.js
    * @example <project-links-component></project-links-component>
    */
    angular
        .module('app')
        .component('projectLinksComponent', {
            templateUrl: "app/settings/project-links/project-links.html",
            controllerAs: 'vm',
            controller: 'projectLinksComponentController'
        });

    angular.module('app').controller('projectLinksComponentController',
        [
            'HttpRequestFactory',
            '$q',
            createProjectLinksComponentController]);

    function createProjectLinksComponentController(
        HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.test = "success";
        vm.projectLinks = [];

        vm.getprojectLinks = getprojectLinks;
        vm.saveProjectLinks = saveProjectLinks;
        vm.addLinks = addLinks;

        vm.refresh = function(){

            var projectLinksObj = {};
            projectLinksObj.project_link = "";
            // getprojectLinks();
            vm.projectLinks.push(projectLinksObj);
        }
        vm.refresh();

        function addLinks(){
            var projectLinksObj = {};
            projectLinksObj.project_link = "";
            vm.projectLinks.push(projectLinksObj);
        }

        function getprojectLinks(){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getprojectLinks();
            promise.then(function(response){
                if( response.apiresult == 0 ){
                    vm.projectLinksObj = response.apivalue;
                }
                deferred.resolve(response);
            }, function(rejection){
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function saveProjectLinks(){
            var links = [];
            if(vm.projectLinks && vm.projectLinks.length > 0 ){
                angular.forEach(vm.projectLinks, function(link, index){
                    if(link.length > 0){
                        links.push(link);
                    }
                });
            }
            var deferred = $q.defer();
            var promise = HttpRequestFactory.saveProjectLinks(vm.projectLinks[0]);
            promise.then(function(response){
                if( response.apiresult == 0 ){
                    Notification.success('Successfully Saved');
                }else{
                    Notification.error('Unable to save the details. Try again later.');
                }
                deferred.resolve(response);
            }, function(rejection){
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

   };

})();