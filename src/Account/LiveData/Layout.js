import React from 'react';
import Grid from '@mui/material/Grid';
import './layout.css'

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"
import GoogleMapsComponent from "../Map/GoogleMapsComponent";
import SensorChart from './Linechart3';
import SensorChart1 from './Linechart1';
import DualYAxisChart from './Linechart2'
import Barometer from 'Administration/Dashboard/Tab';
import Test1 from './Test1'
import Test2 from './Test2'
import Test3 from './Test3'
import Sensor from './Sensor'
let count = 0
const Layoutgrid = React.memo(({data}) => {
count ++
//console.log(data)
var time = new Date();
console.log("a000000000" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()+"," + count);
  return (
    <div style={{height:'auto'}}>

      <Grid container spacing={3}>
        <Grid item xs={12} className='item1'>
          <div className='a'>
            <div className='a1'>< SensorChart1  data = {data}/> {/* */}</div>
            <div className='a1'>< DualYAxisChart  data = {data}/> {/* */}</div>
          </div>
          <div className='a5'>
            {/**/} <GoogleMapsComponent  data={data}/>
          </div>
        </Grid>
        <Grid item xs={12} className='item2'>
          <div className='a2'>
            <div className='a2-item1'>
              <div className='gauge'><Barometer id="dial1" value={data?.ctr_fed[14]} tick={5} min={0} max={60} danger={50} to={60} height={"90%"} /> {/* */}</div>
              <div className='gauge'><Barometer id="dial1" value={data?.ctr_fed[15]} tick={5} min={0} max={60} danger={50} to={60} height={"90%"} /> {/* */}</div>
            </div>
            <div className='a2-item2'>
              <div className='donut'><Test1 data= {data}/>{/* */} </div>
              <div className='donut'><Test2 data= {data}/> {/* */}</div>
              <div className='donut'><Test3 data= {data}/>{/* */}</div>
            </div>
          </div>
          <div className='a3'>
            <div className='a3-item1'>
              < SensorChart data= {data} />
            </div>
              <Sensor data={data}/> 
          </div>
        </Grid>
      </Grid>
      </div>
  );
})



export default Layoutgrid;