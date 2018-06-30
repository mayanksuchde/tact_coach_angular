/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('RSPController', RSPController);

    function RSPController(HttpRequestFactory, $q, $stateParams, RSPService, Notification, Authentication, $state) {

        var vm = this;
        vm.rid = $stateParams.rid ? $stateParams.rid : ""
		vm.i = {} // (short format for vm.info)
		vm.commentInfo = {
			comments: ""
		};
		vm.submitComment = submitComment;
		vm.moveTologin = moveTologin;

		vm.auth = Authentication;

		vm.getRSPInfo = getRSPInfo
		
		function moveTologin(){
			$state.go('login');
		}

        function getRSPInfo(rid) {
            var deferred = $q.defer();
            var promise = RSPService.getRSPInfo(rid);
            
            promise.then(function (response) {
				
				if (response.apiresult == 1011) { 
				// set repsonce value
				vm.i.response = response.apiresult;
				}
				if (response.apiresult == 0) {
					vm.i = angular.copy(response.apivalue);
					// set repsonce value
					vm.i.response = response.apiresult;					
                    //alert(JSON.stringify(vm.i.ps_entries));                    
                    //alert(vm.i.ps_entries.length);                    
                    //alert(JSON.stringify(vm.rspInfo));

                    var elements = [];
                    var expert_rating = [];
                    var peer_rating = [];
                    var self_rating = [];
                    
                    angular.forEach(vm.i.skills, function(obj, index){
                        elements.push(obj.element);
                        self_rating.push(obj.self_rating || 0);
                        peer_rating.push(obj.peer_rating || 0);
                        expert_rating.push(obj.expert_rating || 0);            
                    });                                       
                    
                    plotSkillChart(elements, expert_rating, peer_rating, self_rating);
                    
                    vm.i.test = 'hello';
                    
                    //alert(vm.i.test);
                    
                    // plot Strong Areas Graph
                    vm.i.candidateStrongAreas = vm.i.strong_areas;
                    //alert(JSON.stringify(vm.i.strong_areas));
                    if(isNotEmpty(vm.i.strong_areas)){
                    	vm.i.strongAreasData = [];                    
                    	for( var i in vm.i.candidateStrongAreas) {
                    		if ( ! vm.i.candidateStrongAreas.hasOwnProperty(i)) {
                    			continue;
                    		}
                    		var temp = {name:i, y:vm.i.candidateStrongAreas[i]}
                        
                    		vm.i.strongAreasData.push(temp);                        
                    	}               
                    	plotPieChart(vm.i.strongAreasData, 'strongAreasContainer');
                    } else {
                    	$('#strong_area_section').hide();
                    }       
                    
                    // PSA Entries
                    if(isNotEmpty(vm.i.psa_entries)){
                    	
                    	//alet(JSON.stringify(vm.i.psa_entries))
                    	
                    	var polar_labels = vm.i.psa_entries.polor_tags; 
                    	var polar_values = vm.i.psa_entries.polor_entries;
                    
                    	//plotPSAEntries(polar_values, polar_labels); //hide PSA at the moment
                    	
                    } else {
                    	//alert('sss')
                    	$('#la_box').hide();
                    }
                    
                } else {
                	//alert('not found');                	
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            
            
            
            return deferred.promise;
		}   
		
		function submitComment(isValid){
			if(!isValid){
				Notification.error({message: 'Form validation error!', delay: 2000});
				return;
			}
			var deferred = $q.defer();
			var promise = RSPService.submitComment(vm.rid, vm.commentInfo);                
            promise.then(function (response) {
                if (response.apiresult == 0) {
					Notification.success({message: 'Comments saved successfully!', delay: 2000});
					$timeout(reloadPage, 2000);
                }
                else {
					Notification.error({message: response.apimessage, delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
		}

        function init() {
            //vm.getBATQuestions()
        	vm.getRSPInfo(vm.rid)
        }

        
        init();
                
        function isNotEmpty(obj){
        	
        	//alert('tst')
        	
        	if( obj == undefined ){
        		return false;
        	}           
        	
            if( Object.getOwnPropertyNames(obj).length === 0 ){
            	return false;
            }
            
            return true;
        };
        
        
        function plotSkillChart(elements, expert_rating, peer_rating, self_rating){
        	
        	//alert('tst')            
        	
            Highcharts.chart('skillContainer', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Skills & Rating'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: elements ,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Out of 10',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [
                {
                     name: 'Expert Rating',
                     data: expert_rating
                },
                {
                    name: 'Peer Rating',
                    data: peer_rating
                }, 
                {
                    name: 'Self Rating',
                    data: self_rating
                }]
            });
        } //-plot skill chart
        
        function plotPieChart(data, container){
        	
        	//alert(JSON.stringify(data) + ' - '+JSON.stringify(container))

        	Highcharts.chart(container, {
        	    chart: {
        	        plotBackgroundColor: null,
        	        plotBorderWidth: null,
        	        plotShadow: false,
        	        type: 'pie'
        	    },
        	    title: {
        	        text: ''
        	    },
        	    tooltip: {
        	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        	    },
        	    plotOptions: {
        	        pie: {
        	            allowPointSelect: true,
        	            cursor: 'pointer',
        	            dataLabels: {
        	                enabled: true,
        	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        	                style: {
        	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        	                }
        	            }
        	        }
        	    },
        	    series: [{
        	        name: 'Brands',
        	        colorByPoint: true,
        	        data: data
        	    }]
        	});
        }
        
        function getStrongAreasPieChart(candidateStrongAreas, candidatePieStrongArea, strongLabels, strongData) {
            for( var i in candidateStrongAreas) {
                if ( ! candidateStrongAreas.hasOwnProperty(i)) {
                	continue;
                }
                var temp = {name:i, y:candidateStrongAreas[i]}
                candidatePieStrongArea.push(temp);
                strongLabels.push(i);
                strongData.push(candidateStrongAreas[i]);
            }
            //alert(JSON.stringify(candidatePieStrongArea));
        }
        
        
        function plotPSAEntries(polar_values, polar_labels){
        	
        	var graph_entries_array = vm.i.psa_entries.entries_array;
        	
        	var st_month = vm.i.psa_entries.start_month-1;
        	var st_year = vm.i.psa_entries.start_year;
        	var st_date = vm.i.psa_entries.start_date;
        	var startDate = Date.UTC(st_year, st_month, st_date, 0, 0, 0);
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
        				lineWidth: 4,
        				states: {
        					hover: {
        						lineWidth: 5
        					}
        				},
        				marker: {
        					enabled: false
        				},
        				pointInterval: 3600 * 1000 * 24, // one day
        				pointStart: startDate
        			}
        		},
        		series: [{
        			name: 'Learning Entries',
        			data: graph_entries_array
        		}],
        		navigation: {
        			menuItemStyle: {
        				fontSize: '10px'
        			}
        		}
        	}); //highcharts end
        	
        	
        	
        	/*
	         * source:
	         * 	http://www.chartjs.org/samples/latest/charts/polar-area.html
	         * 
	         * colors:
	         * 	http://www.color-hex.com/
	         */
        	
        	//alert(document.getElementById('myChart'));
        	
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
        }
        
    }
})();
