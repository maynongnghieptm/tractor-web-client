import React from 'react';
import { connect } from 'react-redux';

const EngineBar = (props) => {
    const { value, id } = props;
 // console.log(value)
 const width = value > 100 ? `${value / 50}%` : `${value}%`;
 //console.log(width)
 
  return (
    <div className={`progress-bar-container `}>
      <div className={`progress-bar ${id}`} style={{  width }}></div>
    </div>
  );
};




export default EngineBar;
