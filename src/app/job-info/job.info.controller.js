/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobInfoController', JobInfoController);

    function JobInfoController(HttpRequestFactory, $q, $stateParams, JobInfoService) {

        var vm = this;
       
        vm.jobInfoTitle = $stateParams.jpid ? $stateParams.jpid : ""
        vm.jobInfo = {}

        vm.getJobInfo = getJobInfo

        function getJobInfo() {
            var deferred = $q.defer();
            var promise = JobInfoService.getJobInfo(vm.jobInfoTitle);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.jobInfo = angular.copy(response.apivalue)
                } else {
                    vm.jobInfo = angular.copy({
                        "jpid": 1,
                        "post_title": "java developer",
                        "company_id": 1,
                        "created_date": 1509389038000,
                        "updated_date": 1509389038000,

                        "content": "<ul style=\"margin-top:-35px; margin-bottom:35px; color: #333333; font-family: Arial, sans-serif;\">\r\n" +
                        "\r\n<li>Job description  We have a small team of passionate developers who are constantly learning and always striving to write very efficient code.</li>"+
                        "\r\n<li>Some of the problems that we try to solve are developing highly scalable products following the best development practices, improving the usability and user experience and ensuring that our enterprise customers get an uninterrupted service 24/7. </li>" +
                        "\r\n<li>We are looking for a passionate and versatile Senior Java Software Developer who is able to learn new skills quickly, and who can thrive in a fast-paced environment along with a team of talented developers.</li>" +
                        "\r\n<li>Responsibilities  Design, develop, test, maintain and enhance software Work with stakeholders to clarify and define feature requirements and take ownership over projects Required Skills & Qualifications  Bachelor's degree in Engineering, Computer Science, Mathematics or Science, or equivalent education & experience Strong software development experience in Java (6 years+) Excellent communication skills (written and verbal) Highly detail-oriented Able to work well in a team environment Knowledge and experience in development and testing best practices including Spring Framework (3 and up) Hands on experience developing application on the Cloud and in containers Mobile application development (Android and/or iOS) Experience with PKI, Cryptography algorithms, Java cryptographic libraries, JavaScript and UI development and design Email standards</li>" +
                        "\r\n</ul>",
                    })
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
