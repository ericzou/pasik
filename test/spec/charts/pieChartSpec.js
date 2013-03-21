'use strict'

// <pie-chart><slice value=10></slice><slice value=90></slice</pie-chart>
describe("Pie Chart", function() {
  var scope, $compile, $controller;

  beforeEach(module('pasik.charts.pieChart'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $controller = _$controller_;
  }));

  describe("static slices", function() {

    var element, pieChart;

    beforeEach(function() {
      var tpl = "<pie-chart>" + 
                  "<slice value=10></slice>" + 
                  "<slice value=90></slice>" + 
                "</pie-chart>"

      element = angular.element(tpl);
      $compile(element)(scope);
      scope.$digest();
      pieChart = element.find("svg g.pie-chart");
    });

    it("appends an pie-chart svg group", function() {
      expect(pieChart.length).toEqual(1);
    });

    it("appends g for each slices", function() {
      var slices = pieChart.find('g.slice');
      expect(slices.length).toEqual(2);
    });


  });

});