'use strict';

angular.module('pasikApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    $scope.foo = 87
    $scope.bar = 21;

    $timeout(function randomize() {
      $scope.foo = Math.round(Math.random() * 80 + 10);
      $scope.bar = Math.round(Math.random() * 80 + 10);
      $timeout(randomize, 2000);
    }, 2000);

  });

function barChart() {
  var dataset = [
    { position: 1, value: 4 },
    { position: 2, value: 7 },
    { position: 3, value: 8 },
    { position: 4, value: 7 },
    { position: 5, value: 10 },
    { position: 6, value: 2 },
    { position: 7, value: 7 },
    { position: 8, value: 9 },
    { position: 9, value: 8 },
    { position: 10, value: 7 },
    { position: 11, value: 5 },
    { position: 12, value: 3 },
    { position: 13, value: 4 },
    { position: 14, value: 3 },
    { position: 15, value: 7 },
    { position: 16, value: 8 },
    { position: 17, value: 10 },
    { position: 18, value: 7 },
    { position: 19, value: 3 },
    { position: 20, value: 5 }
  ];

  var n = dataset.length;


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
        .rangeRound([0, 63]);

  var bars =
        barChart.selectAll("g.bar")
          .data(dataset, function(d) { return d.position });

  bars.enter()
      .append('g')
        .attr("class", "bar")
        .append("rect")
          .attr("x", function(d, i) { return (barWidth + padding)* i })
          .attr("y", function(d) { return 63 - scale(d.value); })
          .attr("width", barWidth)
          .attr("height", function(d) { return scale(d.value);} );

  bars.exit()
      .remove();

  function redraw(){
    var baz

    baz = barChart.selectAll('rect')
      .data(dataset, function(d) { return d.position; });

    baz.transition()
        .duration(1000)
        .attr("x", function(d, i) { return (barWidth + padding) * i });

    baz.exit()
      .transition()
      .duration(1000)
      .attr('x', function(d, i) { return (barWidth + padding) * (i-1) })
      .remove();

    baz.enter()
      .append('g')
        .attr("class", "bar")
        .append("rect")
          .attr("x", function(d, i) { return (barWidth + padding)* i })
          .attr("y", function(d) { return 63 - scale(d.value); })
          .attr("width", barWidth)
          .attr("height", function(d) { return scale(d.value);} );

  }

  setInterval(function() {
    dataset.shift();
    dataset.push({ position: n, value: Math.round((Math.random()*9+1)) });
    n = n + 1;
    redraw();
  }, 1500);

}

window.onload = function() {
  barChart();
};

