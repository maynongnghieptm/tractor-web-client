import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts'; // Import Label từ Recharts
import { connect } from 'react-redux';

class Test1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Các logic xử lý socketData ở đây
    this.updateChartWithSocketData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateChartWithSocketData();
    }
  }

  updateChartWithSocketData = () => {
    const { data } = this.props;

    if (data && data.sum && data.sum.length >= 2) {
      const sum = data.sum;
      const total = sum[0] + sum[1];
      const percentageA = Math.floor((sum[0] / total) * 100);
      const percentageB = 100 - percentageA;

      this.setState({
        data: [
          { name: 'Thời gian còn lại', value: percentageB }, // Thời gian còn lại đặt ở đầu
          { name: 'Thời gian đã đi', value: percentageA },
        ],
      });
    }
  };

  render() {
    const { data } = this.state;





    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width="100%" height="100%">
            <Pie
              width="100%"
              height="100%"
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              isAnimationActive={false}
              startAngle={90} // Bắt đầu từ vị trí 90 độ
              endAngle={450} // Kết thúc tại vị trí 450 độ (90 + 360)
              labelLine={false} // Tắt đường dẫn đến nhãn
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#FF5733' : '#34A853'} />
              ))}
              {/* Hiển thị giá trị bên trong biểu đồ */}
              
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(Test1);
