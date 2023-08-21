import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.random() * 100, // Generate a random value for demonstration
      };
      setData(prevData => [...prevData, newDataPoint]);
    }, 1000); // Update data every 1 second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div>
      <h2>Live Chart Example</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Profile;
