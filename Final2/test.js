// set the dimensions and margins of the graph
var margin = {top: 400, right: 30, bottom: 30, left: 50},
    width = 300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    title = '孤独死死因別人数の構成割合';

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", 500)
        .attr("height", 500)
      .append("g2")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/Final/ageofsuicide.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.name;})
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.y; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));
  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+40 )
      .text("年代別");

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -80)
      .attr("y", 10 )
      .text("自殺率")
      .attr("text-anchor", "start")


  const title_space = 0;
  svg.append('text')
      .style('font-size', '26px')
      .style('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', margin.top - title_space)
      .text( title );

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.y); })
            (d.values)
        })

})
