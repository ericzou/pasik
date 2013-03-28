// TODO: fix this test
// describe("Bar Chart", function() {

//   var scope, $compiler, $controller;

//   var barChart;

//   beforeEach(module('pasik.charts.barChart'));

//   beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_) {
//     scope = _$rootScope_;
//     $compile = _$compile_;
//     $controller = _$controller_;


//   }));

//   describe("Static", function() {
//     beforeEach(function() {
//       var tpl =
//         "<bar-chart>" +
//            "<bar value=10>" +
//            "<bar value=10>" +
//            "<bar value=30>" +
//         "</bar-chart>"

//       element = angular.element(tpl);
//       $compile(element)(scope);
//       scope.$digest();
//       barChart = element.find('.bar-chart');
//     });

//     it("appends .bar-chart", function() {
//       dump(element);
//       expect(barChart.length).toEqual(1);
//     });

//     it("appends bars", function() {
//       var bars = barChart.find('.bar');
//       expect(bars.length).toEqual(3);
//     });
//   });


//   describe("Dynamic", function() {

//     var dataset;

//     beforeEach(function() {

//       var tpl =
//           "<bar-chart>" +
//             "<bar ng-repeat='datum in dataset' value='{{datum.value}}'></bar>" +
//           "</bar-chart>";


//       // var tpl = "<div><div class='bar' ng-repeat='datum in dataset' value='{{datum.value}}'></div></div>";
//       // dataset = [4, 7, 8, 7, 10, 2, 7, 9, 8, 7, 5, 3, 4, 3, 7, 8, 10, 7, 3, 5]
//       dataset = [
//         { label: "a", value: 10 },
//         { label: "b", value: 20 }
//       ]
//       element = angular.element(tpl);
//       $compile(element)(scope);
//       scope.$digest();
//     });

//     it("creats .bar for every element in dataset", function() {
//       var bars;
//       scope.dataset = dataset;

//       scope.$digest();
//       dump(element);
//       bars = element.find('.bar');
//       expect(bars.length).toEqual(dataset.length);
//     });
//   });

// });
