// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 70},
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    title = '全国の自殺者数の推移(4月~9月)';

// append the svg object to the body of the page
var barSvg = d3.select("#bar_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = barSvg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = barSvg.append("g")
  .attr("class", "myYaxis")

barSvg.append("text")
　　 .style('font-size', '12px')
    .attr("text-anchor", "end")
    .attr("x", width+5)
    .attr("y", height+20 )
    .text("月");

// Add Y axis label:
barSvg.append("text")
　　 .style('font-size', '12px')
    .attr("text-anchor", "end")
    .attr("x", -60)
    .attr("y", 0 )
    .text("自殺人数")
    .attr("text-anchor", "start")


var title_space = 0;
barSvg.append('text')
    .style('font-size', '26px')
    .style('font-weight', 'bold')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', -8)
    .text( title );


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/Final/covid.csv", function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.group; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = barSvg.selectAll("rect")
      .data(data)

    // update bars
    u.enter()
     .append("rect")
     .merge(u)
     .transition()
     .duration(1000)
     .attr("x", function(d) { return x(d.group); })
     .attr("y", function(d) { return y(d[selectedVar]); })
     .attr("width", x.bandwidth())
     .attr("height", function(d) { return height - y(d[selectedVar]); })
     .attr("fill", "#69b3a2")
  })

}

// Initialize plot
update('var1')
