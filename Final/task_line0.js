// d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/Final/ageofsuicide.csv")
// .then( data => {
//   data.forEach( d => { d.x = +d.x; d.y = +d.y; });

d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/Final/countryrate.csv")
.then( rate_data => {
  rate_data.forEach( d => { d.a = +d.a; d.b = +d.b; });

  var config = {
    parent: '#drawing_region',
    width: 20000 ,
    height: 20000,
    margin: {top:500, right:50, bottom:20, left:35},
    title: '年齢階級別自殺者の割合'
  };

  const line_chart = new LineChart( config, rate_data );
  line_chart.update();
})
.catch( error => {
  console.log( error );
});

class LineChart{
  constructor(config, rate_data){
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height || 256,
      margin: config.margin || {top:10, right:10, bottom:10, left:10},
    }
    this.rate_data = rate_data;

    this.init();
  }
  init(){
    this.svg = d3.select( this.config.parent )
      .attr('width', this.config.width)
      .attr('height', this.config.height);
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`);
    this.inner_width = 500 - this.config.margin.left - this.config.margin.right;
    this.inner_height = 700 - this.config.margin.top - this.config.margin.bottom;

    // Initialize axis scales
    this.xscale = d3.scaleLinear()
      .range([0, this.inner_width])


    this.yscale = d3.scaleLinear()
      .range([ this.inner_height,0]);

    // Initialize axes
    this.xaxis = d3.axisBottom( this.xscale )
      .ticks(8)
      .tickSizeOuter(0);

    this.yaxis = d3.axisLeft( this.yscale )
      .ticks(5)
      .tickSizeOuter(0);
  }
  update(){
    this.xscale
      // .domain([0, d3.max(this.data, d => Number(d.x))])
      // .domain(d3.extent(this.rate_data, function(d) { return d.age; }));
      .domain([0, d3.max(this.rate_data, d => Number(d.age))])

    this.yscale
      // .domain([0, d3.max(this.data, d => Number(d.y))])
      .domain([0, d3.max(this.rate_data, d => Number(d.b))])
    //
    // this.line = d3.line()
    //   .x( d => this.xscale(Number(d.x)))
    //   .y( d => this.yscale(Number(d.y)));

    this.line2 = d3.line()
      .x( d => this.xscale(Number(d.age)))
      .y( d => this.yscale(Number(d.b)));

    this.render();
  }
  render(){
    const xaxis_group = this.chart.append('g')
      .attr('transform', `translate(0, ${this.inner_height})`)
      .call( this.xaxis );

    const yaxis_group = this.chart.append('g')
      .call( this.yaxis );

    // this.chart.append('path')
    //   .attr('d', this.line(this.data))
    //   .attr('stroke', 'red')
    //   .attr('fill', 'none');
    // this.chart.selectAll("circle")
    //   .data(this.data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => this.xscale( d.x ) )
    //   .attr("cy", d => this.yscale( d.y ) )
    //   .attr("r", 4 );

    this.chart.append('path')
      .attr('d', this.line2(this.rate_data))
      .attr('stroke', 'black')
      .attr('fill', 'none');

    this.chart.selectAll("circle")
      .data(this.rate_data)
      .enter()
      .append("circle")
      .attr("cx", d => this.xscale( d.age ) )
      .attr("cy", d => this.yscale( d.b ) )
      .attr("r", 4 );
  }
}
