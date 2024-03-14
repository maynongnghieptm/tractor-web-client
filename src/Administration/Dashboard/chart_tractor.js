import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
import Layoutgrid from "../../Account/LiveData/Layout";
const Chart = (props) => {
  //const { tractorId } = props.match.params;
  const [data, setData] = useState(null);
  const {tractorId}=useParams()
  console.log(tractorId)
 

  return (
    <div style={{ backgroundColor: "#040D12" }}>
      <Layoutgrid id={tractorId} />
    </div>
  );
};

export default Chart;
