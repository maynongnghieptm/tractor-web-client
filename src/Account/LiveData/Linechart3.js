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
  Area, AreaChart
} from "recharts";

class SensorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
   // console.log(data)
    if (data !== prevProps.data) {
      if (data && data.ypr && data.ypr[0]) {
        this.setData(data);
      }
    }
  }

  setData(newData) {
    this.setState((prevState) => {
      const currentData = [...prevState.data];

      if (currentData.length >= 30) {
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
       //console.log(updatedData)
        return { data: updatedData };
      } else {
        return prevState;
      }
    });
  }

  render() {
    const { data } = this.state
   // console.log(data)
    return (
      <ResponsiveContainer width='100%'
        height='100%'>

        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a63333" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#a63333" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="yaw" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" strokeWidth={4}/>
          <Area type="monotone" dataKey="pitch" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={4} />
          <Area type="monotone" dataKey="roll" stroke="#a63333" fillOpacity={1} fill="url(#colorPc)" strokeWidth={4} />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}


export default SensorChart;
