/**
 * Search Controller which handles the search and filter operation of recruiter
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('psaController', psaController);

	function psaController($state, $sessionStorage, $stateParams, $q, Notification, PSAEntryService) {
		var vm = this;
		vm.candidates = [];
		vm.pageSize = 3;
		vm.currentPage = 1;
		vm.totalItems = 0;
		if ($stateParams.email == undefined || $stateParams.email == '') {
			vm.email = "raja.r.csp@gmail.com";
		} else {
			vm.email = $stateParams.email;
		}

		var tech_frequency_entries_1 = [];
		//var tech_frequency_entries = [];
		//var polor_tags =[ "java, linux","java","mysql","angular"]
		var graph_entries_array_2 = []; //it will be enabled once the 5-users-average implemented
		var polor_tags = ["file", "concurrency", "caching", "AngularJs", "jodatime"];
		var polor_entries = [10, 20, 16, 45, 25];

		var entries_array = [];
		var peer_entries_array = [];

		vm.getPaging = getPaging
		vm.getPSAEntries = getPSAEntries

		function getPaging() {
			var deferred = $q.defer();
			var promise = PSAEntryService.getPaging(vm.email, vm.currentPage);
			promise.then(function (response) {
				if (response.apiresult == 0) {
					vm.currentPage++
				} else {
					Notification.error({ message: 'Not updated properly', delay: 2000 });
				}
				deferred.resolve(response);
			}, function (rejection) {
				deferred.reject(rejection);
			});
			return deferred.promise;
		}

		function getPSAEntries() {
			PSAEntryService.getPSAEntries(vm.email)
				.then(function (resp) {

					//alert('api value '+JSON.stringify(resp.apivalue));

					// debugger;
					vm.candidates = resp.apivalue.entries_content;
					vm.totalItems = resp.apivalue.entries_content.length;

					vm.tech_frequency_entries_1 = resp.apivalue.tech_frequency_entries_1;
					//vm.tech_frequency_entries = resp.apivalue.tech_frequency_entries;
					vm.peer_entries_array = resp.apivalue.peer_entries_array;
					// vm.entries_heatmap = resp.apivalue.entries_heatmap;

					vm.entries_array = resp.apivalue.entries_array;
					vm.peer_entries_array = resp.apivalue.peer_entries_array;

					polor_tags = resp.apivalue.polor_tags;
					polor_entries = resp.apivalue.polor_entries;

					//  polor_tags = resp.apivalue.polor_tags;
					//  polar_values = resp.apivalue.polor_entries;

					//alert(vm.graph_entries);  
					//return;      

					//vm.graph_entries_array = [];
					angular.forEach(vm.tech_frequency_entries_1, function (value) {
						tech_frequency_entries_1.push(value); // this is not working when highcharts load values. Please fix this
					});

					/*	angular.forEach(vm.tech_frequency_entries, function (value) {
							vm.tech_frequency_entries.push(value); // this is not working when highcharts load values. Please fix this
						});*/
					angular.forEach(vm.entries_array, function (value) {
						vm.entries_array.push(value);
					});


					// fill peer entries array for chart            
					angular.forEach(vm.peer_entries_array, function (value) {
						vm.peer_entries_array.push(value);
					});

					// total learning points
					vm.total_learning_points = resp.apivalue.total_learning_points;

					// average unique meter
					vm.average_unique_meter = resp.apivalue.average_unique_meter;

					// best entries day
					vm.best_entries_day = resp.apivalue.best_entries_day;

					// best entries hour
					vm.best_entries_hour = resp.apivalue.best_entries_hour;

					vm.start_year = resp.apivalue.start_year ? resp.apivalue.start_year : 0;
					vm.start_month = resp.apivalue.start_month ? resp.apivalue.start_month : 0;
					vm.start_date = resp.apivalue.start_date ? resp.apivalue.start_date : 0;

					//alert(vm.start_year + " - "+vm.start_month-1 + " - "+vm.start_date);
					//return;

					var startDate = Date.UTC(vm.start_year, vm.start_month - 1, vm.start_date, 0, 0, 0);
					//alert(new Date(startDate));
					Highcharts.chart('container', {
						chart: {
							type: 'scatter',
							zoomType: 'xy'
						},
						title: {
							text: 'Learning Analytics'
						},
						subtitle: {
							text: ''
						},
						xAxis: {
							title: {
								enabled: true,
								text: 'Tech Components'
							},
							startOnTick: true,
							endOnTick: true,
							showLastLabel: true
						},
						yAxis: {
							title: {
								enabled: true,
								text: 'Depth of learning'
							},
							startOnTick: true,
							endOnTick: true,
							showLastLabel: true
						},
						legend: {
							layout: 'vertical',
							align: 'left',
							verticalAlign: 'top',
							x: 100,
							y: 70,
							floating: true,
							backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
							borderWidth: 1
						},
						plotOptions: {
							scatter: {
								marker: {
									radius: 1.5,
									states: {
										hover: {
											enabled: true,
											lineColor: 'rgb(100,100,100)'
										}
									}
								},
								states: {
									hover: {
										marker: {
											enabled: false
										}
									}
								},
								tooltip: {
									headerFormat: '<b>{series.name}</b><br>',
									pointFormat: '{point.y} '
								}
							}
						},
						series: [{
							name: 'Your Learning entries',
							color: 'rgba(223, 83, 83, .5)',
							data: tech_frequency_entries_1
						}]
					});


					Highcharts.chart('psaSpline', {
						chart: {
							type: 'spline'
						},
						title: {
							text: 'Daily Entries'
						},
						subtitle: {
							text: ''
						},
						xAxis: {
							type: 'datetime',
							labels: {
								overflow: 'justify'
							}
						},
						yAxis: {
							title: {
								text: 'Entries'
							},
							minorGridLineWidth: 0,
							gridLineWidth: 0,
							alternateGridColor: null,
						},
						tooltip: {
							valueSuffix: ' entries'
						},
						plotOptions: {
							spline: {
								lineWidth: 2,
								states: {
									hover: {
										lineWidth: 5
									}
								},
								marker: {
									enabled: false
								},
								pointInterval: 3600 * 1000 * 24, // one hour
								pointStart: startDate
							}
						},
						series: [
							{
								name: 'Your Learning entries',
								data: vm.entries_array

							}
							//it will be enabled once the 5-users-average implemented
							, {
								name: 'Peers Learning entries',
								data: vm.peer_entries_array,
								dashStyle: 'Dot'
							}
						],
						navigation: {
							menuItemStyle: {
								fontSize: '10px'
							}
						}
					});
					/*var ctx = document.getElementById('myChart').getContext('2d');
					var data = {
						datasets: [{
							data: polor_entries,
							backgroundColor: [
								'#C4D1D5',
								'#adcdd6',
								'#aecfe3',
								'#7a9fa5',
								'#8aa4ab'
											  ]
						}],
						
						// These labels appear in the legend and in the tooltips when hovering different arcs
						labels: polor_tags
				};
				var chart = new Chart(ctx, {
					data: data,
					type: 'scatter'
				});*/


				});
		} //getPSAEntries

		getPSAEntries();

	} //-contoller
})();
/**
 * Search Controller which handles the search and filter operation of recruiter
 
(function () {
    'use strict';

    angular
        .module('app')
        .controller('psaController',psaController );

        function psaController(vm, $state, $sessionStorage, $stateParams, PSAEntryService)
        {
            var vm = this;
            vm.candidates = [];
            vm.pageSize = 3;
            vm.currentPage = 1;
            vm.totalItems = 0;
            if ($stateParams.email == undefined || $stateParams.email == '') {
                vm.email = "raja.r.csp@gmail.com";
            } else {
                vm.email = $stateParams.email;
			}
			
			//vm.dummyItems = _.range(1, 50);
			var graph_entries_array = [];
            var graph_entries_array_2 = []; //it will be enabled once the 5-users-average implemented
            var polar_labels = ['Java', 'Javascript', 'Python', 'Spring MVC', 'Mysql']; 
			var polar_values = [10, 20, 16, 45, 25];
			
			//vm.pager = {};
        	//vm.setPage = setPage;
			vm.getPSAEntries = getPSAEntries

			initController();

			function initController() {
				// initialize to page 1
				vm.setPage(1);
			}*/

		/*	function setPage()
			{
				var deferred = $q.defer();

				var promise = PSAEntryService.setPage();

				promise.then(function (response) {
					if (response.apiresult == 0) {
					vm.currentPage++
						
					} else {
						Notification.error({message: 'Not updated properly', delay: 2000});
					}
					deferred.resolve(response);
				}, function (rejection) {
					deferred.reject(rejection);
				});
				return deferred.promise;
			}*/

			/*

            function getPSAEntries()
            {
                PSAEntryService.getPSAEntries(vm.email)
                .then(function (resp) {
                	
                	//alert('api value '+JSON.stringify(resp.apivalue));
                    
                	// debugger;
                    vm.candidates = resp.apivalue.entries_content;
                    vm.totalItems = resp.apivalue.entries_content.length;
        
                    vm.graph_entries = resp.apivalue.entries_array;
                    vm.peer_entries_array= resp.apivalue.peer_entries_array;
                   // vm.entries_heatmap = resp.apivalue.entries_heatmap;
                    
                    polar_labels = resp.apivalue.polor_tags;
                    polar_values = resp.apivalue.polor_entries;
        
                    //alert(vm.graph_entries);  
                    //return;      
        
                    //vm.graph_entries_array = [];
                    angular.forEach(vm.graph_entries, function (value) {
                     graph_entries_array.push(value); // this is not working when highcharts load values. Please fix this
                    });
                     // fill peer entries array for chart            
                    angular.forEach(vm.peer_entries_array, function (value) {
            	        graph_entries_array_2.push(value);
                    });
                    
                    // total learning points
		            vm.total_learning_points = resp.apivalue.total_learning_points;
		            
		            // average unique meter
		            vm.average_unique_meter = resp.apivalue.average_unique_meter;
		            
		            // best entries day
		            vm.best_entries_day = resp.apivalue.best_entries_day;
		            
		            // best entries hour
		            vm.best_entries_hour = resp.apivalue.best_entries_hour;
		
		            vm.start_year = resp.apivalue.start_year ? resp.apivalue.start_year: 0;
		            vm.start_month = resp.apivalue.start_month ? resp.apivalue.start_month: 0;
		            vm.start_date = resp.apivalue.start_date ? resp.apivalue.start_date: 0;
		            
		            //alert(vm.start_year + " - "+vm.start_month-1 + " - "+vm.start_date);
		            //return;
		            
		            var startDate = Date.UTC(vm.start_year, vm.start_month-1, vm.start_date, 0, 0, 0);
		            //alert(new Date(startDate));

		            Highcharts.chart('psaSpline', {
		                chart: {
		                    type: 'spline'
		                },
		                title: {
		                    text: 'Daily Entries'
		                },
		                subtitle: {
		                    text: ''
		                },
		                xAxis: {
		                    type: 'datetime',
		                    labels: {
		                        overflow: 'justify'
		                    }
		                },
		                yAxis: {
	                    title: {
	                        text: 'Entries'
	                    },
	                    minorGridLineWidth: 0,
	                    gridLineWidth: 0,
	                    alternateGridColor: null,
		                },
		                tooltip: {
		                	valueSuffix: ' entries'
		                },
		                plotOptions: {
		                    spline: {
		                        lineWidth: 2,
		                        states: {
		                            hover: {
		                                lineWidth: 5
		                            }
		                        },
		                        marker: {
		                            enabled: false
		                        },
		                        pointInterval: 3600 * 1000 * 24, // one hour
		                        pointStart: startDate
		                    }
		                },
		                series: [
		                    {
		                        name: 'Your Learning entries',
		                        data: graph_entries_array,
		                        
		                    }
		                    //it will be enabled once the 5-users-average implemented
		                    ,{
		                        name: 'Peers Learning entries',
		                        data: graph_entries_array_2,
		                        dashStyle: 'Dot'
		                    }
		                   ],
		                   navigation: {
		                	   menuItemStyle: {
		                		   fontSize: '10px'
		                	   }
		                   }
		            	});
    
		            var ctx = document.getElementById('myChart').getContext('2d');
		            var data = {
		            		datasets: [{
		            			data: polar_values,
		            			backgroundColor: [
		            			                  '#C4D1D5',
		            			                  '#adcdd6',
		            			                  '#aecfe3',
		            			                  '#7a9fa5',
		            			                  '#8aa4ab'
		            			                  ]
		            		}],
					
							// These labels appear in the legend and in the tooltips when hovering different arcs
		            		labels: polar_labels
		            };
		            var chart = new Chart(ctx, {
		            	data: data,
		            	type: 'polarArea'
		            });
                });        
            } //getPSAEntries
        
            getPSAEntries();
        
        } //-contoller
})();
*/