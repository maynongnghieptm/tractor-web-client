import React, { Component } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { connect } from 'react-redux';

class DonutChart1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      COLORS : ['#0088FE', '#00C49F', '#FFBB28'],
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

    if (socketData && socketData.sum && socketData.sum[0]) {
      this.setState({
        data: [ { name: "Group A", value: socketData.sum[1] },
        { name: "Group B", value: socketData.sum[0]},]
       
        
      });
    }
 
  };

  render() {
   // console.log(this.state.data)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={this.state.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              startAngle={90}
              endAngle={-270}
              fill="#8884d8"
              label
            >
              {this.state.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(DonutChart1);
