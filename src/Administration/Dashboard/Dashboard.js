import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon, InfoWindow  } from '@react-google-maps/api';
import { ProgressBar } from 'react-bootstrap';
import ReactSpeedometer from "react-d3-speedometer";
import SelectedTractorDetails from './Tractor_details';
import Dial from './feul_display';
import Barometer from './Tab'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./rp.css"
import './style.css'
const data = {
    "data": [
        {
            "tractorId": "Tractor1",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 0
                        },
                        {
                            "value": [4, 11.56,1500, 2.4, 0]
                        },
                        {
                            "llh": [21.067544453918774, 106.56124945459284]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.067544453918774, 106.56124945459284
                        , 21.067194044294045, 106.5621962743751
                        , 21.06682611329961, 106.56204875287928
                        , 21.06717652379114, 106.56107511100687

                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor2",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 0
                        },
                        {
                            "value": [6, 30.4,1100, 3.2, 45, 0]
                        },
                        {
                            "llh": [21.067978293362565, 106.56140023020488]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.067978293362565, 106.56140023020488
                        , 21.067620375995126, 106.56248116043788
                        , 21.0672474401995, 106.56231754568797
                        , 21.067642902288405, 106.56126075533611
                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor3",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 1
                        },
                        {
                            "value": [60, 19.4,2000, 2.7, 0]
                        },
                        {
                            "llh": [21.067092316054406, 106.56104732496756]
                        }
                    
                    ]
                },
                {
                    "fieldCoordinates":
                        [
                              21.067092316054406, 106.56104732496756
                            , 21.06669685250163, 106.56206656439322
                            , 21.066316405559817, 106.56190563185233
                            , 21.066661811376616, 106.56088639242667
                        ]

                }
            ]
        },
        {
            "tractorId": "Tractor4",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 1
                        },
                        {
                            "value": [23, 45.5,1100, 0.4, 2]
                        },
                        {
                            "llh": [21.06658403770179, 106.5608402226318]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.06658403770179, 106.5608402226318
                        , 21.066233625814455, 106.56190774181972
                        , 21.066035893027998, 106.56182727554928
                        , 21.06596330750878, 106.56055859068523
                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor5",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 1
                        },
                        {
                            "value": [90, 60.4,1400, 1.5, 0]
                        },
                        {
                            "llh": [21.066907394859435, 106.55975429507001]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.066907394859435, 106.55975429507001
                        , 21.067555653265437, 106.56039802523358
                        , 21.06746805094325, 106.5605267712663
                        , 21.067327887120417, 106.56056700440152
                        , 21.067240284664074, 106.56056700440152
                        , 21.067122646998694, 106.56052945347531
                        , 21.06705757080339, 106.56057773323758
                        , 21.066994997511838, 106.56062869520886
                        , 21.066496913172337, 106.56001983376248
                        , 21.06663457483999, 106.55984817238553
                        , 21.066744704082378, 106.55980525704129
                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor6",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 1
                        },
                        {
                            "value": [80, 22.3,2300, 8.4, 1]
                        },
                        {
                            "llh": [21.067421690545356, 106.55866857971863]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.067421690545356, 106.55866857971863
                        , 21.067797128822786, 106.55902799572662
                        , 21.067774602552877, 106.55925598349289
                        , 21.067346602776155, 106.55879464354233
                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor7",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 1
                        },
                        {
                            "value": [56, 43.2,2000, 2.5, 0]
                        },
                        {
                            "llh": [21.068899818685804, 106.55883542529541]
                        }
                    ]
                },
                {
                    "fieldCoordinates": [
                          21.068899818685804, 106.55883542529541
                        , 21.068654534270408, 106.55958242050606
                        , 21.06852813755149, 106.55955828062493
                        , 21.068508114299025, 106.55951938859421
                        , 21.06876591346836, 106.55877507559258
                    ]
                }
            ]
        },
        {
            "tractorId": "Tractor8",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 0
                        },
                        {
                            "value": [11, 66.6,1800, 3.0, 1]
                        },
                        {
                            "llh": [21.0679319912789, 106.55866745996374]
                        }
                    ]
                },
                {
                    "fieldCoordinates":
                        [
                              21.0679319912789, 106.55866745996374
                            , 21.067836880424483, 106.55885119128126
                            , 21.067610366171056, 106.5586594133367
                            , 21.067702974250054, 106.55850786852736
                        ]
                }
            ]
        },
        {
            "tractorId": "Tractor9",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 0
                        },
                        {
                            "value": [11, 66.6,1100, 3.0, 1]
                        },
                        {
                            "llh": [21.0679319912756, 106.55866745996378]
                        }
                    ] 

                },
                {
                    "fieldCoordinates":
                        [
                              21.0679319912756, 106.55866745996378
                            , 21.067836880424456, 106.55885119128178
                            , 21.067610366171034, 106.5586594133345
                            , 21.067702974250047, 106.55850786852774
                        ]
                }
            ]
        },
        {
            "tractorId": "Tractor10",
            "data": [
                {
                    "sensorData": [
                        {
                            "isRunning": 0
                        },
                        {
                            "value": [11, 66.6,2200, 2.0, 1]
                        },
                        {
                            "llh": [21.0679319912734, 106.55866745996312]
                        }
                    ]
                },
                {
                    "fieldCoordinates":
                        [     21.0679319912734, 106.55866745996312
                            , 21.067836880424421, 106.55885119128198
                            , 21.067610366171084, 106.5586594133348
                            , 21.067702974250093, 106.55850786852739
                        ]
                }
            ]
        },
    ]
}

