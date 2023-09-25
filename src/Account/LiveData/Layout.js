import React from 'react';
import Grid from '@mui/material/Grid';
import './layout.css'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"
import './Grid.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters, faBatteryThreeQuarters, faGasPump, faGauge, faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import GoogleMapsComponent from "Account/Map/GoogleMapsComponent";
import GoogleMapsComponent1 from "../Map/test"
import SensorChart from './Linechart3';
import SensorChart1 from './Linechart1';
import Speedometer from './Gaue'
import DualYAxisChart from './Linechart2'
import ApexChart1 from './Dounut1';
import Speedometer1 from './Gaue2'
import ApexChart3 from './Donut3'
import ApexChart2 from './Donut2'
import BasePageContainer from '_common/BasePageContainer/BasePageContainer';
import BasePageToolbar from '_common/BasePageToolbar/BasePageToolbar';
import LoadingBar from './Steerbar'
import store from '../../store/store'
import { Provider } from 'react-redux';
import SocketComponent from 'SocketComponent';
import ProgressBar from './Steerbar'
import Image from "material-ui-image";
import EngineBar from './Enginebar';
import GearBar from './Gear';
import { colors } from '@material-ui/core';
import DonutChart  from './Dounut1';
import DonutChart1  from './Donut2';
import DonutChart2  from './Donut3';
import Test1 from './Test1'
import Test2 from './Test2'
import Test3 from './Test3'
const Layoutgrid = React.memo(() => {
  //console.log(typeof(socketData))
  //console.log(socketData)
  const imageStyle = {
    background: 'none', // Đặt nền thành không có nền
  };

  const [sensor, setSensor] = useState(false)



  return (
    <BasePageContainer>
    <SocketComponent/>
      <BasePageToolbar title={'Dashboard'} />

      <Grid container spacing={3}>


        <Grid item xs={12} className='item1'>
          <div className='a'>
            <div className='a1'>{/*< SensorChart1 />*/}  </div>
            <div className='a1'>{/*< DualYAxisChart /> */}</div>
          </div>
          <div className='a5'>
            {/*<GoogleMapsComponent />*/} 
          </div>

        </Grid>

        <Grid item xs={12} className='item2'>
          <div className='a2'>
            <div className='a2-item1'>
              <div className='gauge'>{/* <Speedometer />*/}</div>
              <div className='gauge'>{/*<Speedometer1 /> */}</div>
            </div>
            <div className='a2-item2'>
              <div className='donut'>{/*<ApexChart1 />*/} <Test1/> </div>
              <div className='donut'>{/*<ApexChart2 />*/} <Test2/> </div>
              <div className='donut'>{/*<ApexChart3 /> */} <Test3/></div>
            </div>
          </div>
          <div className='a3'>
            <div className='a3-item1'>
              {/* < SensorChart />
 */} 


            </div>
            <div className='a3-item2'>
           </div>
          </div>
        </Grid>

      </Grid>
    </BasePageContainer>
  );
})


export default Layoutgrid;