import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class SensorChart1 extends Component {
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

  // Cập nhật biểu đồ dựa trên socketData từ Redux
  updateChartWithSocketData = () => {
    const { socketData } = this.props;

    if (socketData && socketData.ctr_fed && socketData.ctr_fed[0]) {
      this.setState((prevState) => ({
        data: this.limitData(prevState.data, socketData),
      }));
    }
  };

  limitData(currentData, newData) {
    if (currentData.length >= 10) {
      currentData.shift(); // Loại bỏ giá trị cũ
    }

    if (newData.ctr_fed && newData.ctr_fed.length >= 3) {
      const time = new Date(
        newData.time[2],
        newData.time[1],
        newData.time[0],
        newData.time[3],
        newData.time[4],
        Math.floor(newData.time[5]),
        (newData.time[5] - Math.floor(newData.time[5])) * 1000
      );

      return [
        ...currentData,
        {
          date: time.toLocaleString(),
          "Độ cao càng mong muốn": newData.ctr_fed[10],
          "Độ nghiêng dàn xới mong muốn": newData.ctr_fed[12],
        },
      ];
    } else {
      return currentData;
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer>
            <LineChart
              width="100%"
              height="100%"
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              padding={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="10 5 3 5" />
              <XAxis dataKey="date" hide />
              <YAxis />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Độ cao càng mong muốn"
                stroke="blue"
                activeDot={{ r: 24 }}
                strokeWidth="2"
                
              />
              <Line
                type="monotone"
                dataKey="Độ nghiêng dàn xới mong muốn"
                stroke="black"
                activeDot={{ r: 24 }}
                strokeWidth="2"
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(SensorChart1);
