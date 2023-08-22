import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

const Window = () => {
  const [windows, setWindows] = useState([
    { id: '1', text: 'Window 1', x: 0, y: 0, w: 2, h: 2 },
    { id: '2', text: 'Window 2', x: 2, y: 0, w: 2, h: 2 },
   
  ]);

  const onLayoutChange = newLayout => {
    setWindows(
      windows.map(window => {
        const newWindow = newLayout.find(item => item.i === window.id);
        return { ...window, x: newWindow.x, y: newWindow.y };
      })
    );
  };

  return (
    <div className="Grid">
      <ResponsiveGridLayout
        className="layout"
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={150}
        margin={[10, 10]}
        layouts={{ lg: windows }}
        onLayoutChange={onLayoutChange}
      >
        {windows.map(window => (
          <div key={window.id}>
            <div className="window">{window.text}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Window;
