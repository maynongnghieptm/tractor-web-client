import React from "react";
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
const   options= {
  chart: {
 
    width: "100%",
    type: 'donut',
    animations: {
      enabled: false 
    }
  },
  labels: ['Quãng đường đã đi', 'Quãng đường còn lại'],
  dataLabels: {
    enabled: false
  },
  responsive: [{
   
    options: {
      chart: {
   
      },
      legend: {
        show: false
      }
    }
  }],
  legend: {
    position: 'bottom',
    offsetY: 0,
    fontSize: "9px"
  }
}
class ApexChart3 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    
    };
  }
  componentDidMount() {
    // Thực hiện các tác vụ cần thiết sau khi component đã render
    // Không cần kết nối socket ở đây nữa
    // Thay vào đó, sử dụng socketData từ Redux
    // Cập nhật biểu đồ bằng socketData

    // Các logic xử lý socketData ở đây
   this.updateChartWithSocketData();
  }

  componentDidUpdate(prevProps) {
    // Thực hiện các tác vụ cần thiết sau khi props hoặc state thay đổi
    // Kiểm tra xem socketData đã thay đổi chưa trước khi cập nhật biểu đồ
    if (this.props.socketData !== prevProps.socketData) {
      this.updateChartWithSocketData();
    }
  }

  updateChartWithSocketData = () => {
    const { socketData } = this.props;
    if (socketData && socketData.sum && socketData.sum[0]) {
      this.setState({
        data: [socketData.sum[1], socketData.sum[0]]
      });
    }
  };

  render() {
    
    return (
     
      
          <div id="chart">
            <ReactApexChart options={options} series={this.state.data} type="donut" width="100%" height="100%" />
          </div>
      
      
  
    );
  }
}
const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(ApexChart3);


