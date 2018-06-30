(function () {
    'use strict';
    angular
        .module('app')
        .service('ArticleService',
        ['HttpRequestFactory', createArticleService]);

    function createArticleService(HttpRequestFactory) {
        var articleService = {};

        articleService.getViewArticleByTitle = getViewArticleByTitle;

        function getViewArticleByTitle(title) {
            return HttpRequestFactory.get(`/cview/get/micro_artile/${title}/json`);
        }

        return articleService
    }
})();