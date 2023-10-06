import React, { useState } from "react";
import Draggable from 'react-draggable';
import Image from "material-ui-image";
import Barometer from './Tab'
import { ProgressBar } from 'react-bootstrap';
const SelectedTractorDetails = ({ data, tractorId }) => {
    const [showSensor, setShowSensor] = useState(true);
    const [showSpeed, setShowSpeed] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const [showDevice, setShowDevice] = useState(true);
    // Find the tractor data based on tractorId
    const selectedTractorData = data.data.find(item => item.tractorId === tractorId);
   // console.log(selectedTractorData)
    if (!selectedTractorData) {
        return null; // Handle the case where tractor data is not found
    }

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
                        <div className="tractor-id">{selectedTractorData.tractorId}</div>
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
                                        <div>RTK:</div>
                                        <div>Sat</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/speed.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>m/s</div>
                                    </div>

                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/roll.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Roll</div>
                                    </div>
                                    <div className="line-item">

                                        <div className="icon-detail" >
                                            <Image src="/pitch.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Pitch</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/yaw.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Yaw</div>
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/steer.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Steer</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/gear-stick.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Gear M</div>
                                    </div>

                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/plow-roll.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Plow</div>
                                    </div>
                                    <div className="line-item">

                                        <div className="icon-detail" >
                                            <Image src="/plow-metter.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Sat</div>
                                    </div>
                                    <div className="line-item">
                                        <div className="icon-detail" >
                                            <Image src="/gear-stick.png" style={{ background: "none" }} />

                                        </div>
                                        <div>RTK</div>
                                        <div>Gear E</div>
                                    </div>
                                </div>
                            </div>
                        }
                        {showSpeed &&
                            <div className="speed-data item-child">
                            <div className="chart-container" style={{ display: "flex", justifyContent: "space-between" }}>
                              <div className="chart">
                                <Barometer id="dial1" value={selectedTractorData.data[0].sensorData[1].value[1]} tick={5} min={0} max={60} danger={50} to={60} />
                                <div className="chart-label">Speed - km/h</div>
                              </div>
                              <div className="chart">
                                <Barometer id="dial2" value={selectedTractorData.data[0].sensorData[1].value[2]} tick={10} min={0} max={2500} />
                                <div className="chart-label">Engine - rpm</div>
                              </div>
                              <div className="chart">
                                <Barometer id="dial3" value={selectedTractorData.data[0].sensorData[1].value[3]} tick={5} min={0} max={10} danger={0} to={1.5} />
                                <div className="chart-label">Fuel - lit</div>
                              </div>
                            </div>
                            <div className="work-progress" style={{ textAlign: 'center'}}>
                              <ProgressBar className="working-bar-detail" striped variant="success" now={selectedTractorData.data[0].sensorData[1].value[0]} style={{ width: '90%', margin: '0 auto', }} />
                              <div style={{marginTop: '5px'}}>Percent of working: <span style={{fontSize:'1.5rem'}}>{selectedTractorData.data[0].sensorData[1].value[0]}%</span></div>
                            </div>
                          </div>
                          
                        }

                        {showStatus &&
                            <div className="status-data item-child">
                                <div className="column">
                                    <div>
                                        <div>RTK:</div>
                                        <div>Lat:</div>
                                        <div>X:</div>
                                    </div>
                                    <div>
                                        <div>Distance gone:</div>
                                        <div>Time gone:</div>
                                        <div>Feul gone:</div>
                                        <div>Battery:</div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div>
                                        <div>Satellite:</div>
                                        <div>Long:</div>
                                        <div>Y:</div>
                                    </div>
                                    <div>
                                        <div>Distance left:</div>
                                        <div>Time left:</div>
                                        <div>Feul need:</div>
                                        <div>Feul in tank:</div>
                                    </div>
                                </div>

                            </div>
                        }
                        {showDevice ? (

                            <div className="device-data ">
                                <div className="column">
                                    <div>Front L:</div>
                                    <div>Front R:</div>
                                    <div>Back L:</div>
                                    <div>Back R:</div>
                                    <div>Tem fuel:</div>
                                    <div>Tem engine:</div>
                                    <div>Tem out:</div>
                                    <div>Air speed:</div>
                                </div>
                                <div className="column">
                                    <div>Power tractor:</div>
                                    <div>Start engine:</div>
                                    <div>Power switch:</div>
                                    <div>Head light:</div>
                                    <div>Back light:</div>
                                    <div>Servor motor:</div>
                                    <div>Servor 2:</div>
                                    <div>Relay:</div>
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