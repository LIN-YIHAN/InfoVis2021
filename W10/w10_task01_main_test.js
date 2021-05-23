var BabyData = {}
// var defaultData = {}
var BabyConfig = {}

d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/W10/w10_task01.csv")
  .then( data => {
    data.forEach( d => { d.label = d.label;d.value = +d.value;});

    // defaultData = Object.assign([],data)
    // console.log(defaultData)
    var config = {
      parent: '#drawing_region',
      width: 1000,
      height: 500,
      margin: {top:50, right:10, bottom:20, left:100}
    };

    const bar_chart = new BarChart( config, data );
    bar_chart.update();

    d3.select('#reverse')
      .on('click', d => {
        data.reverse()
        const bar_chart = new BarChart( config, data );
        bar_chart.update();
      });

      function compareNumbers(a, b) {
        return a - b;
      }

      d3.select('#ascend')
        .on('click', d => {
          data.sort(function(a, b){
            return compareNumbers(a.value, b.value)
          })
          const bar_chart = new BarChart( config, data );
          bar_chart.update();
        });
  })
  .catch( error => {
    console.log( error );
  });

class BarChart{
  constructor(config, data){
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height || 128,
      margin: config.margin || {top:10, right:10, bottom:10, left:10},
    }
    this.data = data;

    this.init();
  }
  init(){
    this.svg = d3.select( this.config.parent )
      .attr('width', this.config.width)
      .attr('height', this.config.height);
    d3.select(this.config.parent).selectAll("*").remove()
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`);
    this.inner_width = this.config.width - this.config.margin.left - this.config.margin.right;
    this.inner_height = this.config.height - this.config.margin.top - this.config.margin.bottom;

    this.xscale = d3.scaleLinear()
      .range([0, this.inner_width]);

    this.yscale = d3.scaleBand()
      .range([0, this.inner_height])
      .paddingInner(0.1);

    this.xaxis = d3.axisBottom( this.xscale )
      .ticks(5)
      .tickSizeOuter(0);

    this.yaxis = d3.axisLeft( this.yscale )
      .tickSizeOuter(0);
  }
  update(){
    this.xscale.domain([0, d3.max(this.data, d => d.value)])
    this.yscale.domain(this.data.map(d => d.label))
    this.render();
  }
  render(){
    // Draw the axis
    const xaxis_group = this.chart.append('g')
      .attr('transform', `translate(0, ${this.inner_height})`)
      .call( this.xaxis );

    const yaxis_group = this.chart.append('g')
      .call( this.yaxis );

    // Draw bars
    this.chart.selectAll("rect")
      .data(this.data)
      .join("rect")
      .transition().duration(2000)
      .attr("x", 0)
      .attr("y", d => this.yscale(d.label))
      .attr("width", d => this.xscale(d.value))
      .attr("height", this.yscale.bandwidth());
  }
}

// d3.select('#reverse')
//   .on('click', d => {
//     BabyData.reverse()
//     const bar_chart = new BarChart( BabyConfig, BabyData );
//     bar_chart.update();
//   });

// function compareNumbers(a, b) {
//   return a - b;
// }
//
// d3.select('#sort')
//   .on('click', d => {
//     globalData.sort(function(a, b){
//       return compareNumbers(a.value, b.value)
//     })
//     const bar_chart = new BarChart( globalConfig, globalData );
//     bar_chart.update();
//   });
//
// d3.select('#default')
//   .on('click', d => {
//     const bar_chart = new BarChart( globalConfig, defaultData );
//     bar_chart.update();
//   });
