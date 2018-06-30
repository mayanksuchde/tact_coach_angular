/**
* Tact
*/
(function() {
	'use strict';

	angular
    	.module('app')
    	.directive('pageFooter', pageFooter);

	function pageFooter() {
		return {
			restrict: 'E',
			templateUrl: 'app/page-footer/page-footer.html'
		};
	}
	
	
	angular
	.module('app')
	.directive('pageShortFooter', pageShortFooter);

	function pageShortFooter() {
		return {
			restrict: 'E',
			templateUrl: 'app/page-footer/page-short-footer.html'
		};
	}
	
})();
