import React from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
  { i: "1", x: 0, y: 0, w: 1, h: 1 },
  { i: "2", x: 1, y: 0, w: 1, h: 1 },
  { i: "3", x: 2, y: 0, w: 1, h: 1 },
  { i: "4", x: 3, y: 0, w: 1, h: 1 },
  { i: "5", x: 4, y: 0, w: 1, h: 1 }
];


const GridItemWrapper = styled.div`
  background: #E5E5E5;
  border-radius: 5px
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
      <ResponsiveGridLayout
        layouts={getLayouts()}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item, index) => (
          <GridItemWrapper
            key={item.i}
           
          >
            <GridItemContent>{item.i}</GridItemContent>
          </GridItemWrapper>
        ))}
      </ResponsiveGridLayout>
    </Root>
  );
};