const iconButtonStyles = {
    padding: 0, // Remove default padding
    background: 'none', // Remove background
};

// CSS styles for the icon
const iconStyles = {
    fontSize: '24px', // Customize the icon size
    color: 'inherit', // Inherit the color from the parent
};
//console.log(data)
const MapContainer = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const initialShowPasswordStates = {};

    data.data.forEach((item) => {
      initialShowPasswordStates[item.tractorId] = false;
    });
    
    const [showPasswordStates, setShowPasswordStates] = useState(initialShowPasswordStates);
    console.log(showPasswordStates)
    const [isDivOpen, setIsDivOpen] = useState(false);
    const [selectedTractorId, setSelectedTractorId] = useState([]);
    const totalTractors = data.data.length;
    const runningTractors = data.data.filter((item) => item.data[0].sensorData[0].isRunning === 1).length;
    const standingTractors = data.data.filter((item) => item.data[0].sensorData[0].isRunning === 0).length;
    const [totalTractorsCount, setTotalTractorsCount] = useState(totalTractors);
    const [runningTractorsCount, setRunningTractorsCount] = useState(runningTractors);
    const [standingTractorsCount, setStandingTractorsCount] = useState(standingTractors);  
    const [selectedMarker, setSelectedMarker] = useState([]);  
    // Cập nhật số lượng tractor và số lượng tractor running/standing
    
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
       
    };

    const mapStyles = {
        height: '100%',
        width: '100%',
    };
    const polygonColors = ['#FF0000', '#00FF00']; // Thay đổi màu tại đây
    const filteredPolygons = data.data.filter((item) => {
        if (selectedTab === 'all') {
            return true; // Hiển thị tất cả dữ liệu
        } else if (selectedTab === 'standing' && item.data[0].sensorData[0].isRunning === 0) {
            // Lọc dữ liệu chỉ khi tab là "Standing" và isRunning là "0"
            return true;
        } else if (selectedTab === 'running' && item.data[0].sensorData[0].isRunning === 1) {
            // Lọc dữ liệu chỉ khi tab là "Running" và isRunning là "1"
            return true;
        }
        return false;
    });
