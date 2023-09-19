import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { connect } from 'react-redux';
const styles = {
  dial: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0", // Light gray background
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  speedometer: {
    margin: "10px 0",
  },
  title: {
    fontSize: "1.5em",
    color: "#333", // Dark gray title color
    marginTop: "8px",
    fontWeight: "bold",
  },
};

class Speedometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
     
    }}
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
     // console.log(socketData)
      if (socketData && socketData.ctr_fed && socketData.ctr_fed[0]) {
        this.setState({
          data: { name: "Egine Speed", value: socketData.ctr_fed[3] }
         
          
        });
      }
   
    };
  render() {
   // const { title, value } = this.props;
//console.log(this.state.data)
    return (
      <div style={styles.dial}>
        <ReactSpeedometer
          maxValue={2500}
          minValue={0}
        height={100}
          width={200}
          value={this.state.data.value}
          needleTransition="easeQuadIn"
          needleTransitionDuration={1000}
          needleColor="red"
          startColor="green"
          segments={5}
          endColor="red"
        />
        <div style={styles.title}>{this.state.data.name}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(Speedometer);

