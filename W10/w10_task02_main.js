d3.csv("https://LIN-YIHAN.github.io/InfoVis2021/W10/w10_task02.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:20, left:25.1},
            radius: 10
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            radius: config.radius || 10,
        }
        this.data = data;
        this.init();
    }

    init() {
        this.svg = d3.select( this.config.parent )
            .attr('width', this.config.width)
            .attr('height', this.config.height);

        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`);

        this.inner_width = this.config.width - this.config.margin.left - this.config.margin.right;
        this.inner_height = this.config.height - this.config.margin.top - this.config.margin.bottom;

        this.xscale = d3.scaleLinear()
            .range( [0, this.inner_width] );

        this.yscale = d3.scaleLinear()
            .range( [0, this.inner_height] );

        this.xaxis = d3.axisBottom()
            .scale( this.xscale );

        this.xaxis_group = this.chart.append('g')
            .attr('transform', `translate(0, ${this.inner_height})`)

        this.yaxis = d3.axisLeft()
            .scale( this.yscale );

        this.yaxis_group = this.chart.append('g')
            .attr('transform', `translate(0, 0)`);

        this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", - this.inner_height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("Y-label");

        this.svg.append("text")
            .attr("y", this.inner_height + this.config.margin.top + 20)
            .attr("x", this.inner_width / 2)
            .attr("dx", "1em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("X-label");

    }

    update() {
        const xmin = d3.min( this.data, d => d.x );
        const xmax = d3.max( this.data, d => d.x );
        this.xscale.domain( [0, xmax + 20] );
        this.xaxis.tickValues([0,xmin, xmax])

        const ymin = d3.min( this.data, d => d.y );
        const ymax = d3.max( this.data, d => d.y );
        this.yscale.domain( [ymax + 20, 0] );
        this.yaxis.tickValues([0,ymin, ymax])

        this.render();
    }

    render() {
        let circles = this.chart.selectAll("circle")
            .data(this.data)
            .enter()
            .append('circle')

        circles
            .transition().duration(1500)
            .attr('cx', d => this.xscale(d.x))
            .attr('cy', d => this.yscale(d.y))
            .attr('r', 10)
            .attr('fill','#556b2f' );

        circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                    .style('opacity',1)
                    .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            });

        this.xaxis_group
            .call( this.xaxis );

        this.yaxis_group
            .call( this.yaxis );
        console.log(circles)
    }
}
