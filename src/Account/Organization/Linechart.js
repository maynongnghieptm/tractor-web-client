import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { connectSocket, disconnectSocket } from '../socket'; // Thay thế bằng import thích hợp

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Roll 1',
                data: [],
            },
            {
                name: 'Roll 2',
                data: [],
            },
            {
                name: 'Roll 3',
                data: [],
            },],
            options: {

                chart: {
                    id: 'realtime',
                    height: 100,

                    
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
                    max: 360,
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

            // Lấy dữ liệu từ x và xử lý...
            const roll1 = x.ypr[0];
            const roll2 = x.ypr[1];
            const roll3 = x.ypr[2];
            const time = new Date(x.time[2], x.time[1], x.time[0], x.time[3] + 7, x.time[4], Math.floor(x.time[5]), (x.time[5] - Math.floor(x.time[5])) * 1000);

            this.setState(prevState => {
                const updatedSeries = prevState.series.map(serie => {
                    let newData = [...serie.data];

                    if (newData.length >= 30) {
                        newData.shift();
                    }

                    newData.push({ x: time.getTime(), y: serie.name === 'Roll 1' ? roll1 : serie.name === 'Roll 2' ? roll2 : roll3 });
                    return { ...serie, data: newData };
                });

                return {
                    series: updatedSeries,
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
           
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={1000} />
         
        );
    }
}

export default ApexChart;
