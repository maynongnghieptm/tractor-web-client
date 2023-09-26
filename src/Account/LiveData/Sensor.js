import React, {useState, useEffect} from "react";
import { faTemperatureThreeQuarters, faBatteryThreeQuarters, faGasPump, faGauge, faWind, faGear } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './Steerbar'
import Image from "material-ui-image";
import EngineBar from './Enginebar';
import GearBar from './Gear';
import { connect } from 'react-redux';
const Sensor= ({socketData})=>{
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
        {sensor === true  ? (
          <>
            <div className='square' >
              <div className='barchar' >
                <>
                  {socketData?.ctr_fed && socketData.ctr_fed.length >= 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/*<ProgressBar data={socketData.ctr_fed[0]} id="progress-1" /> 
                      <ProgressBar data={socketData.ctr_fed[1]} id="progress-2" /> */}       
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

            <div className='square'>
            <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                <Image src="/thermometer.png" style={imageStyle} />
              </div>
              {socketData&&socketData.sen&&socketData.sen.length >= 6?(
                <span className='temperature-value'>{socketData.sen[6]}&#176; </span>)
                : (
                  <div>...</div>
                )
              }
             
            </div>
            <div className='square'>
                <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                <Image src="/thermometer.png" style={imageStyle} />
                </div>
                {socketData&&socketData.sen&&socketData.sen.length >= 6?(
                <span className='temperature-value'>{socketData.sen[6]}&#176; </span>)
                : (
                  <div>...</div>
                )
              }
                </div>
                <div className='square square-div' id={`onpower${socketData.ctr_oly[0]}`}>
              <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon1'>
                <Image src="/power.png" style={imageStyle} />
              </div>
            </div>
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
            <div className='square'>
                <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                <Image src="/gas-station.png" style={imageStyle} />
                </div>
                {socketData&&socketData.sen&&socketData.sen.length >= 6?(
                <span className='temperature-value'>{`${parseInt(socketData.sen[1])}%`} </span>)
                : (
                  <div>...</div>
                )
              }
                </div>
                <div className='square'>
                <div style={{ width: '32px', height: '32px', margin: '0', padding: '0' }} className='icon'>
                <Image src="/half-battery.png" style={imageStyle} />
                </div>
                {socketData&&socketData.sen&&socketData.sen.length >= 6?(
                <span className='temperature-value'>{`${parseInt(socketData.sen[0])}%`} </span>)
                : (
                  <div>...</div>
                )
              }
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
export default connect(mapStateToProps) (Sensor)