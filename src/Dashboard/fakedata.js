import { useState, useEffect } from 'react';

const usePositionData = () => {
  const [positions, setPositions] = useState([
    {
      llh: [20.9527494633333, 105.847014555, 0],
      count: 0,
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => [
        ...prevPositions,
        {
          llh: [
            prevPositions[prevPositions.length - 1].llh[0] +   prevPositions[prevPositions.length - 1].count,
            prevPositions[prevPositions.length - 1].llh[1] + prevPositions[prevPositions.length - 1].count,
            0
          ],
          count: prevPositions[prevPositions.length - 1].count + 0.00001,
        }
      ]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return positions;
};

export default usePositionData;
