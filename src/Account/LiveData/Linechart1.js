import React, { Component } from 'react';
import {
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area, AreaChart
} from 'recharts';

class SensorChart1 extends Component {
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

    if (data && data.ctr_fed && data.ctr_fed[0]) {
      this.setState((prevState) => ({
        data: this.limitData(prevState.data, data),
      }));
    }
  };

  limitData(currentData, newData) {
    if (currentData.length >= 100) {
      currentData.shift(); 
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
          "date": time.toLocaleString(),
          "Độ cao càng mong muốn": newData.ctr_fed[10],
          "Độ cao càng thực tế": newData.ctr_fed[11],
        },
      ];
    } else {
      return currentData;
    }
  }

  render() {
    const { data } = this.state;
    //console.log(data)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer>
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
              </defs>
              <XAxis dataKey="name" />
              <YAxis domain={[-50,50]} />

              <Tooltip />
              <Area isAnimationActive={false} type="monotone" dataKey="Độ cao càng mong muốn" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" strokeWidth={4}/>
              <Area isAnimationActive={false} type="monotone" dataKey="Độ cao càng thực tế" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={4}/>
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}


export default SensorChart1;
