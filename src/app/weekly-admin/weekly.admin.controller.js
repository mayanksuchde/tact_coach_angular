/**
* Tact
*/

(function () {
    'use strict';
    angular
        .module('app')
        .controller('WeeklyAdminController', WeeklyAdminController);

        function WeeklyAdminController($scope,$location,$q,$stateParams,adminReportService)
        {
            var vm = this;

            vm.adminReportInfo = {};
            vm.getAdminReportInfo = getAdminReportInfo;
            vm.showAdminReportDetail = showAdminReportDetail;
           // vm.user = {};
            vm.result = false;
            
            //alert('ttt')

            function getAdminReportInfo()
            {
                var deferred = $q.defer();

                //alert('trap 1.2');

                var reportResult = {};
                
                var promise = adminReportService. getAdminReportInfo();
                promise.then(function (response) {
                    

                    reportResult = response.apivalue;

                    
                    showAdminReportDetail(reportResult);
 
                    deferred.resolve(response);
                }, function (rejection) {
                    deferred.reject(rejection);
                });
                return deferred.promise;
            }

            function updateDOM(){

            }

            function showAdminReportDetail(result)
            {
               // vm.feedback = false;
                vm.result = true;

                vm.adminReportInfo.toal_registration_count = result.toal_registration_count;
                vm.adminReportInfo.total_challenges_viewed = result.total_challenges_viewed;
                vm.adminReportInfo.registration_count = result.registration_count;
                vm.adminReportInfo.login_count = result.login_count;
                vm.adminReportInfo.updated_profile_count = result.updated_profile_count;
                vm.adminReportInfo.challenge_engaged_count = result.challenge_engaged_count;
                vm.adminReportInfo.challenge_finished_count = result.challenge_finished_count;
                vm.adminReportInfo.profile_completed = result.profile_completed;
                vm.adminReportInfo.kpi_history = result.kpi_history;
                

                angular.forEach(vm.adminReportInfo.kpi_history, function (result) {
                    vm.adminReportInfo.kpi_history.push(result); // this is not working when highcharts load values. Please fix this
                   });

                   Highcharts.chart('container', {

                    title: {
                        text: 'TACT - Weekly KPI'
                    },
                
                    subtitle: {
                        text: ''
                    },
                
                    yAxis: {
                        title: {
                            text: 'KPI Score'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 1
                        }
                    },
                
                    series: [
                                {
                                    name : 'KPI VALUE',
                                    data : vm.adminReportInfo.kpi_history
                                }
                            ],
                
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                
                });
                
                
                
                
                
                        
                   
            }
            
            getAdminReportInfo();
        }
})();
 