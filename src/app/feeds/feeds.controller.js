
/**
* Tact
*/

(function () {
    'use strict';
    angular
        .module('app')
        .controller('FeedController', FeedController);

        function FeedController($scope,$location,$q,$stateParams,Authentication,feedService, $timeout   )
        {
            var vm = this;
            
            vm.feedInfo = {};
            vm.getFeedInfo = getFeedInfo;
            vm.authentication = Authentication;
            vm.page = 1;
            vm.result = false;
            
            
            // REST call to get the feeds
            function getFeedInfo()
            {
                var deferred = $q.defer();
                var feedResult = {};
                var promise = feedService.getFeedInfo(vm.page);
                
                
                promise.then(function (response) {

                    
                    feedResult = (response && response.apivalue) ? response.apivalue : {};
                    vm.feedInfo.feeds = (feedResult && feedResult.feeds) ? feedResult.feeds : [];
                    vm.dynamicItems = new DynamicItems();
                
                    deferred.resolve(response);

                }, function (rejection) {
                
                    deferred.reject(rejection);
                });

                
                return deferred.promise;
            }

            // In this example, we set up our model using a class.
            // Using a plain object works too. All that matters
            // is that we implement getItemAtIndex and getLength.
            var DynamicItems = function() {
                /**
                 * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
                 */
                this.loadedPages = {};
    
                /** @type {number} Total number of items. */
                this.numItems = 0;
    
                /** @const {number} Number of items to fetch per request. */
                this.PAGE_SIZE = 50;
    
                this.fetchNumItems_();
            };
    
            // Required.
            DynamicItems.prototype.getItemAtIndex = function(index) {
                var pageNumber = Math.floor(index / this.PAGE_SIZE);
                var page = this.loadedPages[pageNumber];
    
                if (page) {
                return page[index % this.PAGE_SIZE];
                } else if (page !== null) {
                this.fetchPage_(pageNumber);
                }
            };
    
            // Required.
            DynamicItems.prototype.getLength = function() {
                return this.numItems;
            };
    
            DynamicItems.prototype.fetchPage_ = function(pageNumber) {
                // Set the page to null so we know it is already being fetched.
                this.loadedPages[pageNumber] = null;
    
                // For demo purposes, we simulate loading more items with a timed
                // promise. In real code, this function would likely contain an
                // $http request.
                $timeout(angular.noop, 300).then(angular.bind(this, function() {
                this.loadedPages[pageNumber] = [];
                var pageOffset = pageNumber * this.PAGE_SIZE;
                for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
                    this.loadedPages[pageNumber].push( vm.feedInfo.feeds[i] );
                }
                }));
            };
    
            DynamicItems.prototype.fetchNumItems_ = function() {
                // For demo purposes, we simulate loading the item count with a timed
                // promise. In real code, this function would likely contain an
                // $http request.
                $timeout(angular.noop, 300).then(angular.bind(this, function() {
                    this.numItems = vm.feedInfo.feeds.length;
                }));
            };
    

            
            getFeedInfo(vm.page);
        }
})();
 