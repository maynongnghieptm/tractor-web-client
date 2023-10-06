import React from 'react';
import Grid from '@mui/material/Grid';
import './layout.css'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"
import GoogleMapsComponent from "Account/Map/GoogleMapsComponent";
import SensorChart from './Linechart3';
import SensorChart1 from './Linechart1';
import Speedometer from './Gaue'
import DualYAxisChart from './Linechart2'
import Speedometer1 from './Gaue2'
import BasePageContainer from '_common/BasePageContainer/BasePageContainer';
import BasePageToolbar from '_common/BasePageToolbar/BasePageToolbar';
import { Provider } from 'react-redux';
import SocketComponent from 'SocketComponent';
import Test1 from './Test1'
import Test2 from './Test2'
import Test3 from './Test3'
import Sensor from './Sensor'
const Layoutgrid = React.memo(() => {
  //console.log(typeof(socketData))
  //console.log(socketData)
  return (
    <BasePageContainer>
    <SocketComponent/>
      <BasePageToolbar title={'Dashboard'} />
      <Grid container spacing={3}>
        <Grid item xs={12} className='item1'>
          <div className='a'>
            <div className='a1'>{/* */}< SensorChart1 /> </div>
            <div className='a1'>{/**/}< DualYAxisChart /> </div>
          </div>
          <div className='a5'>
            {/**/} <GoogleMapsComponent />
          </div>
        </Grid>
        <Grid item xs={12} className='item2'>
          <div className='a2'>
            <div className='a2-item1'>
              <div className='gauge'>{/* */}<Speedometer /></div>
              <div className='gauge'>{/* */}<Speedometer1 /></div>
            </div>
            <div className='a2-item2'>
              <div className='donut'>{/*<ApexChart1 /> */} <Test1/> </div>
              <div className='donut'>{/*<ApexChart2 />*/} <Test2/>  </div>
              <div className='donut'>{/*<ApexChart3 />  */}<Test3/></div>
            </div>
          </div>
          <div className='a3'>
            <div className='a3-item1'>
              {/* */}< SensorChart />
            </div>
           {/**/} <Sensor/> 
          </div>
        </Grid>
      </Grid>
    </BasePageContainer>
  );
})



export default Layoutgrid;