/*(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobController', JobController);

    function JobController(HttpRequestFactory, $q, $stateParams,companyJobInfoService) {

        var vm = this;
       
       // vm.articleTitle = $stateParams.articleId ? $stateParams.articleId : ""
        vm.jobInfo = {}

        jobInfo.company_name = $stateParams.company_name;

        jobInfo.post_title = $stateParams.position_name;


        var data

      //  vm.getViewArticleByTitle = getViewArticleByTitle

      vm.getJobInfo = getJobInfo

        function getJobInfo() {
            var deferred = $q.defer();
            var promise = companyJobInfoService.getJobInfo(jobInfo);
            alert(JSON.stringify(jobInfo));
            return;
            
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.jobInfo = angular.copy(response.apivalue)
                } else {
                    vm.jobInfo = angular.copy({
                      data=[
                            {
                            "id": 2234,
                            "job_title": "Job Developer",
                            "city": "Madurai",
                            "last_updated_date": "2017-07-09"                    
                            },
                             {
                            "id": 2346,
                            "job_title": "Job Developer",
                            "city": "Madurai",
                            "last_updated_date": "2017-07-09"                    
                            },
                             {
                            "id": 45,
                            "job_title": "Job Developer",
                            "city": "Madurai",
                            "last_updated_date": "2017-07-09"                    
                             },
                             {
                            "id": 4545,
                            "job_title": "Job Developer",
                            "city": "Madurai",
                            "last_updated_date": "2017-07-09"                    
                            }
                       
                        ] })
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function init() {
            vm.getJobInfo()
        }

        init()
    }
})();

                        */
                       (function () {
                        'use strict';
                    
                        angular
                            .module('app')
                            .controller('JobController', JobController);
                    
                        function JobController(Notification, JobService, $q, Authentication, Global, $state, $stateParams) {
                            
                            var vm = this;
                            vm.jobInfo = {}

                            jobInfo.company_name = $stateParams.company_name;

                            jobInfo.post_title = $stateParams.post_title;

                            //vm.searchKey = '';
                            vm.jobResults = [];
                    
                            vm.getJobInfo = getJobInfo;
                            function getJobInfo(isValid) {			
                                var deferred = $q.defer();
                                var promise = JobService.getJobInfo(jobInfo)
                                promise.then(function (response) {	
                                    if (response.apiresult == 0) {

                                        alert((jobInfo));
                                        return;
                                
                                        //Notification.success({message: 'Successfully sent', delay: 4000});
                                        vm.jobResults = [{
                                            "JPID" : "102",
                                            "COMPANY_ID" : "104",
                                            "POST_TITLE" : "hai",
                                            "CONTENT" : "hello",
                                            "CITY" : "mdu",
                                            "CREATED_DATE": "2018-03-20",
                                            "UPDATED_DATE" : "2018-03-20" }]
                                    } 
                                    
                                    deferred.resolve(response);
                                }, function (rejection) {
                                    deferred.reject(rejection);
                                });
                                return deferred.promise;
                            }
                            function init() {
                                vm.getJobInfo()
                            }
                    
                            init()
                    
                            
                        } 
                    
                        JobController.$inject = ['Notification', 'JobService', '$q', 'Authentication', 'Global', '$state', '$stateParams'];
                    })();
                                           