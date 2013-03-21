'use restrict'

pieChart = angular.module("pasik.charts.pieChart", []);

pieChart.controller("PieChartController", ['$scope', function($scope) {
  var width, height, radius;
  var pie, arc, chart;

  var slices = $scope.slices = [];
  var pieChart;

  this.addSlice = function(slice) {
    slices.push(slice);
  };

  this.initChart = function(element) {
    // hardcode for now
    width = height = radius = 100

    chart = d3.select(element[0])
      .append("svg")
      .append('g')
      .attr("class", "pie-chart");

    console.log("-----", chart);
    
    pie = d3.layout.pie().value(function(d) { return d.value });
    arc = d3.svg.arc().outerRadius(radius);
  };

  this.draw = function() {
    console.log("=-=====", slices);
    console.log("______", chart);
    chart.data(pie(slices))
      .append('g')
      .attr("class", "slice");
  }

}]);

pieChart.directive('pieChart', function() {
  return {
    restrict: "AE", 
    replace: true,
    controller: 'PieChartController',
    link: function(scope, element, attrs, pieChartController) {
      pieChartController.initChart(element);
    }
  }
});

pieChart.directive('slice', function() {
  return {
    require: '^pieChart',
    restrict: "AE", 
    link: function(scope, element, attrs, pieChartController) {
      pieChartController.addSlice(scope);
      pieChartController.draw();
    }
  }
});