console.log()

    const toggleShowPassword = (tractorId) => {
        setShowPasswordStates((prevState) => ({
            ...prevState,
            [tractorId]: !prevState[tractorId],
          }));
        
        // Check if the tractor ID is in the selectedTractorIds array
        const isSelected = selectedTractorId.includes(tractorId);
    
        // If selected, remove it; otherwise, add it to the selectedTractorIds array
        if (isSelected) {
          setSelectedTractorId(selectedTractorId.filter(id => id !== tractorId));
        } else {
          setSelectedTractorId([...selectedTractorId, tractorId]);
        }
      };
      //console.log(selectedTractorId)
     
      //console.log(selectedTractorId)
    
    return (
        <div style={{ width: '100%', height: '100%' }} >
            
            <div className='tab-tractor'>
            <div className='tab-list'>
                    <div
                        className={`tab-child tab-all ${selectedTab === 'all' ? 'choose' : ''}`}
                        onClick={() => handleTabClick('all')}
                    >
                        All
                        <div>{totalTractorsCount}</div>
                    </div>
                    <div
                        className={`tab-child  tab-standing ${selectedTab === 'standing' ? 'choose' : ''}`}
                        onClick={() => handleTabClick('standing')}
                    >
                        Standing
                        <div>{standingTractorsCount}</div>
                    </div>
                    <div
                        className={`tab-child tab-running ${selectedTab === 'running' ? 'choose' : ''}`}
                        onClick={() => handleTabClick('running')}
                    >
                        Running
                        <div>{runningTractorsCount}</div>
                    </div>
                </div>

            <div className='list-tractor'>
              
                <div>
                    {/* Hiển thị dữ liệu dựa trên tab được chọn */}
                    <ul style={{padding: "0"}} className='list'>
                        {filteredPolygons.map((item, index) => (

                            <li key={index} className='tractor-item'>
                              <div className='tractor-item-child'>
                              <img
                                    onClick={() => toggleShowPassword(item.tractorId)}
                                    src={showPasswordStates[item.tractorId] ? '/open.png' : '/close.png'}
                                    alt="Logo"
                                    className="logo-img"
                                />
                              </div>
                                <div  className='tractor-item-child'>
                                <img 
                                    src={getTractorBattery(item)[1]} alt="Logo" className="logo-img" 
                                />
                                </div>
                                
                                <div className='tractor-item-child' style={{width: '60px'}}>
                                {item.tractorId.length > 9 ? `${item.tractorId.substring(0,8)}...` : item.tractorId}
                                </div>
                                <div className='tractor-item-child'>
                                    <div className='sensor-value'>{item.data[0].sensorData[1].value[0]}%</div>
                                    <div className='same-height'>
                                        <ProgressBar striped variant={getTractorProgress(item)} now={item.data[0].sensorData[1].value[0]} style={{ width: '40px', height: '10px' }}  />
                                    </div>
                                    </div>
                                    <div className="speedometer tractor-item-child" style={{ display: 'flex', justifyContent: 'center', width: '80px', height: '80px' }}>
                                    <Barometer id="dial1" value={item.data[0].sensorData[1].value[1]} tick={5} min={0} max={60} danger={50} to={60} />
                                       
                                    </div>
                                    <div className='tractor-item-child'>
                                    <div className='sensor-value'>{item.data[0].sensorData[1].value[3]}L</div>
                                    <div className='same-height'>
                                    <ProgressBar variant={getTractorBattery(item)[0]} now={(item.data[0].sensorData[1].value[3]/10)*100} style={{ width: '40px',height: '10px' }}  />
                                    
                                    </div>
                                    
                                    </div>
                                    <div className='tractor-item-child'>
                                    <div className='sensor-value'>{item.data[0].sensorData[1].value[4]}</div>
                                    <div className='same-height'>
                                    <img src={getTractorStatus(item)} alt="Logo" class="logo-img"></img>
                               
                                    </div>
                                    
                                    </div>
                                  
                            </li>


                        ))}
                    </ul>

                </div>

            </div>
            </div>
            {selectedTractorId.map((tractorId, index) => (
                 
        <SelectedTractorDetails  data={data} key={index} tractorId={tractorId} />
       
      ))}
            <LoadScript
                googleMapsApiKey="AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM"
             
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={{ lat: 21.0679319912789, lng: 106.55866745996374 }}
                    zoom={10}
                >
                   {
                   filteredPolygons.map((item, index) => {
    const isRunning = item.data[0].sensorData[0].isRunning;
    const feul = item.data[0].sensorData[1].value[2];
    const color = isRunning === 1 ? 'green' : 'orange';
    const plans = [];
    const newPos = {
        lat: item.data[0].sensorData[2].llh[0],
        lng: item.data[0].sensorData[2].llh[1]
    };
    for (let i = 0; i < item.data[1].fieldCoordinates.length; i += 2) {
        plans.push({
            lat: item.data[1].fieldCoordinates[i],
            lng: item.data[1].fieldCoordinates[i + 1],
        });
    }
    const isMarkerSelected = selectedMarker.some((marker) => marker.tractorId === item.tractorId);

    return (
        <>
            <Polygon
                key={index}
                paths={plans}
                options={{
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35,
                }}
            />
            <Marker
                key={index}
                position={newPos}
               
                onClick={() => {
                    if (isMarkerSelected) {
                        // Deselect the marker if it's already selected
                        setSelectedMarker(selectedMarker.filter((marker) => marker.tractorId !== item.tractorId));
                    } else {
                        // Select the marker if it's not selected
                        setSelectedMarker([...selectedMarker, item]);
                    }
                }}
            />

            {isMarkerSelected && (
                <InfoWindow
                    position={newPos}
                    onCloseClick={() => {
                        // Deselect the marker when the InfoWindow is closed
                        setSelectedMarker(selectedMarker.filter((marker) => marker.tractorId !== item.tractorId));
                    }}
                >
                    <div>
                        <h2>{item.tractorId}</h2>
                        <p>Working Status: {item.data[0].sensorData[1].value[0]}</p>
                        <p>Feul: {item.data[0].sensorData[1].value[3]}</p>
                        <p>Speed: {item.data[0].sensorData[1].value[2]}</p>
                    </div>
                </InfoWindow>
            )}

        </>
    );
})}
 
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

function getTractorProgress(item) {
    const battery = item.data[0].sensorData[1].value[0];
    if (battery >= 60) {
        return "success";
    } else if (battery > 20 && battery < 60) {
        return "warning";
    } else {
        return "danger";
    }
}

function getTractorBattery(item) {
    const battery = (item.data[0].sensorData[1].value[3]/10)*100;
    if (battery >= 60) {
        return ["success", "/tractor-icon.svg"];
    } else if (battery > 20 && battery < 60) {
        return ["warning", "/tractor-warning.svg"];
    } else {
        return ["danger", "/tractor-err.svg"];
    }
}
function getTractorStatus(item) {
    const status = item.data[0].sensorData[1].value[4];
    if (status > 0) {
        return "/warning-danger.png";
    }
    else {
        return "warning-success.png";
    }
}

export default MapContainer;
