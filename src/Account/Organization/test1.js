import React from "react";
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [44, 55],
            options: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            show: false
                        }
                    }
                }],
                legend: {
                    position: 'right',
                    offsetY: 0,
                    height: 230,
                }
            },
        };
    }
    
    render() {
     
        return (
            <div>
                <div className="chart-wrap">
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={[this.props.socketData?.ypr?.[0] ?? 0,
        this.props.socketData?.ypr?.[1] ?? 0]} type="donut" width={380} />
                    </div>
                </div>
                <div className="actions">
                    {/* Additional actions */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    socketData: state.socketData,
});

export default connect(mapStateToProps)(ApexChart);
