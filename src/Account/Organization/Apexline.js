import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';

class RealtimeLineChart extends React.Component {
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
        // Không cần kết nối socket ở đây nữa
        // Thay vào đó, sử dụng socketData từ Redux
        // Cập nhật biểu đồ bằng socketData

        // Các logic xử lý socketData ở đây
        
    }
    componentDidUpdate(prevProps) {
        const { socketData } = this.props;
        const prevSocketData = prevProps.socketData;
    
        // Kiểm tra xem socketData có thay đổi so với prevSocketData trước khi cập nhật
        if (socketData !== prevSocketData) {
            this.updateChartWithSocketData();
        }
    }
    componentWillUnmount() {
        // Không cần ngắt kết nối socket ở đây nữa
    }

    // Cập nhật biểu đồ dựa trên socketData từ Redux
    updateChartWithSocketData = () => {
        const { socketData } = this.props;
       
     //   console.log(socketData)
        if (socketData&&socketData.ypr) {
            const x = socketData;

            // Lấy dữ liệu từ x và xử lý...
            const roll1 = x.ypr[0];
            const roll2 = x.ypr[1];
            const roll3 = x.ypr[2];
            const time = new Date(x.time[2], x.time[1], x.time[0], x.time[3] + 7, x.time[4], Math.floor(x.time[5]), (x.time[5] - Math.floor(x.time[5])) * 1000);
          //  console.log(time)
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
        }
    };

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={1000} />
        );
    }
}

const mapStateToProps = (state) => ({
    socketData: state.socketData,
});

export default connect(mapStateToProps)(RealtimeLineChart);
