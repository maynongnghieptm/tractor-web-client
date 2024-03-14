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
import Video from "./Video"
import LineChart from './Linechart';
import DualYAxChart from './DualYAxChart';
import Map from './Maps';
import Gauge from './Gauge';
import Gauge1 from './Gauge1';
import Donut from './Donut';
import Donut1 from './Donut1';
import Donut2 from './Donut2';
import Sensor1 from './SensorChart';
import LineChart4 from './Line4';
let count = 0
const Layoutgrid = (id) => {
const tractorId= id.id
var time = new Date();
//console.log("a000000000" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()+"," + count);
  return (
    <div style={{height:'auto'}}>

      <Grid container spacing={3}>
        <Grid item xs={12} className='item1'>
          <div className='a'>
            <div className='a1'>< LineChart id={tractorId}  /> {/*SensorChart data = {data} */}</div>
            <div className='a1'><DualYAxChart id={tractorId} /> {/* < DualYAxisChart  data = {data}/> */}</div>
          </div>
          <div className='a-video'>
            <Video id={tractorId}/>
          </div>
          <div className='a5'>
            <Map id={tractorId} />{/** <GoogleMapsComponent  data={data}/>*/}
          </div>
        </Grid>
        <Grid item xs={12} className='item2'>
          <div className='a2'>
            <div className='a2-item1'>
              <div className='gauge'><Gauge id={tractorId} /> {/*<Barometer id="dial1" value={data?.ctr_fed[14]} tick={5} min={0} max={60} danger={50} to={60} height={"90%"} /> */}</div>
              <div className='gauge'> <Gauge1 id={tractorId} /> {/*<Barometer id="dial1" value={data?.ctr_fed[15]} tick={5} min={0} max={60} danger={50} to={60} height={"90%"} /> */}</div>
            </div>
            <div className='a2-item2'>
              <div className='donut'> <Donut id={tractorId} />{/*<Test1 data= {data}/> */} </div>
              <div className='donut'> <Donut1 id={tractorId} /> {/*<Test2 data= {data}/> */}</div>
              <div className='donut'><Donut2 id={tractorId} />{/*<Test3 data= {data}/> */}</div>
            </div>
          </div>
          <div className='a3'>
            <div className='a3-item1'>
             {/** */}
             <LineChart4 id={tractorId}/>
            </div>
            <Sensor1 id={tractorId}/>{/**< SensorChart data= {data} /> */} {/**<Sensor data={data}/>  */} 
          </div>
        </Grid>
      </Grid>
      </div>
  );
}



export default Layoutgrid;