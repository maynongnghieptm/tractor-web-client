import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';

class DualYAxisChart extends Component {
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

    if (newData.ctr_fed && newData.ctr_fed.length >= 10) {
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
          'Độ cao càng thực tế': newData.ctr_fed[11],
          'Độ nghiêng dàn xới thực tế ': newData.ctr_fed[13],
        },
      ];
    } else {
      return currentData;
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Độ cao càng thực tế"
            stroke="green"
            strokeWidth="2"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Độ nghiêng dàn xới thực tế"
            stroke="red"
            strokeWidth="2"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(DualYAxisChart);
