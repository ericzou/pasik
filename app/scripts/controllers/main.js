'use strict';

angular.module('pasikApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Testacular'
    ];
  });

function barChart() {
  var dataset = [4, 7, 8, 7, 10, 2, 7, 9, 8, 7, 5, 3, 4, 3, 7, 8, 10, 7, 3, 5]

  var width = 262, height = 63, barWidth = 9, padding = 5;

  var barChart =
    d3.select(".bar-chart")
      .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
          .attr("class", 'bar-chart');

  var scale =
        d3.scale.linear()
        .domain([0, 10])
        .range([0, 63]);

  var bars =
        barChart.selectAll("g.bar")
          .data(dataset)
          .enter()
            .append('g')
              .attr("class", "bar");

  bars.append("rect")
      .attr("x", function(d, i) { return (barWidth + padding)* i })
      .attr("y", function(d) { return 63 - scale(d); })
      .attr("width", barWidth)
      .attr("height", function(d) { return scale(d);} );


}

window.onload = function() {
  barChart();
};

