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
    width = height = 100;
    radius = 50
    var colors = ["red", "green"];
    chart = d3.select(element[0])
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
        .attr("class", "pie-chart")
        .attr("transform", "translate(50, 50)");

    pie = d3.layout.pie().value(function(d) { return parseInt(d.value) });
    arc = d3.svg.arc().outerRadius(radius);

    chart.selectAll('.slice')
      .data(pie(slices))
      .enter()
        .append('g')
        .attr("class", "slice")
          .append('path')
          .attr('d', arc)
          .style('fill', function(d, i){ return colors[i] } );
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
    link: function(scope, element, attrs, pieChartController) {
      pieChartController.addSlice({ value: attrs.value });
    }
  }
});

