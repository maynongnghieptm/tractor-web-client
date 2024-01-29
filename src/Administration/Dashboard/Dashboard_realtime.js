import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polygon, Polyline } from '@react-google-maps/api';

import { ProgressBar } from 'react-bootstrap';
import { Hidden } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SelectedTractorDetails from './Tractor_details';
import Barometer from './Tab';
import axios from '../../_config/AxiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import "./rp.css"
import './style.css'
import "./mobile.css"
import { useHistory, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Polygon as Polygon1, MapConsumer, useMapEvents, FeatureGroup, } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const mapStyles = {
    height: '100%',
    width: '100%',
};
//console.log(data)
const MapContainer1 = ({ data }) => {
   // console.log(data)
    const history = useHistory()
    const [selectedTab, setSelectedTab] = useState('all');
    const initialShowPasswordStates = {};
    const initialShowNotiStates = {}
    const initialShowMobileDetail = {}
    const initialCommand = {}
    
    let icon
    data.forEach((item) => {
        initialShowPasswordStates[item.tractorId] = false;
        initialShowNotiStates[item.tractorId] = true;
        initialShowMobileDetail[item.tractorId] = false
        if (item.data.drive[2] === 0) {
            initialCommand[item.tractorId] = 'stop';
        } else {
            initialCommand[item.tractorId] = 'continue';
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
    const [mapCenter, setMapCenter] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [mapCenter1, setMapCenter1] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [tabMobile, setTabMobile] = useState(false)
    const [showMobileDetail, setShowMobileDetail] = useState(initialShowMobileDetail);
    const [currentCommand, setCurrentCommand] = useState(initialCommand);
    const [fieldEnable, setFieldEnable] = useState(true)
    const [fieldCoordinate, setFieldCoordinate] = useState([])
    const [switchMap, setSwitchMap] = useState(false)
    const [map, setMap] = useState(null)
    const [map1, setMap1] = useState(null)
    const [zoom1, setZoom1] = useState(null)
    const [zoom, setZoom] = useState(null)
    const mapRef = useRef();
    
    //console.log(currentCommand)
    const polyline_path =[]
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

    const filteredPolygons = data.filter((item) => {
        if (selectedTab === 'all') {
            return true;
        } else if (selectedTab === 'standing' && item.data.drive[2] === 1) {
            return true;
        } else if (selectedTab === 'running' && item.data.drive[2] === 0) {
            return true;
        }
        return false;
    });

    const filteredSearchResults = searchResults.filter((item) => {
        if (selectedTab === 'all') {
            return true;
        } else if (selectedTab === 'standing' && item.data.drive[2] === 1) {
            return true;
        } else if (selectedTab === 'running' && item.data.drive[2] === 0) {
            return true;
        }
        return false;
    });

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
        const isSelected = selectedTractorId.includes(tractorId);
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

    const handleEnableField = () => {
        setFieldEnable(!fieldEnable)
    }
    useEffect(() => {
        const getallFields = async () => {
            const allfields = await axios.get('/fields/get_all_fields')
            console.log(allfields.data.data)
            console.log(allfields.data.data)
            setFieldCoordinate(allfields.data.data)
        }
        getallFields()
    }, [])
    const handleDelete = async (id) => {
        try {
            const deleteField = await axios.delete(`/fields/delete?id=${id}`)
            console.log(deleteField)
            if (deleteField.status === 200) {
                alert("Xóa thành công!")
                window.location.reload()
            }
        } catch (error) {

        }
    }
    const handleEdit = (id) => {
        const editUrl = `/fields/edit/${id}`;
        window.open(editUrl, '_blank');
    }

    const handleSwitch = () => {
        setSwitchMap(!switchMap)
    }

    useEffect(() => {
        if (map1) {
            map1.setView([mapCenter.lat, mapCenter.lng], map1.getZoom());
        }
        console.log(mapCenter)
    }, [mapCenter])

    useEffect(() => {
        if (map1) {
            map1.on("zoomend", function () {
                setZoom1(map1.getZoom());
            });
            map1.on("dragend", function () {
                setMapCenter(map1.getCenter())
            });
        }
    }, [map1]);

    useEffect(() => {
        if (map1) {
            map1.setView([mapCenter1.lat, mapCenter1.lng], map1.getZoom());
        }
        console.log([mapCenter1.lat, mapCenter1.lng])
    }, [mapCenter1]);
    
    const handleSetCenter = (coor) => {
        setMapCenter(calculateCentroid(coor))
        //setMapCenter1(calculateCentroid(coor))
        if (map) {
            const bounds_ggmap = new window.google.maps.LatLngBounds();
            for (const coord of coor) {
                bounds_ggmap.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
            }
            map.fitBounds(bounds_ggmap);
        }
        if (map1) {
            const bounds = coor.reduce(
                (acc, coord) => acc.extend([coord.lat, coord.lng]),
                new window.L.LatLngBounds()
            );
            map1.fitBounds(bounds, { padding: [20, 20] });
            //  map1.setView([calculateCentroid(coor).lat, calculateCentroid(coor).lng], zoom)
            console.log([calculateCentroid(coor).lat, calculateCentroid(coor).lng])
        }
    }

    const onMapLoad = useCallback((map) => {
        setMap(map)
        mapRef.current = map;
    }, []);
  
    return (
        <div style={{ width: '100%', height: '100%' }} >
            {switchMap ? (
                <GoogleMap
                    onLoad={onMapLoad}
                    mapTypeId="satellite"
                    mapContainerStyle={mapStyles}
                    center={mapCenter}
                    zoom={zoom1 || 10}
                    onZoomChanged={() => {
                        if (map) {
                            setZoom(map.getZoom())
                        }
                    }}
                    onCenterChanged={() => {
                        if (map) {
                            const center = map.getCenter();
                            setMapCenter1({ lat: center.lat(), lng: center.lng() });
                        }
                    }}
                >
                    {
                        sortedResults.map((item, index) => {
                            // console.log(customIcon)
                            if (window) {
                                icon = {
                                    key: index,
                                    url: '/tractor.png',
                                    scaledSize: new window.google.maps.Size(40, 40),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(20, 20),
                                }
                            }
                            const imgElements = document.querySelectorAll('img[src="/tractor.png"]');
                            const rotation = imgElements[index];
                            if (rotation) {
                                rotation.style.transform = 'rotate(' + item.data.ypr[0] + 'deg)';
                            }
                            const newPos = {
                                lat: item.data.llh[0],
                                lng: item.data.llh[1]
                            };
                            polyline_path.push(newPos)
                            console.log(polyline_path)
                            const isMarkerSelected = selectedMarker.some((marker) => marker.tractorId === item.tractorId);
                            return (
                                <>
                                    <Marker
                                        key={item.tractorId}
                                        position={newPos}
                                        icon={icon}
                                        onClick={() => {
                                            setMapCenter(newPos);
                                            if (isMarkerSelected) {
                                                setSelectedMarker(selectedMarker.filter((marker) => marker.tractorId !== item.tractorId));
                                            } else {
                                                setSelectedMarker([...selectedMarker, item]);
                                            }
                                        }}
                                    />
                                    <Polyline
                                     path={polyline_path}
                                     strokeColor="#0000FF"
                                     strokeOpacity={0.8}
                                     strokeWeight={2}
                                    />
                                    {isMarkerSelected && (
                                        <InfoWindow
                                            position={newPos}
                                            onCloseClick={() => {
                                                setSelectedMarker(selectedMarker.filter((marker) => marker.tractorId !== item.tractorId));
                                            }}
                                        >
                                            <div>
                                                <h2>{item.tractorName}</h2>
                                                <p>Working Status: {item.data.sum[0]}%</p>
                                                <p>Feul: {item.data.sen[1]}</p>
                                                <p>Speed: {item.data.ctr_fed[15]}</p>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </>
                            );
                        })}
                    {fieldCoordinate.map((field, index) => (
                        <Polygon
                            key={field._id}
                            paths={field.coordinate}
                            options={{
                                strokeColor: field.strokeColor,
                                strokeOpacity: 1,
                                strokeWeight: field.strokeWidth,
                                fillColor: field.fillColor,
                                fillOpacity: field.fillOpacity
                            }}
                        />
                    ))}
                </GoogleMap>
            ) : (
                <MapContainer
                    className="markercluster-map"
                    center={[mapCenter1.lat, mapCenter1.lng]}
                    zoom={zoom || 10}
                    maxZoom={24}
                    style={{ height: '100%', width: '100%' }}
                    ref={setMap1}
                >
                    <TileLayer
                        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                        maxZoom={20}
                        subdomains={['mt1', 'mt2', 'mt3']}
                    />
                    {fieldCoordinate.map((field, index) => (
                        <Polygon1
                            key={field._id}
                            positions={field.coordinate}
                            pathOptions={{
                                color: field.strokeColor,
                                fillColor: field.fillColor,
                                fillOpacity: field.fillOpacity,
                                weight: field.strokeWidth,
                            }}
                        />
                    ))}
                </MapContainer>
            )
            }
            <Hidden mdDown>
                <div className='tab-tractor'>
                    <button className='btn-search' onClick={() => handleSwitch()} >Switch map</button>
                    <div className='search-box'>
                        <input type='text' onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by tractorId"></input>
                        <button className='btn-search' >Search</button>
                        <button className='btn-search' onClick={handleEnableField}>Fields List</button>
                    </div>
                    {fieldEnable ? (
                        <>
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
                                                <div className='mobile-item-child'>
                                                    {showMobileDetail[item.tractorId] ?
                                                        (
                                                            <ExpandMoreIcon style={{ color: 'white' }}
                                                                onClick={() => handleMobileCommand(item.tractorId)}
                                                            />
                                                        ) : (
                                                            <ExpandLessIcon style={{ color: 'white' }}
                                                                onClick={() => handleMobileCommand(item.tractorId)}
                                                            />
                                                        )
                                                    }
                                                </div>
                                                {
                                                showMobileDetail[item.tractorId] && (
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
                        </>
                    ) : (
                        <div className='list-tractor'>
                            <div>
                                <ul style={{ padding: "0" }} className='list'>
                                    {fieldCoordinate.map((item, index) => (
                                        <li key={index} className='tractor-item' style={{ 'height': '50px' }} >
                                            <div className='tractor-item-child' style={{ maxWidth: '60px', minWidth: "60px", "fontSize": "14px" }} onClick={() => handleSetCenter(item.coordinate)}>
                                                {item._id}
                                            </div>
                                            <div className='tractor-item-child'>
                                                <EditIcon onClick={() => handleEdit(item._id)} />
                                                <DeleteIcon onClick={() => handleDelete(item._id)} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                    }
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
                                                    (
                                                        <ExpandMoreIcon style={{ color: 'white' }}
                                                            onClick={() => handleMobileCommand(item.tractorId)}
                                                        />
                                                    ) : (
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

function calculateCentroid(polygonCoordinates) {
    if (polygonCoordinates.length === 0) {
        return null;
    }
    const sumLat = polygonCoordinates.reduce((sum, point) => sum + point.lat, 0);
    const sumLng = polygonCoordinates.reduce((sum, point) => sum + point.lng, 0);
    const centroidLat = sumLat / polygonCoordinates.length;
    const centroidLng = sumLng / polygonCoordinates.length;
    return { lat: centroidLat, lng: centroidLng };
}

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

function removeDuplicates(arr, prop) {
    return arr.filter((obj, index, self) =>
        index === self.findIndex((el) => el[prop] === obj[prop])
    );
}

export default MapContainer1;
