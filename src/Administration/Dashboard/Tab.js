import React from "react";
import { Chart } from "react-google-charts";

const styles = {
  dial: {
    width: `120px`,
    height: `100px`,
    color: "white",

    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "white"
  }
};

const Barometer = ({ id, value, tick, min, max,danger,to }) => {
  return (
    <div  className="parametter">
      <Chart
        height={120}
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
          },// Bỏ hiển thị giá trị min và max
       
        }}
      />
      
    </div>
  );
};

export default Barometer;
