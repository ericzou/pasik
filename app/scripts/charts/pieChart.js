'use strict';

var pieChart = angular.module('pasik.charts.pieChart', []);

pieChart.controller('PieChartController', [function () {
  var width, height, radius;
  var pie, arc, chart;

  this.slices = [];

  this.addSlice = function (slice) {
    this.slices.push(slice);
  };

  this.initChart = function (element) {
    // hardcode for now
    width = height = 26;
    radius = 13;
    chart = d3.select(element[0])
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('class', 'pie-chart')
        .attr('transform', 'translate(13, 13)');

    pie = d3.layout.pie().value(function (d) { return d; }).sort(null);
    arc = d3.svg.arc().outerRadius(radius);

    chart.selectAll('.slice')
      .data(pie(this.slices.map(function (slice) { return slice.value; })))
      .enter()
        .append('g')
        .attr('class', 'slice')
          .append('path')
          .attr('d', arc)
          .each(function (d) {
            this._current = d;
          });
  };

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return arc(i(t));
    };
  }

  this.redraw = function () {
    chart.selectAll('.slice path')
      .data(pie(this.slices.map(function (slice) { return slice.value; })))
      .transition()
        .duration(750)
        .attrTween("d", arcTween)

  };

}]);

pieChart.directive('pieChart', function () {
  return {
    restrict: 'AE',
    replace: true,
    controller: 'PieChartController',
    link: function (scope, element, attrs, pieChartController) {
      pieChartController.initChart(element);
    }
  };
});

pieChart.directive('slice', function () {
  return {
    require: '^pieChart',
    restrict: 'AE',
    scope: {
      value: '='
    },
    link: function (scope, element, attrs, pieChartController) {
      scope.$watch('value', function () {
        pieChartController.redraw();
        // console.log('scope: ', scope.value);
      });
      pieChartController.addSlice(scope);
    }
  };
});

