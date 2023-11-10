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
      const total = sum[3] + sum[2];
      const percentageA = Math.floor((sum[3] / total) * 100);
      const percentageB = 100 - percentageA

      this.setState({
        data: [
        
          { name: 'Quãng đường còn lại', value: percentageB },
          { name: 'Quãng đường đã đi', value: percentageA },
        ],
      });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer >
        <PieChart >
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
           
            isAnimationActive={false}
            startAngle={90} 
            endAngle={450}
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

export default Test2;
