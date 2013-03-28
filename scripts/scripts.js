"use strict";function setupBarChart(){function t(){var t;t=l.selectAll("rect").data(r,function(t){return t.position}),t.transition().duration(1e3).attr("x",function(t,r){return(i+o)*r}),t.exit().transition().duration(1e3).attr("x",function(t,r){return(i+o)*(r-1)}).remove(),t.enter().append("g").attr("class","bar").append("rect").attr("x",function(t,r){return(i+o)*r}).attr("y",function(t){return 63-s(t.value)}).attr("width",i).attr("height",function(t){return s(t.value)})}var r=[{position:1,value:4},{position:2,value:7},{position:3,value:8},{position:4,value:7},{position:5,value:10},{position:6,value:2},{position:7,value:7},{position:8,value:9},{position:9,value:8},{position:10,value:7},{position:11,value:5},{position:12,value:3},{position:13,value:4},{position:14,value:3},{position:15,value:7},{position:16,value:8},{position:17,value:10},{position:18,value:7},{position:19,value:3},{position:20,value:5}],a=r.length,e=262,n=63,i=9,o=5,l=d3.select(".bar-chart").append("svg:svg").attr("width",e).attr("height",n).append("g").attr("class","bar-chart"),s=d3.scale.linear().domain([0,10]).rangeRound([0,63]),u=l.selectAll("g.bar").data(r,function(t){return t.position});u.enter().append("g").attr("class","bar").append("rect").attr("x",function(t,r){return(i+o)*r}).attr("y",function(t){return 63-s(t.value)}).attr("width",i).attr("height",function(t){return s(t.value)}),u.exit().remove(),setInterval(function(){r.shift(),r.push({position:a,value:Math.round(9*Math.random()+1)}),a+=1,t()},1500)}var pieChart=angular.module("pasik.charts.pieChart",[]);pieChart.controller("PieChartController",[function(){var t,r,a,e,n,i;this.slices=[],this.addSlice=function(t){this.slices.push(t)},this.initChart=function(o){t=r=26,a=13,i=d3.select(o[0]).append("svg").attr("width",t).attr("height",r).append("g").attr("class","pie-chart").attr("transform","translate(13, 13)"),e=d3.layout.pie().value(function(t){return t}),n=d3.svg.arc().outerRadius(a),i.selectAll(".slice").data(e(this.slices.map(function(t){return t.value}))).enter().append("g").attr("class","slice").append("path").attr("d",n)},this.redraw=function(){i.selectAll(".slice path").data(e(this.slices.map(function(t){return t.value}))).attr("d",n)}}]),pieChart.directive("pieChart",function(){return{restrict:"AE",replace:!0,controller:"PieChartController",link:function(t,r,a,e){e.initChart(r)}}}),pieChart.directive("slice",function(){return{require:"^pieChart",restrict:"AE",scope:{value:"="},link:function(t,r,a,e){t.$watch("value",function(){e.redraw()}),e.addSlice(t)}}});var barChart=angular.module("pasik.charts.barChart",[]);barChart.controller("BarChartController",function(){var t,r=9,a=5,e=63,n=d3.scale.linear().domain([0,10]).range([0,e]);this.bars=[],this.addBar=function(t){var i;i=this.bars.length,t.x=(r+a)*i,t.y=e-n(t.value),t.width=r,t.height=n(t.value),this.bars.push(t)},this.setupChart=function(r){var a=262,e=63,i=9,o=5,l=63;t=d3.select(r[0]).attr("width",a).attr("height",e),t.selectAll(".bar").data(this.bars).enter().append("g").attr("class","bar").append("rect").attr("x",function(t,r){return r*(a+o)}).attr("y",function(t){return l-t*n}).attr("width",i).attr("height",function(t){return t*n})}}),barChart.directive("barChart",function(){return{restrict:"AE",transclude:!0,controller:"BarChartController",replace:!0,templateUrl:"templates/charts/bar-chart.html",scope:{},link:function(t,r,a,e){e.setupChart(r)}}}),barChart.directive("bar",function(){return{restrict:"AE",require:"^barChart",replace:!0,templateUrl:"templates/charts/bar.html",scope:{value:"="},link:function(t,r,a,e){e.addBar(t)}}}),angular.module("pasikApp",["pasik.charts.pieChart","pasik.charts.barChart"]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("pasikApp").controller("MainCtrl",["$scope","$timeout",function(t,r){t.foo=87,t.bar=21,t.first=57.76,t.second=-3.76,r(function a(){t.foo=Math.round(80*Math.random()+10),t.bar=Math.round(80*Math.random()+10),t.first=(80*Math.random()+10).toPrecision(4),t.second=(80*Math.random()+10).toPrecision(4),r(a,5e3)},5e3)}]),window.onload=function(){setupBarChart()};