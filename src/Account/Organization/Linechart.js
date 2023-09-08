import React from "react";
import ReactApexChart from 'react-apexcharts';





class ApexChartline extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        
      
       
        options: {
            chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 10,
                    },
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: 'Dynamic Updating Chart',
                align: 'left',
            },
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                min: 0,
                max: 1000,
            },
            legend: {
                show: false,
            },}
      };
    }

  

    render() {
        const { series} = this.props
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={series} type="line"  width="100%" height={350}  />
</div>


      );
    }
  }
   export default ApexChartline
