/*app.controller(
    'companysearchController',
    function(
        $scope,
        $location,
        CompanySearch) 
{
     CompanySearch.getcompanySearch(name).then(function(resp){
         if(resp.apimessage=="OK") {
             $scope.result = resp.apivalue[0]; 
            } else {
             $scope.result = 'Some weird error';
         }		
     })
     $scope.init=function()
     {
          $location.url('/fake-company-result') 	
     }
    
 });
 
(function () {
    'use strict';

    angular
        .module('app')
        .controller('companySearchController', companySearchController);

    function companySearchController(HttpRequestFactory, $q, $stateParams, CompanySearchService) {

        var vm = this;
        
        vm.fakeCompanyInfo = {}

        vm.getCompanySearch = getCompanySearch

        function getcompanySearch() {
            var deferred = $q.defer();
            var promise = CompanySearchService.getCompanySearch(vm.fakeCompanyInfo);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.articleInfo = angular.copy(response.apivalue)
                } else {
                    vm.articleInfo = angular.copy({
                        "mlid": 5,
                        "updated_date": 1506116889000,
                        "title": "What's the special with Micro article?",
                        "userid": 1002,

                        "content": "<ul style=\"margin-top:-35px; margin-bottom:35px; color: #333333; font-family: Arial, sans-serif;\">\r\n" +
                            "\r\n<li>Collected top 20-30 top keys used in Java and googled them to get to know more.</li>" +
                            "\r\n<li>Collected top 15 trendy keys about Java and learned them</li>" +
                            "\r\n<li>Watch top and related questions asked in Stackoverflow and understood them</li>" +
                            "\r\n<li>Try to ask valid questions in Stackoverflow and try to answer the answers I know</li>" +
                            "\r\n<li>One day a week specially allocated for Java topics and practiced them in my laptop</li>" +
                            "\r\n<li>Written sample codes in my personal github repository and analyzed the code and growth on Github repository</li>" +
                            "\r\n<li>Talk to friends/colleauges reguarly on specific keys and clarify with them like Thread management</li>" +
                            "\r\n</ul>",

                        "about_me": "<ul style=\"color: #333333; font-family: Arial, sans-serif;\">" +
                            "\r\n<li>Having 4.6 years exp in IT</li>" +
                            "\r\n<li>Started learning Java from Sep 2nd week</li>" +
                            "\r\n<li>Enjoy fishing and trekking</li>" +
                            "\r\n</ul>",
                        "tags": ["Password", "Safe", "Security" ]
                    })
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function init() {
            vm.getViewArticleByTitle()
        }

        init()
    }
})();
*/
 
(function () {
    'use strict';
    angular
        .module('app')
        .controller('companySearchController', companySearchController);

        function companySearchController($scope,$location,$q,companySearchService)
        {
            var vm = this;
            vm.fakeCompanyInfo = {};
            vm.getCompanySearch = getCompanySearch;
            vm.showCompanyDetail = showCompanyDetail;
            vm.user = {};
            vm.result = false;

            function getCompanySearch()
            {
                var deferred = $q.defer();



                vm.user.name = vm.name;
                //alert('t0 : '+vm.name);

                //alert('t1 : '+JSON.stringify(vm.user));
                //return;

                var companyResult = {};
                
                var promise = companySearchService.getCompanySearch(vm.user);
                promise.then(function (response) {

                    //alert(JSON.stringify(response));
                    //return;

                    //alert('trap 1.1');
                    companyResult = response.apivalue;
                    //lert('trap 1.2');    

                    showCompanyDetail(companyResult);

                    //vm.result = 'test 7';
                    //alert('trap 1.4');

                    //getCompanySearch(companyResult);

                   //vm.thankYou = companyResult.name;
                    //vm.thankYou = companyResult.founded;
                    //vm.thankYou = companyResult.authentication_score;
                   // vm.thankYou = companyResult.score_message;


                    /*
                    if (response.apiresult == 0) {
                        alert(JSON.stringify(resp.apivalue));
                        return;
                        $scope.result = resp.apivalue[0];
                        
                        //Notification.success({message: 'API called Successfully ', delay: 2000});
                        //$timeout(reloadPage, 2000); 
                    } else {
                        $scope.result = 'Some weird error';
                        //Notification.error({message: 'Not updated properly', delay: 2000});
                    }
                    */

                    deferred.resolve(response);
                }, function (rejection) {
                    deferred.reject(rejection);
                });
                return deferred.promise;
            }

            function updateDOM(){

            }

            function showCompanyDetail(result)
            {
               // vm.feedback = false;
                vm.result = true;

                //alert(JSON.stringify(result));
                //return;

                //alert(' :vm.companyName'  +vm.fakeCompanyInfo);
                //alert('result.name : ' +result.name);


                vm.fakeCompanyInfo.name = result.name;
                vm.fakeCompanyInfo.founded = "Founded : " + result.founded;
                vm.fakeCompanyInfo.authentication_score = result.authentication_score;
                vm.fakeCompanyInfo.message = result.message;
                vm.fakeCompanyInfo.criteria = result.criteria;
                //vm.company.founded = result.founded;                
                //vm.company.message = result.message;
            }
            
        }
})();
 