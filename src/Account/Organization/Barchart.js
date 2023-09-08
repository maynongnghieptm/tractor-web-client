import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ReferenceLine, Label  } from 'recharts';

const MyHorizontalBarChart = ({ sensorValue1, sensorValue2 }) => {
  const data = [
    { name: 'Range', value1: sensorValue1, value2: sensorValue2 },
  ];
const minValue = Math.min(sensorValue1, sensorValue2);
  const maxValue = Math.max(sensorValue1, sensorValue2);
  return (
   
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
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
          data={data}
          layout="vertical"
         
        >
          <XAxis type="number" domain={[-90, 90]}  padding={0}/>
          <YAxis type="category"  padding={0} margin={0}/>
          <Bar dataKey='value1' fill='#8884d8'  barSize={5} />
          <Bar dataKey='value2' fill='#82ca9d' barSize={5} />
          <Label value="0" position="insideLeft" offset={5} style={{ fontSize: '12px' }} />
        </BarChart>
      </ResponsiveContainer>
    
  );
};

export default MyHorizontalBarChart;
