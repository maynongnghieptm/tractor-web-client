import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';

class Test2 extends Component {
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
    if (this.props.socketData !== prevProps.socketData) {
      this.updateChartWithSocketData();
    }
  }

  updateChartWithSocketData = () => {
    const { socketData } = this.props;

    if (socketData && socketData.sum && socketData.sum.length >= 2) {
      const sum = socketData.sum;
      const total = sum[3] + sum[2];
      const percentageA = Math.floor((sum[3] / total) * 100);
      const percentageB = 100 - percentageA

      this.setState({
        data: [
          { name: 'Quãng đường đã đi', value: percentageA },
          { name: 'Quãng đường còn lại', value: percentageB },
        ],
      });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width='100%' height='100%'>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            isAnimationActive={false}
            startAngle={90} // Bắt đầu từ vị trí 90 độ
            endAngle={450} // Kết thúc tại vị trí 450 độ (90 + 360)
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#FF5733' : '#34A853'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(Test2);
