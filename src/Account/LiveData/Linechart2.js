import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
          'Độ nghiêng dàn xới mong muốn': newData.ctr_fed[12],
          'Độ nghiêng dàn xới thực tế': newData.ctr_fed[13],
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
        <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" strokeWidth={1.5} />
  <Tooltip />
  <Area type="monotone" dataKey="Độ nghiêng dàn xới mong muốn" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="Độ nghiêng dàn xới thực tế" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  <Legend/>
</AreaChart>


      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(DualYAxisChart);
