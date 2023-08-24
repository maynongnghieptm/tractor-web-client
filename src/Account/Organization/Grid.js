import React from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GoogleMapsComponent from "Account/Map/GoogleMapsComponent";
import ApexChartWithSocket from "./Donut";
import DonutTime from './Donut_time'
import DonutFuel from "./Donut_fuel";
import ApexChart from "./Linechart";
const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
  { i: "1", x: 0, y: 0, w: 1, h: 1 },
  { i: "2", x: 1, y: 0, w: 1, h: 1 },
  { i: "3", x: 2, y: 0, w: 1, h: 1 },
  { i: "4", x: 3, y: 0, w: 1, h: 1 },
  { i: "5", x: 4, y: 0, w: 1, h: 1 }
];


const GridItemWrapper = styled.div`
background: #e5e5e5;
border-radius: 5px;
width: 100%;
height: 100%;
display: flex;
align-items: center; /* Để căn giữa biểu đồ trong ô */
justify-content: center; /* Để căn giữa biểu đồ trong ô */
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const getLayouts = () => {
  const savedLayouts = localStorage.getItem("grid-layout");
  return savedLayouts ? JSON.parse(savedLayouts) : { lg: layout };
};

export const Grid = () => {
  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  return (
    
    <Root>
 
<ApexChart/>
          
      <ResponsiveGridLayout
        layouts={getLayouts()}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      
        width="100%"
        onLayoutChange={handleLayoutChange}
      >
      
        {layout.map((item, index) => (
          <GridItemWrapper
            key={item.i}
           
          >      {item.i === "1" ? (
            <GoogleMapsComponent  />
          ) : item.i === "2" ? (
            <ApexChartWithSocket /> 
            
          ) :item.i === "3" ? (
            <DonutTime />
            
          ):item.i === "4" ? (
            <DonutFuel /> 
            
          ): (
            <GridItemContent>{item.i}</GridItemContent>
          )}
  
          </GridItemWrapper>
        ))}
      </ResponsiveGridLayout>
    </Root>
  );
};
