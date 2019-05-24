describe("", function() {
  var rootEl;
  beforeEach(function() {
    rootEl = browser.rootEl;
    browser.get("build/docs/examples/example-ng-bind-html/main.html");
  });
  
it('should check ng-bind-html', function() {
  expect(element(by.binding('myHTML')).getText()).toBe(
      'I am an HTMLstring with links! and other stuff');
});
});