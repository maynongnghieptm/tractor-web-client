import React from 'react';
const EngineBar = (props) => {
    const { value, id } = props;
 // console.log(value)
 const width = value > 100 ? `${value / 30}%` : `${value}%`;
 //console.log(width)
 
  return (
    <div className={`progress-bar-container `}>
      <div className={`progress-engine ${id}`} style={{  width }}></div>
    </div>
  );
};

export default EngineBar;
