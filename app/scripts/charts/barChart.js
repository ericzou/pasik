'use strict';

var barChart = angular.module('pasik.charts.barChart', []);

barChart.controller('BarChartController', function () {
  var barChart, element, dataset,
      width, height, barWidth, padding, unitWidth,
      yscale;

  function onEnter(bars) {
    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d, i) { return i * (unitWidth + 1); })
      .attr('y', function (d) { return height - yscale(d); })
      .attr('height', function (d) { return yscale(d); })
      .attr('width', barWidth);
  }

  function onUpdate(bars) {
    bars.transition()
      .duration(1000)
      .attr('x', function (d, i) { return i * unitWidth; });
  }

  function onExit(bars) {
    bars.exit()
      .transition()
      .duration(1000)
      .attr('x', unitWidth * -1)
      .remove();
  }

  this.setupChart = function (options) {

    element = options.element,
    dataset = options.dataset,
    width = options.width,
    height = options.height,
    barWidth = options.barWidth,
    padding = options.padding,
    unitWidth = barWidth + padding;

    yscale = d3.scale.linear()
      .domain([0, 10])
      .rangeRound([0, height]);

    barChart = d3.select(element).append('svg')
      .attr('class', 'bar-chart')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    barChart.selectAll('rect')
      .data(dataset, function (d) { return d; })
      .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', function (d, i) { return i * unitWidth; })
          .attr('y', function (d) { return height - yscale(d); })
          .attr('width', barWidth)
          .attr('height', function (d) { return yscale(d); });
  };

  this.rerender = function (dataset) {
    var bars = barChart.selectAll('rect').data(dataset, function (d) { return d; });
    onEnter(bars);
    onUpdate(bars);
    onExit(bars);
  };

});

barChart.directive('barChart', function () {
  return {
    restrict: 'E',
    controller: 'BarChartController',
    scope: {
      width: '=',
      height: '=',
      barWidth: '=',
      padding: '=',
      dataset: '=bind'
    },
    link: function (scope, element, attrs, controller) {
      controller.setupChart({
        element: element[0],
        width: scope.width,
        height: scope.height,
        barWidth: scope.barWidth,
        padding: scope.padding,
        dataset: scope.dataset
      });

      scope.$watch('dataset', function () {
        controller.rerender(scope.dataset);
      }, true);
    }
  };
});
