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

const Layoutgrid = React.memo(({ socketData }) => {
  //console.log(typeof(socketData))
  const imageStyle = {
    background: 'none', // Đặt nền thành không có nền
  };

  const [sensor, setSensor] = useState([])


  useEffect(() => {
    if (socketData && socketData.sum && socketData.sum[0] && socketData.sen && socketData.sen[0] && socketData.ctr_fed && socketData.ctr_fed[0]) {
      const dataSensor = [
        { name: 'pin', value: socketData.sen[0] },
        { name: 'xang', value: socketData.sen[1] },
        { name: 'speed-front-left', value: socketData.sen[2] },
        { name: 'speed-front-right', value: socketData.sen[3] },
        { name: 'speed-back-left', value: socketData.sen[4] },
        { name: 'speed-back-right', value: socketData.sen[5] },
        { name: 'temp-fuel', value: socketData.sen[6] },
        { name: 'temp-cabin', value: socketData.sen[7] },
        { name: 'temp-evi', value: socketData.sen[8] },
        { name: 'asp', value: socketData.sen[9] },
        { name: 'do-am', value: socketData.sen[10] },
        { name: 'goc-lai-plan', value: socketData.ctr_fed[0] },
        { name: 'goc-lai-real', value: socketData.ctr_fed[1] },
        { name: 'engine-plan', value: socketData.ctr_fed[2] },
        { name: 'Engine speed', value: socketData.ctr_fed[3] },
        { name: 'con-plan', value: socketData.ctr_fed[4] },
        { name: 'con-real', value: socketData.ctr_fed[5] },
        { name: 'sophu-plan', value: socketData.ctr_fed[6] },
        { name: 'sophu-real', value: socketData.ctr_fed[7] },
        { name: 'sochinh-plan', value: socketData.ctr_fed[8] },
        { name: 'sochinh-real', value: socketData.ctr_fed[9] },
        { name: 'cang-plan', value: socketData.ctr_fed[10] },
        { name: 'cang-real', value: socketData.ctr_fed[11] },
        { name: 'danxoi-plan', value: socketData.ctr_fed[12] },
        { name: 'danxoi-real', value: socketData.ctr_fed[13] },
        { name: 'speed-max', value: socketData.ctr_fed[14] },
        { name: 'GPS speed', value: socketData.ctr_fed[15] },
        { name: 'bankinhre-plan', value: socketData.ctr_fed[15] },
        { name: 'bankinhre-real', value: socketData.ctr_fed[5] },
      ]
      setSensor(dataSensor)

    }
  }, [socketData]);


  return (
    <BasePageContainer>
      <BasePageToolbar title={'Dashboard'} />

      <Grid container spacing={3}>


        <Grid item xs={12} className='item1'>
          <div className='a'>
            <div className='a1'> </div>
            <div className='a1'>{/*< DualYAxisChart /> */}</div>
          </div>
          <div className='a5'>
            {/*<GoogleMapsComponent /> */}
          </div>

        </Grid>

        <Grid item xs={12} className='item2'>
          <div className='a2'>
            <div className='a2-item1'>
              <div className='gauge'>{/*<Speedometer /> */}</div>
              <div className='gauge'>{/*<Speedometer1 /> */}</div>
            </div>
            <div className='a2-item2'>
              <div className='donut'>{/*<ApexChart1 /> */}</div>
              <div className='donut'>{/*<ApexChart2 /> */}</div>
              <div className='donut'>{/* <ApexChart3 />*/}</div>
            </div>
          </div>
          <div className='a3'>
            <div className='a3-item1'>
              {/*  < SensorChart /> */}



            </div>
            <div className='a3-item2'>
              {sensor.length > 0 ? (
                <>
                  <div className='square' >
                    <div className='barchar' >
                      <>
                        {socketData?.ctr_fed && socketData.ctr_fed.length >= 2 && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ProgressBar data={socketData.ctr_fed[0]} id="progress-1" /> {/* Dữ liệu cho thanh tiến trình thứ nhất */}
                            <ProgressBar data={socketData.ctr_fed[1]} id="progress-2" /> {/* Dữ liệu cho thanh tiến trình thứ hai */}
                          </div>
                        )}
                      </>

                    </div>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                      <Image src="/car-steering-wheel.png" style={imageStyle} />
                    </div>
                  </div>
                  <div className='square'>
                    <div className='barchar' >
                      <div>
                        {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 4 ? (
                          <div className="progress-bars-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <EngineBar value={socketData.ctr_fed[2]} id='engine1' />
                            <EngineBar value={socketData.ctr_fed[3]} id='engine2' />
                          </div>
                        ) : (
                          <div className="no-data-container">
                            <div className="no-data-message">Không có đủ dữ liệu.</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                      <Image src="/engine.png" style={imageStyle} />
                    </div>

                  </div>

                  <div className='square'>
                    <div className='barchar' >
                      <div>
                        {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 6 ? (
                          <div className="progress-bars-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: 'none' }}>
                            <GearBar value={socketData.ctr_fed[6]} count={7} min={2} />
                            <GearBar value={socketData.ctr_fed[7]} count={7} min={2} />

                          </div>
                        ) : (
                          <div className="no-data-container">
                            <div className="no-data-message">Không có đủ dữ liệu.</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                      <Image src="/gear-stick.png" style={imageStyle} />
                    </div>
                  </div>


                  <div className='square'>
                    <div className='barchar' >
                      <div>
                        {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 6 ? (
                          <div className="progress-bars-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <GearBar value={socketData.ctr_fed[8]} count={4} min={0} />
                            <GearBar value={socketData.ctr_fed[9]} count={4} min={0} />
                          </div>
                        ) : (
                          <div className="no-data-container">
                            <div className="no-data-message">Không có đủ dữ liệu.</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                      <Image src="/gear-stick.png" style={imageStyle} />
                    </div>
                  </div>


                  <div className='square'>
                    <div className='barchar' >
                      <div>
                        {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 4 ? (
                          <div className="progress-bars-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <EngineBar value={socketData.ctr_fed[10]} id='engine1' />
                            <EngineBar value={socketData.ctr_fed[11]} id='engine2' />
                          </div>
                        ) : (
                          <div className="no-data-container">
                            <div className="no-data-message">Không có đủ dữ liệu.</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                      <Image src="/plow.png" style={imageStyle} />
                    </div>
                  </div>
                  <div className='square square-div' id={`onpower${socketData.ctr_oly[0]}`}>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                      <Image src="/power.png" style={imageStyle} />
                    </div>
                  </div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='xl' className='icon' />
                    <span className='temperature-value'>{sensor[6].value}&#176;</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='xl' className='icon' />
                    <span className='temperature-value'>{sensor[7].value}&#176;</span></div>
                    <div className='square square-div' id={`onpower${socketData.ctr_oly[1]}`}>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                      <Image src="/energy.png" style={imageStyle} />
                    </div>
                  </div>
                    <div className='square square-div' id={`onpower${socketData.ctr_oly[2]}`}>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                      <Image src="/swap.png" style={imageStyle} />
                    </div>
                  </div>
                  <div className='square square-div' id={`onpower${socketData.ctr_oly[3]}`}>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                      <Image src="/lamp.png" style={imageStyle} />
                    </div>
                  </div>
                  <div className='square square-div' id={`onpower${socketData.ctr_oly[4]}`}>
                    <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                      <Image src="/lamp.png" style={imageStyle} />
                    </div>
                  </div>



                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </Grid>

      </Grid>
    </BasePageContainer>
  );
})
const mapStateToProps = (state) => ({
  socketData: state.socketData,
});
export default connect(mapStateToProps)(Layoutgrid);