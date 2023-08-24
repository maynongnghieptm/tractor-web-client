import React from 'react';
import { useSelector } from 'react-redux';

const DisplayComponent = () => {
  const allSocketData = useSelector((state) => state.socketData);
    console.log(allSocketData)
  return (
    <div>
     
    </div>
  );
};

export default DisplayComponent;
