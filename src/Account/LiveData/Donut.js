import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"
import './Grid.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters, faBatteryThreeQuarters, faGasPump, faGauge, faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import GoogleMapsComponent from "Account/Map/GoogleMapsComponent";
import GoogleMapsComponent1 from "../Map/test"
import SensorChart from './Linechart3';
import DonutChart from './Donut_time'
import { LineChart } from 'recharts';
import SensorChart1 from './Linechart1';
import Speedometer from './Gaue'
import DualYAxisChart from './Linechart2'
import ApexChart1 from './Dounut1';
import Speedometer1 from './Gaue2'
import ApexChart2 from './Donut2'
import ApexChart3 from './Donut3'
const DonutRoad = React.memo(({ socketData }) => {
  //console.log(socketData)

  //const centerLabel = 'Total Data';
  // const [donut1, setDonut1] = useState([])
  //const [donut2, setDonut2] = useState([])
  const [donut3, setDonut3] = useState([])
  const [sensor, setSensor] = useState([])
  useEffect(() => {

    if (socketData && socketData.sum && socketData.sum[0] && socketData.sen && socketData.sen[0] && socketData.ctr_fed && socketData.ctr_fed[0]) {
      /*
       const dataA = [
         { name: 'Category A', value: socketData.sum[1] },
         { name: 'Category b', value: socketData.sum[0] }
         // ...
       ];
 
       const dataB = [
         { name: 'Category B', value: socketData.sum[3] },
         { name: 'Category b', value: socketData.sum[2] }
         // ...
       ];
 
       const dataC = [
         { name: 'Category C', value: socketData.sum[5] },
         { name: 'Category a', value: socketData.sum[4] }
         // ...
       ];
       */

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

      //setDonut1(dataA)
      //setDonut2(dataB)
      //setDonut3(dataC)
      setSensor(dataSensor)
    }
    //console.log(donut1,donut2,donut3)  

  }, [socketData]);







  return (

    <div className="grid-container">
      <div className="grid-item">
        <div className="grid-container-column1">
          <div className="grid-chart">
            <div className='grid-item-child'>

              {/**   <SensorChart1 />   */}

            </div>
            <div className='grid-item-child'>

              {/**<DualYAxisChart/> */}
            </div>

          </div>
          <div className="grid2-item grid-donut">
            <div className="donut-chart">
              <div className="donut-chart-1">
                <div className='gauge-chart'>{/**       <Speedometer1/>        */}
                </div>
                <div className='gauge-chart'>

                  {/**  <Speedometer/>*/}
                </div>
              </div>
              <div className="donut-chart-2">

                <div className="dounut">
                  {/* */}
                  {/** <DonutChartExample data={donut1} colors={COLORS} /><DonutChart/> <ApexChart1/>  */}

                </div>
                <div className="dounut">
                  {/* <ApexChart1 seriesData={[socketData?.sum?.[3] ?? 0,
        socketData?.sum?.[2] ?? 0]}/>*/ }
                  {/**<DonutChartExample data={donut2} colors={COLORS} /><ApexChart2/> <DonutChart1/> */}

                </div>
                <div className="dounut">
                  {/* <ApexChart1 seriesData={[socketData?.sum?.[5] ?? 0,
        socketData?.sum?.[4] ?? 0]}/> */ }
                  {/** <DonutChartExample data={donut3} colors={COLORS} />   <DonutChart2/><ApexChart3/>      */}


                </div>
              </div>
            </div>
            <div className="line-chart">{/**<SensorChart />  */}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-item grid-item-2">
        <div className="grid-container-column2">
          <div className="ggmap">{/*<GoogleMapsComponent/> */}
          </div>
          <div className="grid2-item1">
            <div className='square1'>

              {
                sensor.length > 14 ? (
                  <>
                    <div className='square'>
                      <span className='temperature-value'>{sensor[11].value}&#176;</span></div>
                    <div className='square'>
                      <span className='temperature-value'>{sensor[12].value}&#176;</span></div>
                    <div className='square'><FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[13].value}{' rpm'}</span></div>
                    <div className='square'>
                      <FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[14].value}{' rpm'}</span>
                    </div>
                    <div className='square'>
                      <FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[15].value}</span>
                    </div>
                    <div className='square'><FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[16].value}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[17].value}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[18].value}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[19].value}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faGear} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[20].value}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faBatteryThreeQuarters} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[21].value}{'%'}</span></div>
                    <div className='square'><FontAwesomeIcon icon={faBatteryThreeQuarters} size="xl" className='icon' />
                      <span className='temperature-value'>{sensor[22].value}{'%'}</span></div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}

            </div>
            <div className='square2'>

              {sensor.length > 0 ? (
                <>
                  <div className='square'>
                    <FontAwesomeIcon icon={faBatteryThreeQuarters} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[0].value}{'%'}</span>
                  </div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faGasPump} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[1].value}{'%'}</span>
                  </div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[2].value.toFixed(2)}{' rpm'}</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[3].value.toFixed(2)}{' rpm'}</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[4].value.toFixed(2)}{' rpm'}</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faGauge} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[5].value.toFixed(2)}{' rpm'}</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='xl' className='icon' />
                    <span className='temperature-value'>{sensor[6].value}&#176;</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='xl' className='icon' />
                    <span className='temperature-value'>{sensor[7].value}&#176;</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='xl' className='icon' />
                    <span className='temperature-value'>{sensor[8].value}&#176;</span></div>
                  <div className='square'> <span className='temperature-value'>{sensor[9].value}</span>
                  </div>
                  <div className='square'><span className='temperature-value'>{sensor[10].value}</span></div>
                  <div className='square'>
                    <FontAwesomeIcon icon={faWind} size="xl" className='icon' />
                    <span className='temperature-value'>{sensor[11].value}</span>
                  </div>



                </>
              ) : (
                <div>Loading...</div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>

  );
});

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(DonutRoad);
