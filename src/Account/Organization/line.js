import React, { Component } from "react";
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
} from "recharts";

class SensorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { socketData } = this.props;

    if (socketData !== prevProps.socketData) {
      if (socketData && socketData.ypr && socketData.ypr[0]) {
        this.setData(socketData);
      }
    }
  }

  setData(newData) {
    this.setState((prevState) => {
      const currentData = [...prevState.data];

      if (currentData.length >= 10) {
        currentData.shift();
      }

      if (newData.ypr && newData.ypr.length >= 3) {
        const time = new Date(
          newData.time[2],
          newData.time[1],
          newData.time[0],
          newData.time[3],
          newData.time[4],
          Math.floor(newData.time[5]),
          (newData.time[5] - Math.floor(newData.time[5])) * 1000
        );

        const updatedData = [
          ...currentData,
          {
            date: time.toLocaleString(),
            'yaw': newData.ypr[0],
            'pitch': newData.ypr[1],
            'roll': newData.ypr[2],
          },
        ];

        return { data: updatedData };
      } else {
        return prevState;
      }
    });
  }

  render() {
    return (
      
          <ResponsiveContainer width='100%'
          height='100%'>
            <LineChart
              
              data={this.state.data}
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
              <YAxis  />
          <YAxis yAxisId="right" orientation="right" />

              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
              <Line
                type="monotone"
                dataKey="raw"
                stroke="green"
                activeDot={{ r: 24 }}
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="pitch"
                stroke="red"
                activeDot={{ r: 24 }}
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="roll"
                stroke="blue"
                activeDot={{ r: 24 }}
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

export default connect(mapStateToProps)(SensorChart);
