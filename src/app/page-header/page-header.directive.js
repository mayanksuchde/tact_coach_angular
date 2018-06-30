(function () {
  'use strict';

  /**
  * @desc page-header component that can be used show the pages's header
  * @file page.header.component.js
  * @example <page-header></page-header>
  */
  angular.module('app').component('pageHeader', {
    templateUrl: "app/page-header/page-header.html",
    controllerAs: 'vm',
    controller: 'pageHeaderController'
  });

  angular.module('app').controller('pageHeaderController',
    ['Global', 'Authentication', '$state', 'googleService',
      createPageHeaderController]);



  function createPageHeaderController(
    Global, Authentication, $state, googleService) {
    var vm = this;
    vm.global = Global;
    vm.auth = Authentication;
    vm.logout = function () {
      Authentication.logout()
      googleService.signOut();
      vm.global.setIsLoggedIn(Authentication.isUserLoggedIn())
    }

    vm.refresh = function () {
      vm.username = vm.auth.getCurrentUser() ? vm.auth.getCurrentUser().username : ''
    }
    vm.refresh();
  };

})();
