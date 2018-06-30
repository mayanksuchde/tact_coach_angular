/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticleController', ArticleController);

    function ArticleController(HttpRequestFactory, $q, $stateParams, ArticleService) {

        var vm = this;
        vm.articleTitle = $stateParams.articleId ? $stateParams.articleId : ""
        vm.articleInfo = {}

        vm.getViewArticleByTitle = getViewArticleByTitle

        function getViewArticleByTitle() {
            var deferred = $q.defer();
            var promise = ArticleService.getViewArticleByTitle(vm.articleTitle);
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
