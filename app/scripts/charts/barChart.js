'use strict';

var barChart = angular.module('pasik.charts.barChart', []);

barChart.controller('BarChartController', function () {
  var barChart;

  var barWidth = 9, padding = 5;

  var maxHeight = 63;

  var yscale = d3.scale.linear()
    .domain([0, 10])
    .range([0, maxHeight]);

  this.bars = [];

  this.addBar = function (bar) {
    var i;

    i = this.bars.length;
    bar.x = (barWidth + padding) * i;
    bar.y = maxHeight - yscale(bar.value);
    bar.width = barWidth;
    bar.height = yscale(bar.value);
    this.bars.push(bar);
  };

  this.setupChart = function (element) {

    var width = 262, height = 63, barWidth = 9, padding = 5;

    var max = 63;

    barChart = d3.select(element[0])
          .attr('width', width)
          .attr('height', height);

    barChart.selectAll('.bar')
      .data(this.bars)
      .enter()
        .append('g')
          .attr('class', 'bar')
          .append('rect')
            .attr('x', function (d, i) { return i * (width + padding); })
            .attr('y', function (d) { return max - d * yscale; })
            .attr('width', barWidth)
            .attr('height', function (d) { return d * yscale; });
  };
});

barChart.directive('barChart', function () {
  return {
    restrict: 'AE',
    transclude: true,
    controller: 'BarChartController',
    replace: true,
    templateUrl: 'templates/charts/bar-chart.html',
    scope: {},
    link: function (scope, element, attrs, controller) {
      controller.setupChart(element);
    }
  };
});

barChart.directive('bar', function () {
  return {
    restrict: 'AE',
    require: '^barChart',
    replace: true,
    templateUrl: 'templates/charts/bar.html',
    scope: {
      value: '='
    },
    link: function (scope, element, attrs, controller) {
      controller.addBar(scope);
    }
  };
});
