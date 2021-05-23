var svg = d3.select('#drawing_region')

svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', '#fffaf0')
    .transition()
    .duration(3000) // 3 sec
    .attr('fill', '#7d8125');
