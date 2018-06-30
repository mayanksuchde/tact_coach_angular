/**
* tact
*/
'use strict';

describe('Directive: backButton', function() {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('app', 'my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    var template = $templateCache.get('app/page-header/page-header.html');
    $templateCache.put('app/page-header/page-header.html', template);
  }));

  it('Replaces the element with the appropriate content', function() {
    element = $compile('<page-header></page-header>')($rootScope);
    $rootScope.$digest();
    expect(1).toBe(1);
    expect(element.html()).toContain('Angular Starter Kit');
  });
});
