import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { connectSocket, disconnectSocket } from '../socket'; // Thay thế bằng import thích hợp

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: [],
            }],
            options: {
                chart: {
                    id: 'realtime',
                    height: 350,
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000,
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
                    min: -100,
                    max: 100,
                },
                legend: {
                    show: false,
                },
            },
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('accessToken') || '';
        const newSocket = connectSocket(token, data => {
            const x = data;
            const roll1 = x.ypr[2];
            this.setState(prevState => {
                const updatedData = [...prevState.series[0].data, { x: new Date().getTime(), y: roll1 }];
               
                return {
                    series: [{ data: updatedData }],
                };
            });
        });

        this.setState({ socket: newSocket });

        return () => {
            disconnectSocket(newSocket);
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        );
    }
}

export default ApexChart;