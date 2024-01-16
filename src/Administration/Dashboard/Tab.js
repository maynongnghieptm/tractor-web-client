import React from "react";
import { Chart } from "react-google-charts";

const Barometer = ({ id, value, tick, min, max,danger,to, height, width }) => {
  return (
      <Chart
        height={height}
        width={width}
        chartType="Gauge"
        loader={<div></div>}
        data={[
          ["", "Value"],
          ["", Number(value)]
        ]}
        options={{
          redFrom: danger ,
          redTo: to,
          minorTicks: tick ,
          min: min,
          max: max,
          animation: {
            duration: 1000,
            easing: "out",
          },
        }}
      />
  );
};

export default Barometer;
