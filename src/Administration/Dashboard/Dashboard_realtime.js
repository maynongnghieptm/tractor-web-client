import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon, InfoWindow } from '@react-google-maps/api';
import { ProgressBar } from 'react-bootstrap';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Popover, Hidden, List, ListItem, ListItemText, Drawer } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SelectedTractorDetails from './Tractor_details';
import Barometer from './Tab';
import axios from '../../_config/AxiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./rp.css"
import './style.css'
import "./mobile.css"
import { useHistory, Link } from 'react-router-dom'
const mapStyles = {
    height: '100%',
    width: '100%',
};
//console.log(data)
const MapContainer1 = ({ data }) => {
    //console.log(data)
    const [selectedTab, setSelectedTab] = useState('all');
    const initialShowPasswordStates = {};
    const initialShowNotiStates = {}
    const initialShowMobileDetail = {}
    const initialCommand = {}
    const history = useHistory()
    let icon
    data.forEach((item) => {
        initialShowPasswordStates[item.tractorId] = false;
        initialShowNotiStates[item.tractorId] = true;
        initialShowMobileDetail[item.tractorId] = false
        if (item.data.drive[2] === 0) {
            initialCommand[item.tractorId] = 'stop';
        } else {
            initialCommand[item.tractorId] = 'continue'; // Giá trị mặc định nếu item.data.drive[2] không phải là 0
        }

    });
    //console.log(initialCommand)
    const [showPasswordStates, setShowPasswordStates] = useState(initialShowPasswordStates);
    const [notification, setNotification] = useState(initialShowNotiStates)
    const [selectedTractorId, setSelectedTractorId] = useState([]);
    const [totalTractorsCount, setTotalTractorsCount] = useState(0);
    const [runningTractorsCount, setRunningTractorsCount] = useState(0);
    const [standingTractorsCount, setStandingTractorsCount] = useState(0);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: 21.0679319912789, lng: 106.55866745996374 });
    const [tabMobile, setTabMobile] = useState(false)
    const [showMobileDetail, setShowMobileDetail] = useState(initialShowMobileDetail);
    const [currentCommand, setCurrentCommand] = useState(initialCommand);

    //console.log(currentCommand)
    useEffect(() => {
        const runningTractors = data.filter((item) => item.data.drive[2] === 0).length;
        const standingTractors = data.filter((item) => item.data.drive[2] === 1).length;
        setTotalTractorsCount(data.length)
        setRunningTractorsCount(runningTractors)
        setStandingTractorsCount(standingTractors)
    }, [data.length])
    const removeTractor = (tractorIdToRemove) => {
        setSelectedTractorId((prevIds) =>
            prevIds.filter((id) => id !== tractorIdToRemove)
        );
    };

    //  console.log(selectedTractorId)
    //console.log(showPasswordStates)

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleMobileTabClick = (event, newValue) => {
        setSelectedTab(newValue);
    };
    useEffect(() => {
        console.log(selectedTab)
    }, [selectedTab])
    const handleOpenMobileTab = () => {
        setTabMobile(!tabMobile)
    }
    useEffect(() => {
        const results = data.filter((item) => {
            return item.tractorId.toLowerCase().includes(searchInput.toLowerCase());
        });
        setSearchResults(results);
        //console.log(searchResults)
    }, [data, searchInput]);

    const updateShowPasswordState = (tractorId, newValue) => {
        setShowPasswordStates((prevState) => ({
            ...prevState,
            [tractorId]: newValue,
        }));
    };


    const polygonColors = ['#FF0000', '#00FF00']; // Thay đổi màu tại đây
    const filteredPolygons = data.filter((item) => {
        if (selectedTab === 'all') {
            return true; // Hiển thị tất cả dữ liệu
        } else if (selectedTab === 'standing' && item.data.drive[2] === 1) {
            // Lọc dữ liệu chỉ khi tab là "Standing" và isRunning là "0"
            return true;
        } else if (selectedTab === 'running' && item.data.drive[2] === 0) {
            // Lọc dữ liệu chỉ khi tab là "Running" và isRunning là "1"
            return true;
        }
        return false;
    });
    const filteredSearchResults = searchResults.filter((item) => {
        if (selectedTab === 'all') {
            return true; // Hiển thị tất cả dữ liệu tìm kiếm
        } else if (selectedTab === 'standing' && item.data.drive[2] === 1) {
            // Lọc dữ liệu chỉ khi tab là "Standing" và isRunning là "0"
            return true;
        } else if (selectedTab === 'running' && item.data.drive[2] === 0) {
            // Lọc dữ liệu chỉ khi tab là "Running" và isRunning là "1"
            return true;
        }
        return false;
    });
    const removeDuplicates = (arr, prop) => {
        return arr.filter((obj, index, self) =>
            index === self.findIndex((el) => el[prop] === obj[prop])
        );
    }
    const combinedResults = [...filteredSearchResults, ...filteredPolygons];
    const combinedResultsWithoutDuplicates = removeDuplicates(combinedResults, 'tractorId');
    const sortedResults = combinedResultsWithoutDuplicates.slice().sort((a, b) => {
        const tractorIdA = a.tractorId.toLowerCase();
        const tractorIdB = b.tractorId.toLowerCase();

        if (tractorIdA < tractorIdB) {
            return -1;
        } else if (tractorIdA > tractorIdB) {
            return 1;
        } else {
            return 0;
        }
    });
    //console.log(sortedResults)
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
    const toggleNoti = (tractorId) => {
        setNotification((prevState) => ({
            ...prevState,
            [tractorId]: !prevState[tractorId],
        }));
    }
    const handleMobileCommand = (tractorId) => {
        setShowMobileDetail((prevState) => ({
            ...prevState,
            [tractorId]: !prevState[tractorId],
        }));
    };
    const handelSendComand = (comand, tractorId) => {
        const datacommand = {
            command: {
                tractorId: tractorId,
                command: comand
            }
        }
        axios.post('/commands', datacommand)
            .then(response => {
                console.log('Tractor created successfully:', response.data);
                //setNewTractorname= ''

            })
            .catch(error => {
                console.error('Error creating tractor:', error);
            });
        setCurrentCommand((prevState) => ({
            ...prevState,
            [tractorId]: comand,
        }));
    }
     const handleOpenChart = (tractorId)=>{

        
    }
    return (

        <div style={{ width: '100%', height: '100%' }} >
            <LoadScript
                googleMapsApiKey="AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM"
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={mapCenter}
                    zoom={10}
                >
                    {
                        sortedResults.map((item, index) => {
                            // console.log(customIcon)
                            const isRunning = item.data.drive[2];
                            if (window) {
                                icon = {
                                    key: index,
                                    url: '/tractor.png',
                                    scaledSize: new window.google.maps.Size(40, 40),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(20, 20),
                                }
                            }

                            const color = isRunning === 1 ? 'green' : 'orange';
                            const plans = [];

                            // Select the img element with the correct src attribute
                            const imgElements = document.querySelectorAll('img[src="/tractor.png"]');
                            const rotation = imgElements[index]; // Use the current index to select the correct img

                            if (rotation) {
                                rotation.style.transform = 'rotate(' + item.data.ypr[0] + 'deg)';
                            }
                            const newPos = {
                                lat: item.data.llh[0],
                                lng: item.data.llh[1]
                            };

                            /*
                            for (let i = 0; i < item.data[1].fieldCoordinates.length; i += 2) {
                                plans.push({
                                    lat: item.data[1].fieldCoordinates[i],
                                    lng: item.data[1].fieldCoordinates[i + 1],
                                });
                            }
                            */
                            const isMarkerSelected = selectedMarker.some((marker) => marker.tractorId === item.tractorId);
                            return (
                                <>
                                    {/*
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
                                 */}

                                    <Marker
                                        key={item.tractorId}
                                        position={newPos}
                                        icon={icon}
                                        onClick={() => {
                                            setMapCenter(newPos);
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
                                                <p>Working Status: {item.data.sum[0]}%</p>
                                                <p>Feul: {item.data.sen[1]}</p>
                                                <p>Speed: {item.data.ctr_fed[15]}</p>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </>
                            );
                        })}
                </GoogleMap>
            </LoadScript>
            <Hidden mdDown>
                <div className='tab-tractor'>
                    <div className='search-box'>
                        <input type='text' onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by tractorId"></input>
                        <button className='btn-search' >Search</button>
                    </div>
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
                            <ul style={{ padding: "0" }} className='list'>
                                {sortedResults.map((item, index) => (
                                    <li key={index} className='tractor-item'>
                                        <div className='tractor-item-child'>
                                            <img
                                                onClick={() => toggleShowPassword(item.tractorId)}
                                                src={showPasswordStates[item.tractorId] ? '/open.png' : '/close.png'}
                                                alt="Logo"
                                                className="logo-img"
                                            />
                                        </div>
                                        <div className='tractor-item-child'>
                                            <img
                                                onClick={() => toggleNoti(item.tractorId)}
                                                src={notification[item.tractorId] ? '/noti-false.png' : '/noti_true.png'}
                                                alt="Logo" className="logo-img"
                                            />
                                        </div>
                                        <div className='tractor-item-child'>
                                            <img
                                                src={getTractorBattery(item)[1]} alt="Logo" className="logo-img"
                                            />
                                        </div>
                                        <div className='tractor-item-child' style={{ maxWidth: '60px', minWidth: "60px" }}>
                                            {item.tractorName.length > 9 ? `${item.tractorName.substring(0, 8)}...` : item.tractorName}
                                        </div>
                                        <div className='tractor-item-child'>
                                            <div className='sensor-value'>{parseInt(item.data.sen[0])}%</div>
                                            <div className='same-height'>
                                                <ProgressBar striped variant={getTractorProgress(item)} now={item.data.sen[0]} style={{ width: '40px', height: '10px' }} />
                                            </div>
                                        </div>
                                        <div className="speedometer tractor-item-child" style={{ display: 'flex', justifyContent: 'center', width: '60px', height: '60px' }}>
                                            <Barometer id="dial1" value={item.data.ctr_fed[15]} tick={5} min={0} max={60} danger={50} to={60} height={60} />
                                        </div>
                                        <div className='tractor-item-child'>
                                            <div className='sensor-value'>{parseInt(item.data.sen[1])}%</div>
                                            <div className='same-height'>
                                                <ProgressBar variant={getTractorBattery(item)[0]} now={item.data.sen[1]} style={{ width: '40px', height: '10px' }} />
                                            </div>
                                        </div>
                                        <div className='tractor-item-child'>
                                            {
                                                notification[item.tractorId] ?
                                                    (
                                                        <>
                                                            <div className='sensor-value'></div>
                                                            <div className='same-height'>
                                                                <img src={'/warning_off.png'} alt="Logo" className="logo-img"></img>
                                                            </div>
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className='sensor-value'>{item.data.err.length}</div>
                                                            <div className='same-height'>
                                                                <img src={getTractorStatus(item)} alt="Logo" className="logo-img"></img>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className=' mobile-item-child'>
                                            {showMobileDetail[item.tractorId] ?
                                                (<ExpandMoreIcon style={{ color: 'white' }}
                                                    onClick={() => handleMobileCommand(item.tractorId)}
                                                />) : (
                                                    <ExpandLessIcon style={{ color: 'white' }}
                                                        onClick={() => handleMobileCommand(item.tractorId)}
                                                    />
                                                )

                                            }

                                        </div>
                                        {showMobileDetail[item.tractorId] && (
                                            <div className='mobile-command'>
                                                <div
                                                    className={`mobile-command-item  ${currentCommand[item.tractorId] === 'stop' ? 'stop' : ''}`}
                                                    onClick={() => handelSendComand('stop', item.tractorId)}
                                                >
                                                    Stop
                                                </div>
                                                <div
                                                    className={`mobile-command-item  ${currentCommand[item.tractorId] === 'continue' ? 'continue' : ''}`}
                                                    onClick={() => handelSendComand('continue', item.tractorId)}
                                                >
                                                    Continue
                                                </div>
                                                <div
                                                    className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                    onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                >
                                                    Power off
                                                </div>
                                                <div
                                                    className={`mobile-command-item detail ${currentCommand[item.tractorId] === 'openchart' ? 'openchart' : ''}`}
                                                    onClick={() => handelSendComand('openchart', item.tractorId)}
                                                >
                                                     <Link to={`/dashboard/${item.tractorId}`} target="_blank">
              Open Chart
            </Link>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {selectedTractorId.map((tractorId, index) => (
                    <SelectedTractorDetails data={data} key={index} tractorId={tractorId} onRemove={removeTractor} showPasswordState={showPasswordStates[tractorId]} updateShowPasswordState={updateShowPasswordState} />
                ))}
            </Hidden>
            <Hidden mdUp>
                <div className='mobile-tab-tractor'>
                    <div onClick={handleOpenMobileTab}>
                        {tabMobile ? <ExpandMoreIcon style={{ color: 'white', fontSize: '3rem' }} /> : <ExpandLessIcon style={{ color: 'white', fontSize: '3rem' }} />}

                    </div>
                    <div className='mobile-list-tractor' style={{ display: tabMobile ? 'block' : 'none' }}>
                        <div className='tab-list'>
                            <div
                                className={`mobile-tab-item tab-all ${selectedTab === 'all' ? 'choose' : ''}`}
                                onClick={() => handleTabClick('all')}
                            >
                                All
                                <div>{totalTractorsCount}</div>
                            </div>
                            <div
                                className={`mobile-tab-item tab-standing ${selectedTab === 'standing' ? 'choose' : ''}`}
                                onClick={() => handleTabClick('standing')}
                            >
                                Standing
                                <div>{standingTractorsCount}</div>
                            </div>
                            <div
                                className={`mobile-tab-item tab-running ${selectedTab === 'running' ? 'choose' : ''}`}
                                onClick={() => handleTabClick('running')}
                            >
                                Running
                                <div>{runningTractorsCount}</div>
                            </div>
                        </div>
                        <div className='mobile-list' style={{ minHeight: '300px', maxHeight: '300px', overflowY: 'auto' }}>
                            <>
                                <ul style={{ padding: "0", width: '100%' }} >
                                    {sortedResults.map((item, index) => (
                                        <li key={index} className='mobile-tractor-item' >
                                            <div className='tractor-item-child mobile-item-child'>
                                                <img
                                                    src={getTractorBattery(item)[1]} alt="Logo" className="logo-img"
                                                />
                                            </div>
                                            <div className=' mobile-item-child tractorname' onClick={() => { setMapCenter({ lat: item.data.llh[0], lng: item.data.llh[1] }) }}>
                                                {item.tractorName.length > 9 ? `${item.tractorName.substring(0, 8)}...` : item.tractorName}
                                            </div>
                                            <div className=' mobile-item-child'>

                                                <div className='same-height'>
                                                    <ProgressBar striped variant={getTractorProgress(item)} now={item.data.sen[0]} style={{ width: '40px', height: '10px' }} />
                                                </div>
                                            </div>
                                            <div className="speedometer mobile-item-child" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Barometer id="dial1" value={item.data.ctr_fed[15]} tick={5} min={0} max={60} danger={50} to={60} height={50} />
                                            </div>
                                            <div className='mobile-item-child'>
                                                <div className='same-height'>
                                                    <ProgressBar variant={getTractorBattery(item)[0]} now={item.data.sen[1]} style={{ width: '40px', height: '10px' }} />
                                                </div>
                                            </div>
                                            <div className=' mobile-item-child'>



                                                <div className='same-height'>
                                                    <img src={getTractorStatus(item)} alt="Logo" className="logo-img"></img>
                                                </div>



                                            </div>
                                            <div className=' mobile-item-child'>
                                                {showMobileDetail[item.tractorId] ?
                                                    (<ExpandMoreIcon style={{ color: 'white' }}
                                                        onClick={() => handleMobileCommand(item.tractorId)}
                                                    />) : (
                                                        <ExpandLessIcon style={{ color: 'white' }}
                                                            onClick={() => handleMobileCommand(item.tractorId)}
                                                        />
                                                    )

                                                }

                                            </div>
                                            {showMobileDetail[item.tractorId] && (
                                                <div className='mobile-command'>
                                                    <div
                                                        className={`mobile-command-item  ${currentCommand[item.tractorId] === 'stop' ? 'stop' : ''}`}
                                                        onClick={() => handelSendComand('stop', item.tractorId)}
                                                    >
                                                        Stop
                                                    </div>
                                                    <div
                                                        className={`mobile-command-item  ${currentCommand[item.tractorId] === 'continue' ? 'continue' : ''}`}
                                                        onClick={() => handelSendComand('continue', item.tractorId)}
                                                    >
                                                        Continue
                                                    </div>
                                                    <div
                                                        className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                        onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                    >
                                                        Power off
                                                    </div>
                                                </div>
                                            )}

                                        </li>
                                    ))}
                                </ul>
                            </>
                        </div>

                    </div>


                </div>

            </Hidden>


        </div>

    );
};

function getTractorProgress(item) {
    const battery = item.data.sen[0];
    if (battery >= 60) {
        return "success";
    } else if (battery > 20 && battery < 60) {
        return "warning";
    } else {
        return "danger";
    }
}

function getTractorBattery(item) {
    const battery = (item.data.sen[1]);
    if (battery >= 60) {
        return ["success", "/tractor-icon.svg"];
    } else if (battery > 20 && battery < 60) {
        return ["warning", "/tractor-warning.svg"];
    } else {
        return ["danger", "/tractor-err.svg"];
    }
}
function getTractorStatus(item) {
    const status = item.data.err.length;
    if (status > 0) {
        return "/warning-danger.png";
    }
    else {
        return "/warning-success.png";
    }
}

export default MapContainer1;
