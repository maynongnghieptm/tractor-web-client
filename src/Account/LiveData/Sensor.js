import React, { useState, useEffect } from "react";
import { faTemperatureThreeQuarters, faBatteryThreeQuarters, faGasPump, faGauge, faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import DEGEngine from './Steerbar'
import Image from "material-ui-image";
import EngineBar from './Enginebar';
import GearBar from './Gear';
import { connect } from 'react-redux';
const Sensor = ({ socketData }) => {
  const imageStyle = {
    background: 'none', // Đặt nền thành không có nền

  };
  const [sensor, setSensor] = useState(false)

  useEffect(() => {
    if (socketData && socketData.sum && socketData.sum[0] && socketData.sen && socketData.sen[0] && socketData.ctr_fed && socketData.ctr_fed[0]) {

      setSensor(true)

    }
  }, [socketData]);
  return (
    <div className='a3-item2'>
      {sensor === true ? (
        <>
          <div className='square' >
            <div className='barchar' >
              <>
                {socketData?.ctr_fed && socketData.ctr_fed.length >= 2 && (
                  <div className="barvalue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{socketData.ctr_fed[0]}</span>
                    {/* */}<DEGEngine data={socketData.ctr_fed[0]} id="progress-1" /> 
                    <DEGEngine data={socketData.ctr_fed[1]} id="progress-2" />
                   <span>{`${parseInt(socketData.ctr_fed[0])}`}</span> 
                  </div>
                )}
              </>

            </div>
            <div className='icon'>
              <Image src="/steer.png" style={imageStyle} />
            </div >
            <div className='hello-span'>
              <span >Steer</span><br />
              <span >DEG</span>
            </div>

          </div>
          <div className='square'>
            <div className='barchar' >
              <div>
                {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 4 ? (
                  <div className="progress-bars-container barvalue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{socketData.ctr_fed[2]}</span>
                    <EngineBar value={socketData.ctr_fed[2]} id='engine1' />
                    <EngineBar value={socketData.ctr_fed[3]} id='engine2' />
                    <span>{socketData.ctr_fed[3]}</span>
                  </div>
                ) : (
                  <div className="no-data-container">
                    <div className="no-data-message">Không có đủ dữ liệu.</div>
                  </div>
                )}
              </div>
            </div>
            <div  className='icon'>
              <Image src="/engine.png" style={imageStyle} />
            </div>
            <div className='hello-span'>
              <span >Engine</span><br />
              <span >RPM</span>
            </div>

          </div>

          <div className='square'>
            <div className='barchar' >
              <div>
                {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 6 ? (
                  <div className="progress-bars-container barvalue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: 'none' }}>
                    <span>{socketData.ctr_fed[6]}</span>
                    <GearBar value={socketData.ctr_fed[6]} count={7} min={2} />
                    <GearBar value={socketData.ctr_fed[7]} count={7} min={2} />
                    <span>{socketData.ctr_fed[7]}</span>
                  </div>
                ) : (
                  <div className="no-data-container">
                    <div className="no-data-message">Không có đủ dữ liệu.</div>
                  </div>
                )}
              </div>
            </div>
            <div  className='icon'>
              <Image src="/gear-stick.png" style={imageStyle} />
            </div>
            <div className='hello-span'>
              <span >Gear E</span><br />
              <span >Level</span>
            </div>
          </div>


          <div className='square'>
            <div className='barchar' >
              <div>
                {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 6 ? (
                  <div className="progress-bars-container barvalue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{socketData.ctr_fed[8]}</span>
                    <GearBar value={socketData.ctr_fed[8]} count={4} min={0} />
                    <GearBar value={socketData.ctr_fed[9]} count={4} min={0} />
                    <span>{socketData.ctr_fed[9]}</span>
                  </div>
                ) : (
                  <div className="no-data-container">
                    <div className="no-data-message">Không có đủ dữ liệu.</div>
                  </div>
                )}
              </div>
            </div>
            <div  className='icon'>
              <Image src="/gear-stick.png" style={imageStyle} />
            </div>
            <div className='hello-span'>
              <span >Gear M</span><br />
              <span >Level</span>
            </div>
          </div>


          <div className='square'>
            <div className='barchar' >
              <div>
                {socketData && socketData.ctr_fed && socketData.ctr_fed.length >= 4 ? (
                  <div className="progress-bars-container barvalue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{socketData.ctr_fed[10]}</span>
                    <EngineBar value={socketData.ctr_fed[10]} id='engine1' />
                    <EngineBar value={socketData.ctr_fed[11]} id='engine2' />
                    <span>{socketData.ctr_fed[11]}</span>
                  </div>
                ) : (
                  <div className="no-data-container">
                    <div className="no-data-message">Không có đủ dữ liệu.</div>
                  </div>
                )}
              </div>
            </div>
            <div  className='icon'>
              <Image src="/plow.png" style={imageStyle} />
            </div>
            <div className='hello-span'>
              <span >Plow </span><br />
              <span >Metter</span>
            </div>
          </div>

          <div className='square square-div' id={`onpower${socketData.ctr_oly[0]}`}>
            <div  className='icon1'>
              <Image src="/power.png" style={imageStyle} />
            </div>
          </div>
          <div className='square square-div' id={`onpower${socketData.ctr_oly[1]}`}>
            <div  className='icon1'>
              <Image src="/energy.png" style={imageStyle} />
            </div>
          </div>
          <div className='square square-div' id={`onpower${socketData.ctr_oly[2]}`}>
            <div className='icon1'>
              <Image src="/swap.png" style={imageStyle} />
            </div>
          </div>
          <div className='square square-div' id={`onpower${socketData.ctr_oly[3]}`}>
            <div  className='icon1'>
              <Image src="/lamp.png" style={imageStyle} />
            </div>
          </div>
          <div className='square square-div' id={`onpower${socketData.ctr_oly[4]}`}>
            <div  className='icon1'>
              <Image src="/lamp.png" style={imageStyle} />
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/gas-station.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{`${parseInt(socketData.sen[1])}%`} </span>)
              : (
                <div>...</div>
              )
            }
            <div className='hello-span'>
              <span >Feul </span><br />
              <span >%</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/battery.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{`${parseInt(socketData.sen[0])}%`} </span>)
              : (
                <div>...</div>
              )
            }
            <div className='hello-span'>
              <span >Battery </span><br />
              <span >%</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/thermometer.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[13]}&#176; </span>)
              : (
                <div>...</div>
              )
            }
             <div className='hello-span'>
              <span >Engine </span><br />
              <span >&#176;C</span>
            </div>

          </div>
          
          <div className='square'>
            <div  className='icon'>
              <Image src="/thermometer.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[6]}&#176; </span>)
              : (
                <div>...</div>
              )
            }
             <div className='hello-span'>
              <span >Fuel tank </span><br />
              <span >&#176;C</span>
            </div>

          </div>
          
         
          <div className='square'>
            <div  className='icon'>
              <Image src="/thermometer.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[7]}&#176; </span>)
              : (
                <div>...</div>
              )
            }
              <div className='hello-span'>
              <span >Cabin </span><br />
              <span >&#176;C</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/thermometer.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[8]}&#176; </span>)
              : (
                <div>...</div>
              )
            }
              <div className='hello-span'>
              <span >Out side </span><br />
              <span >&#176;C</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/presure.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[9]} </span>)
              : (
                <div>...</div>
              )
            }
              <div className='hello-span'>
              <span > Pressure </span><br />
              <span >atm</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/humidity.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[10]}% </span>)
              : (
                <div>...</div>
              )
            }
              <div className='hello-span'>
              <span >Cabin  </span><br />
              <span >%</span>
            </div>
          </div>
          <div className='square'>
            <div  className='icon'>
              <Image src="/humidity.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[11]}% </span>)
              : (
                <div>...</div>
              )
            }
              <div className='hello-span'>
              <span >Outside  </span><br />
              <span >%</span>
            </div>
          </div>
          
          <div className='square'>
            <div  className='icon'>
              <Image src="/wind.png" style={imageStyle} />
            </div>
            {socketData && socketData.sen && socketData.sen.length >= 6 ? (
              <span className='temperature-value value'>{socketData.sen[12]} </span>)
              : (
                <div>...</div>
              )
            }
            <div className='hello-span'>
              <span >Wind speed </span><br />
              <span >m/s</span>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => ({
  socketData: state.socketData,
});
export default connect(mapStateToProps)(Sensor)