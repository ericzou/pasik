'use restrict'

pieChart = angular.module("pasik.charts.pieChart", []);

pieChart.controller("PieChartController", ['$scope', function($scope) {
  var width, height, radius;
  var pie, arc, chart;
  var pieChart;

  this.slices = [];

  this.addSlice = function(slice) {
    this.slices.push(slice);
  };

  this.initChart = function(element) {
    // hardcode for now
    width = height = 26;
    radius = 13
    chart = d3.select(element[0])
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
        .attr("class", "pie-chart")
        .attr("transform", "translate(13, 13)");

    pie = d3.layout.pie().value(function(d) { return d; });
    arc = d3.svg.arc().outerRadius(radius);

    chart.selectAll('.slice')
      .data(pie(this.slices.map( function(slice){ return slice.value; })))
      .enter()
        .append('g')
        .attr("class", "slice")
          .append('path')
          .attr('d', arc);
  };

  this.redraw = function() {
    chart.selectAll('.slice path')
      .data(pie(this.slices.map( function(slice){ return slice.value; })))
      .attr('d', arc);
  };

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
    scope: {
      value: "="
    },
    link: function(scope, element, attrs, pieChartController) {
      scope.$watch('value', function() {
        pieChartController.redraw();
        // console.log("scope: ", scope.value);
      });
      pieChartController.addSlice(scope);
    }
  }
});

