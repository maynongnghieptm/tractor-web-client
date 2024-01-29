import React, { useState } from "react";
import Draggable from 'react-draggable';
import Image from "material-ui-image";
import Barometer from './Tab'
import { ProgressBar } from 'react-bootstrap';
const SelectedTractorDetails = ({ data, tractorId, onRemove, updateShowPasswordState  }) => {
    const [showSensor, setShowSensor] = useState(true);
    const [showSpeed, setShowSpeed] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const [showDevice, setShowDevice] = useState(true)
    const selectedTractorData = data.find(item => item.tractorId === tractorId);
   // console.log(selectedTractorData)
    if (!selectedTractorData) {
        return null; 
    }
    const handleRemoveTractor = () => {
        onRemove(tractorId);
        updateShowPasswordState(tractorId, false);
      };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        switch (name) {
            case 'sensor':
                setShowSensor(checked);
                break;
            case 'speed':
                setShowSpeed(checked);
                break;
            case 'status':
                setShowStatus(checked);
                break;
            case 'device':
                setShowDevice(checked);
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <Draggable>
                <div className="tractor-details">
                    <div className="tab">
                        <div className="tractor-id" style={{display: 'flex' , justifyContent: 'space-between', paddingRight:'10px'}}>
                            <span >{selectedTractorData.tractorName}</span>
                            <div className="icon-close">
                                <img src="/icon-close.png" onClick={handleRemoveTractor}></img>
                            </div>
                        </div>
                        <div className="list-tab">
                        <label className="checkbox-label">
                            <input 
                                type="checkbox"
                                name="sensor"
                                checked={showSensor}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="speed"
                                checked={showSpeed}
                                onChange={handleCheckboxChange}
                            />  
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="status"
                                checked={showStatus}
                                onChange={handleCheckboxChange}
                            />
                            
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="device"
                                checked={showDevice}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                        </div>
                    </div>
                    <div className="realtime-data">
                        {showSensor &&
                            <div className="sensor-data item-child">
                                <div className="line">
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/satellite.png" style={{ background: "none" }} />
                                        </div>
                                        <div>RTK: {selectedTractorData.data.rtk[0]}</div>
                                        <div>Sat</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/speed.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Speed: {parseInt(selectedTractorData.data.ctr_fed[15])}</div>
                                        <div>m/s</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/roll.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Roll: {parseInt(selectedTractorData.data.ypr[2])} </div>
                                        <div>Deg</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/pitch.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Pitch: {parseInt(selectedTractorData.data.ctr_fed[1])}</div>
                                        <div>Deg</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/yaw.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Yaw: {parseInt(selectedTractorData.data.ctr_fed[0])}</div>
                                        <div>Deg</div>
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/steer.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Steer: {parseInt(selectedTractorData.data.ctr_fed[1])} </div>
                                        <div>Deg</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/gear-stick.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Gear M: {selectedTractorData.data.ctr_fed[9]} </div>
                                        <div>Level</div>
                                    </div>

                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/plow-roll.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Plow: {parseInt(selectedTractorData.data.ctr_fed[13])}</div>
                                        <div>Deg</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/plow-metter.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Plow: {selectedTractorData.data.ctr_fed[11]}</div>
                                        <div>Metter</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/gear-stick.png" style={{ background: "none" }} />
                                        </div>
                                        <div>Gear E: {selectedTractorData.data.ctr_fed[7]}</div>
                                        <div>Level</div>
                                    </div>
                                </div>
                            </div>
                        }
                        {showSpeed &&
                            <div className="speed-data item-child">
                            <div className="chart-container" style={{ display: "flex", justifyContent: "space-between" }}>
                              <div className="chart">
                                <Barometer  id="dial1" value={selectedTractorData.data.ctr_fed[15]} tick={5} min={0} max={60} danger={50} to={60} width={100} height={100} />
                                <div className="chart-label" >Speed - km/h</div>
                              </div>
                              <div className="chart">
                                <Barometer id="dial2" value={selectedTractorData.data.ctr_fed[3]} tick={10} min={0} max={2500}  danger={2300} to={2500} width={100} height={100} />
                                <div className="chart-label">Engine - rpm</div>
                              </div>
                              <div className="chart">
                                <Barometer id="dial3" value={selectedTractorData.data.sen[1]} tick={5} min={0} max={100} danger={0} to={20} width={100} height={100}  />
                                <div className="chart-label">Fuel - lit</div>
                              </div>
                            </div>
                            <div className="work-progress" style={{ textAlign: 'center'}}>
                              <ProgressBar className="working-bar-detail" striped variant="success" now={parseInt((selectedTractorData.data.sum[3]/(selectedTractorData.data.sum[3]+selectedTractorData.data.sum[2]))*100)} style={{ width: '90%', margin: '0 auto', }} />
                              <div style={{marginTop: '5px'}}>Percent of working: <span style={{fontSize:'1.5rem'}}>{selectedTractorData.data.sum[0]}%</span></div>
                            </div>
                          </div>
                          
                        }

                        {showStatus &&
                            <div className="status-data item-child">
                                <div className="column">
                                    <div>
                                        <div>RTK: {selectedTractorData.data.rtk[0]}</div>
                                        <div>Lat: {selectedTractorData.data.llh[0]}</div>
                                        <div>X: {selectedTractorData.data.xyz[0].toFixed(6)}</div>
                                    </div>
                                    <div>
                                        <div>Distance gone: {selectedTractorData.data.sum[3]}</div>
                                        <div>Time gone: {selectedTractorData.data.sum[1]}</div>
                                        <div>Feul gone: {selectedTractorData.data.sum[5]}</div>
                                        <div>Battery: {selectedTractorData.data.sen[0]}</div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div>
                                        <div>Satellite: {selectedTractorData.data.rtk[1]}</div>
                                        <div>Long: {selectedTractorData.data.llh[1]}</div>
                                        <div>Y: {selectedTractorData.data.xyz[1]}</div>
                                    </div>
                                    <div>
                                        <div>Distance left: {selectedTractorData.data.sum[2]} </div>
                                        <div>Time left: {selectedTractorData.data.sum[0]}</div>
                                        <div>Feul need: {selectedTractorData.data.sum[4]}</div>
                                        <div>Feul in tank: {selectedTractorData.data.sen[1]}</div>
                                    </div>
                                </div>

                            </div>
                        }
                        {showDevice ? (

                            <div className="device-data ">
                                <div className="column">
                                    <div>Front L: {selectedTractorData.data.sen[2]}</div>
                                    <div>Front R: {selectedTractorData.data.sen[3]}</div>
                                    <div>Back L: {selectedTractorData.data.sen[4]}</div>
                                    <div>Back R: {selectedTractorData.data.sen[5]}</div>
                                    <div>Temp fuel: {selectedTractorData.data.sen[6]}</div>
                                    <div>Temp engine: {selectedTractorData.data.sen[7]}</div>
                                    <div>Temp out: {selectedTractorData.data.sen[8]}</div>
                                    <div>Air speed: {selectedTractorData.data.sen[12]}</div>
                                </div>
                                <div className="column">
                                    <div>Power tractor: {selectedTractorData.data.ctr_oly[0]}</div>
                                    <div>Start engine: {selectedTractorData.data.ctr_oly[1]}</div>
                                    <div>Power switch: {selectedTractorData.data.ctr_oly[2]}</div>
                                    <div>Head light: {selectedTractorData.data.ctr_oly[3]}</div>
                                    <div>Back light: {selectedTractorData.data.ctr_oly[4]}</div>
                                    <div>Servor motor: {selectedTractorData.data.ctr_oly[5]}</div>
                                    <div>Servor 2: {selectedTractorData.data.ctr_oly[6]}</div>
                                    <div>Relay: {selectedTractorData.data.ctr_oly[7]}</div>
                                </div>
                            </div>
                               ) : null}
                    </div>
                </div>
            </Draggable>
        </div>
    );
};

export default SelectedTractorDetails