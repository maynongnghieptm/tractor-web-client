import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from "styled-components";
import { connectSocket, disconnectSocket } from '../socket'; // Thay thế bằng import thích hợp

const ChartContainer = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DonutTime = () => {
  const [socket, setSocket] = useState(null);
  const [chartDataTime, setChartDataTime] = useState([]); // Example initial data

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    const newSocket = connectSocket(token, data => {
      const x = data;
      const da_di = x.sum[0];
      const  con_lai= x.sum[1];
      setChartDataTime([da_di, con_lai]);
    });

    setSocket(newSocket);

    return () => {
      disconnectSocket(newSocket);
    };
  }, []);
//console.log(chartData)
  const chartOptions = {
    chart: {
      width: "100%",
      type: 'donut',
      animations: {
        enabled: false 
      }
    },
    dataLabels: {
      enabled: false,
    },
    labels: ['Thời gian đã đi', 'Thời gian còn lại'],
    responsive: [
      {
        breakpoint: 480,
        options: {
        
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: 0,
      fontSize: "9px"
    },

  };

  return (
    <ChartContainer>
      <ReactApexChart options={chartOptions} series={chartDataTime} type="donut" width="100%" height="100%" />
    </ChartContainer>
  );
};

export default DonutTime;
