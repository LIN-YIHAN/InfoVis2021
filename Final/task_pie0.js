d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/Final/causeofdeath.csv")
  .then( data => {
      data.forEach( d => { d.num = +d.num; });

      var config = {
          parent: '#drawing_region',
          width: 512,
          height: 512,
          margin: {top:50, right:10, bottom:10, left:10},
          inner_radius: 50,
          outer_radius: 125,
          title: '孤独死死因別人数の構成割合'
      };

      const pie_chart = new PieChart( config, data );
      pie_chart.update();
  })
  .catch( error => {
      console.log( error );
  });

class PieChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            inner_radius: config.inner_radius || 0,
            outer_radius: config.outer_radius || 100,
            title: config.title || ''
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width / 2}, ${self.config.height / 2})`);

        self.radius = Math.min(self.inner_width, self.inner_height) / 2;

        const title_space = 0;
        self.svg.append('text')
            .style('font-size', '26px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );

        // self.colorSeq = d3.scaleOrdinal(d3.schemeCategory10);
        self.color = d3.scaleOrdinal()
            .range(["#0081a7", "#00afb9", "#fdfcdc", "#fed9b7", "#f07167"]);
    }

    update() {
        let self = this;

        self.pie = d3.pie()
            .value( d => d.num );

        self.arc = d3.arc()
            .innerRadius(self.config.inner_radius)
            .outerRadius(self.config.outer_radius);

        if (self.config.inner_radius < self.config.outer_radius / 3) {
            self.textarc = d3.arc()
                .innerRadius(self.config.outer_radius * 2 / 3)
                .outerRadius(self.config.outer_radius * 2 / 3);
        } else {
            self.textarc = self.arc;
        }

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll('pie')
            .data(self.pie(self.data))
            .enter()
            .append('path')
            .attr('d', self.arc)
            // .attr('fill', 'black')
            // .on("click", (e, d) => {
            //   d3.select(e.currentTarget)
            //     .attr('fill', 'blue');
            // })
            .attr('fill', d => self.color(d.index))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        self.chart.selectAll('text')
            .data(self.pie(self.data))
            .enter()
            .append('text')
            .attr('fill', 'black')
            .attr('transform', d => `translate(${self.textarc.centroid(d)})`)
            .style('font-size', '19px')
            .style('font-weight','blod')
            .attr('text-anchor', 'middle')
            .text(d => d.data.name);
    }
}
