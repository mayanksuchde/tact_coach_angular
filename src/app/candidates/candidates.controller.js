/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('CandidatesController', CandidatesController);

    function CandidatesController(CandidatesService, $q, Authentication, Global, Notification, $state) {
        var vm = this;
        vm.candidates = [];
        vm.candidateSearchKey = '';
        vm.pageSize = 3;
        vm.currentPage = 1;
        vm.totalItems = 0;
        vm.ranges = [
            {
                "criteria_1_name": "learning_ability",
                "criteria_1_value": 5
            },
            {
                "criteria_2_name": "attitude",
                "criteria_2_value": 5
            },
            {
                "criteria_3_name": "matching_experience",
                "criteria_3_value": 5
            },
            {
                "criteria_4_name": "cultural_fit",
                "criteria_4_value": 5
            },
            {
                "criteria_5_name": "tool_exploring_skills",
                "criteria_5_value": 5
            }
        ];

        vm.filterCandidate = filterCandidate;

        function filterCandidate(){
            vm.filteredCandidates = [];
            angular.forEach(vm.candidates , function( candidate, index ){
                if( Object.values(candidate).indexOf(vm.candidateSearchKey) > -1 ){
                    vm.filteredCandidates.push(candidate);
                    vm.totalItems = filteredCandidates.length;
                }
            });
        }

        function getSelectionBar(value) {
            if (value <= 3)
                return 'red';
            if (value <= 6)
                return 'orange';
            if (value <= 9)
                return 'yellow';
            return '#2AE02A';
        }

        vm.learning_slider = {
            value: 5,
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 10,
                getSelectionBarColor: getSelectionBar,
                hideLimitLabels: false,
                onChange: function () {
                    vm.ranges[0].criteria_1_value = vm.learning_slider.value;
                },
                onEnd: getRangeProfiles
            }
        };

        vm.attitude_slider = {
            value: 5,
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 10,
                getSelectionBarColor: getSelectionBar,
                hideLimitLabels: true,
                onChange: function () {
                    vm.ranges[1].criteria_2_value = vm.attitude_slider.value;
                },
                onEnd: getRangeProfiles
            }
        };

        vm.expr_slider = {
            value: 5,
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 10,
                getSelectionBarColor: getSelectionBar,
                hideLimitLabels: true,
                onChange: function () {
                    vm.ranges[2].criteria_3_value = vm.expr_slider.value;
                },
                onEnd: getRangeProfiles
            }
        };

        vm.cultural_slider = {
            value: 5,
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 10,
                getSelectionBarColor: getSelectionBar,
                hideLimitLabels: true,
                onChange: function () {
                    vm.ranges[3].criteria_4_value = vm.cultural_slider.value;
                },
                onEnd: getRangeProfiles
            }
        };

        vm.tool_slider = {
            value: 5,
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 10,
                getSelectionBarColor: getSelectionBar,
                hideLimitLabels: true,
                onChange: function () {
                    vm.ranges[4].criteria_5_value = vm.tool_slider.value;
                },
                onEnd: getRangeProfiles
            }
        };

        function getRangeProfiles() {
            var params = [];
            var paramsUrl;

            angular.forEach(vm.ranges, function (obj, index) {
                var i = index + 1;
                var len = vm.ranges.length - 1;
                params.push(obj["criteria_" + i + "_name"] + "=" + obj["criteria_" + i + "_value"] + (len == index ? "" : "&"));
            })
            paramsUrl = params.join("");
            CandidatesService.getRangedProfiles(paramsUrl)
                .then(function (res) {

                });
        }

        function getCandidates() {
            var deferred = $q.defer();
            var promise = CandidatesService.getCandidates();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.filteredCandidates = response.apivalue ? response.apivalue.candidates : [];
                    vm.totalItems = vm.candidates.length;
                    // filterCandidate();
                }
                else {
                    Notification.error({ message: 'The email is already registered', delay: 2000 });
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        getCandidates();

        function selectedBar(bar) {
            if (bar != 0) {
                var param = "histogram_category:" + bar;
                CandidatesService.selectedBarProfiles(param)
                    .then(function (res) {

                    });
            }
        }

        var data = [[0, 51.6], [2, 59.0], [3, 49.2], [43, 63.0], [10, 53.6],
        [34, 59.0], [54, 47.6], [87, 69.8], [12, 66.8], [65, 75.2],
        [78, 55.2], [98, 54.2], [3, 62.5], [2, 42.0], [5, 50.0],
        [7, 49.8], [4, 49.2], [3, 73.2], [54, 47.8], [6, 68.8],
        [0, 50.6], [0, 82.5], [0, 57.2], [3, 87.8], [43, 72.8],
        [4.0, 54.5], [34.0, 59.8], [39.9, 67.3], [45.5, 67.8], [23.0, 47.0],
        [34.4, 46.2], [67.0, 55.0], [87.5, 83.0], [56.0, 54.4], [34.0, 45.8],
        [54.1, 53.6], [56.0, 73.2], [34.2, 52.1], [56.3, 67.9], [65.4, 56.6],
        [45.9, 62.3], [65.8, 58.5], [65.6, 54.5], [76.0, 50.2], [56.3, 60.3],
        [56.6, 58.3], [65.1, 56.2], [56.0, 50.2], [65.0, 72.9], [87.5, 59.8],
        [87.6, 61.0], [78.7, 69.1], [97.2, 55.9], [98.4, 46.5], [12.5, 54.3],
        [23.3, 54.8], [54.3, 60.7], [23.5, 60.0], [32.0, 62.0], [43.5, 60.3],
        [43.0, 52.7], [45.0, 74.3], [65.0, 62.0], [75.7, 73.1], [75.0, 80.0],
        [87.0, 54.7], [56.0, 53.2], [52.0, 75.7], [34.7, 61.1], [45.6, 55.7],
        [65.1, 48.7], [12.5, 52.3], [45.5, 50.0], [65.0, 59.3], [54.0, 62.5],
        [34.0, 55.7], [54.2, 54.8], [56.0, 45.9], [45.0, 70.6], [87.2, 67.2],
        [34.0, 69.4], [12.5, 58.2], [43.3, 64.8], [3.1, 71.6], [3.5, 52.8],
        [54.2, 59.8], [56.5, 49.0], [56.8, 50.0], [76.2, 69.2], [76.0, 55.9],
        [76.4, 63.4], [45.0, 58.2], [34.2, 58.6], [56.4, 45.7], [65.5, 52.2],
        [45.0, 48.6], [45.8, 57.8], [56.0, 55.6], [65.8, 66.8], [65.9, 59.4],
        [34.0, 53.6], [32.1, 73.2], [23.2, 53.4], [43.9, 69.0], [43.2, 58.4]];

        Highcharts.chart('search-chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'Profiles Rating Distribution'
            },
            xAxis: {
                gridLineWidth: 1
            },
            yAxis: [{
                title: {
                    text: 'Candidates count'
                }
            }],
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                //alert('rating '+this.x + ' candidate counts: ' + this.y);                                                                                                
                                switch (e.point.x) {
                                    case 0:
                                        selectedBar(1);
                                        break;
                                    case 20:
                                        selectedBar(2);
                                        break;
                                    case 40:
                                        selectedBar(3);
                                        break;
                                    case 60:
                                        selectedBar(4);
                                        break;
                                    case 80:
                                        selectedBar(5);
                                        break;
                                    default:
                                        selectedBar(0);
                                        break;
                                }
                            }
                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return 'Rating: <b>' + this.x + '</b>  Candidate counts: <b>' + this.y + '</b>';
                }
            },
            series: [{
                name: 'Rating',
                type: 'column',
                data: histogram(data, 20),
                pointPadding: 0,
                groupPadding: 0,
                pointPlacement: 'between'
            }]
        });

        /**
    * Get histogram data out of xy data
    * @param   {Array} data  Array of tuples [x, y]
    * @param   {Number} step Resolution for the histogram
    * @returns {Array}       Histogram data
    */
        function histogram(data, step) {
            var histo = {},
                x,
                i,
                arr = [];

            // Group down
            for (i = 0; i < data.length; i++) {
                x = Math.floor(data[i][0] / step) * step;
                if (!histo[x]) {
                    histo[x] = 0;
                }
                histo[x]++;
            }

            // Make the histo group into an array
            for (x in histo) {
                if (histo.hasOwnProperty((x))) {
                    arr.push([parseFloat(x), histo[x]]);
                }
            }

            // Finally, sort the array
            arr.sort(function (a, b) {
                return a[0] - b[0];
            });

            return arr;
        }

    }
    /**
     * initialize the controller
     */
    CandidatesController.prototype._init = function () {
        this.pageReady = "super";
    };

    CandidatesController.$inject = ['CandidatesService', '$q', 'Authentication', 'Global', 'Notification', '$state'];
})();
