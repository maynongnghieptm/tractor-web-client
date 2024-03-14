import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polygon, Polyline } from '@react-google-maps/api';
import mqtt from "mqtt";
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
import { io } from 'socket.io-client';
import ControlTractor from './mqtt';
const mapStyles = {
    height: '100%',
    width: '100%',
};
//console.log(data)
const MapContainer1 = ({data}) => {
     //console.log(data.length)
     //const [data, setData] = useState([])
   
    const [selectedTab, setSelectedTab] = useState('all');
    const initialShowPasswordStates = {};
    const initialShowNotiStates = {}
    const initialShowMobileDetail = {}
    const initialMode_Tractor = {}
    const initialCommand = {}
    const initialTractorState = {}
    let icon
    const [itemStates, setItemStates] = useState([]);
    const token = localStorage.getItem('accessToken')
    /**  useEffect(() => {
        const socket = io('http://tractorserver.myddns.me:3001',  {
          extraHeaders: {
           // tractorid: '64e2241bf3ea921e3f7855bb',
            token: token,
          }
        });
    
        socket.on('logs', (newData) => {
          
        // console.log(newData)
         
        //  setData(newData);
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);*/
   
    useEffect(() => {
        const updatedItemStates = data.reduce((acc, item) => {
          const existingStateIndex = itemStates.findIndex(state => state.id === item.id);
    
          if (existingStateIndex === -1) {
            acc.push({
              id: item.tractorId,
              value: {
                Mode: 0,
                So_cang: 0,
                Max_rpm: 0,
                Min_rpm: 0,
                Tam_de: 0,
                Chinh_nghieng: 0,
                Led: 0,
                So_phu_max: 0,
                Reset_Err: 0,
              },
            });
          } else {
            acc.push(itemStates[existingStateIndex]);
          }
    
          return acc;
        }, []);
    
        
        setItemStates(updatedItemStates);
      }, [data.length]);

      const updateValueFieldById = (tractorId, fieldInValue, newValue) => {
        const updatedItemStates = itemStates.map(item => {
          if (item.id === tractorId) {
            return {
              ...item,
              value: {
                ...item.value,
                [fieldInValue]: newValue,
              },
            };
          }
          return item;
        });
        setItemStates(updatedItemStates);
      };
        data.forEach((item) => {
            // initialTractorState
             initialShowPasswordStates[item.tractorId] = false;
             initialShowNotiStates[item.tractorId] = true;
             initialShowMobileDetail[item.tractorId] = false
            
             //Tractor_control.push(initialTractorState)
             //console.log(initialTractorState)
             if (item.data.drive[2] === 0) {
                 initialCommand[item.tractorId] = 'stop';
             } else {
                 initialCommand[item.tractorId] = 'continue';
             }
         });
    
   
    const [TractorState, setTractorState] = useState(initialTractorState);
    //console.log(initialCommand)
    const [showPasswordStates, setShowPasswordStates] = useState(initialShowPasswordStates);
    const [notification, setNotification] = useState(initialShowNotiStates);
    const [selectedTractorId, setSelectedTractorId] = useState([]);
    const [totalTractorsCount, setTotalTractorsCount] = useState(0);
    const [runningTractorsCount, setRunningTractorsCount] = useState(0);
    const [standingTractorsCount, setStandingTractorsCount] = useState(0);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [mapCenter1, setMapCenter1] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [tabMobile, setTabMobile] = useState(false);
    const [showMobileDetail, setShowMobileDetail] = useState(initialShowMobileDetail);
    const [currentCommand, setCurrentCommand] = useState(initialCommand);
    const [fieldEnable, setFieldEnable] = useState(true);
    const [fieldCoordinate, setFieldCoordinate] = useState([]);
    const [switchMap, setSwitchMap] = useState(false);
    const [map, setMap] = useState(null);
    const [map1, setMap1] = useState(null);
    const [zoom1, setZoom1] = useState(null);
    const [zoom, setZoom] = useState(null);
    const mapRef = useRef();
    const [client, setClient] = useState(null);
    const [mode_control, setMode_control] = useState(initialMode_Tractor);
    const [socket1,setSocket1] = useState({})
    const [newState1, setNewState1] = useState([])
    const [idOnchangeing, setIdOnchangeing] = useState("")
    const [idOnchange, setIdOnchange] = useState(null)
    const [isUserInput, setIsUserInput] = useState(true)
    const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    const host = 'ws://broker.hivemq.com:8000/mqtt'
    const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        },
    }

    useEffect(() => {
        let client1 = mqtt.connect(host, options);
        console.log(client1);
        setClient(client1);
    }, [])

    useEffect(() => {
        if (client) {
            console.log(client);
            client.on('connect', () => {
                // setConnectStatus( 'Connected');
                client.subscribe('ESPRTK_RESPOND_TOPIC', { qos: 1 });
                //startrefreshIFrame();
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                //setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() };
                //setPayload(payload);
            });
        }
    }, [client]);
    const handleFilterChange = ( tractorId,field,newValue) => {
        //setMode_control();
       // setIsInputEvent(false);
        setIdOnchange(tractorId)
        updateValueFieldById(tractorId, field, newValue);



    };
 


 const handleInputMode = (value,id, field) => {
      //  setIsInputEvent(false);
        const item = getItemById(itemStates, id)
        console.log(item)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' + item.value.Reset_Err
        + '" ,"min_rpm_c":"' + item.value.Min_rpm
        + '" ,"max_rpm_c":"' + item.value.Max_rpm 
        + '" ,"mode_run_c":"' +value
        + '" ,"so_cang_max":"' +item.value.So_cang 
        + '" ,"tam_de":"' + item.value.Tam_de 
        + '" ,"nghieng":"' + item.value.Chinh_nghieng 
        + '" ,"led1":"' + item.value.Led
        + '" ,"phumax":"' +item.value.So_phu_max
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //console.log(e.target.value);
        //setIsInputEvent(false);
    };
    const handleInputMax_rpm = (value,id,field) => {
      //  setIsInputEvent(false);
        //setMax_rpm(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
       // console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' + value 
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' + item.value.So_cang 
        + '" ,"tam_de":"' +  item.value.Tam_de 
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' + item.value.So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputMin_rpm = (value,id, field) => {
      //  setIsInputEvent(false);
       // setMin_rpm(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' + value
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang 
        + '" ,"tam_de":"' +  item.value.Tam_de 
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' +  item.value.So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputSo_cang = (value,id, field) => {
      //  setIsInputEvent(false);
        //setSo_cang(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field,value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' + value
        + '" ,"tam_de":"' +  item.value.Tam_de 
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' +  item.value.So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputTam_de = (value,id, field) => {
      //  setIsInputEvent(false);
       // setTam_de(e.target.value);
      //  console.log(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang
        + '" ,"tam_de":"' + value 
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' +  item.value.So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputDen = (value,id, field) => {
        //setIsInputEvent(false);
        //setLed(e.target.value);

      //  console.log(value.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang
        + '" ,"tam_de":"' +  item.value.Tam_de
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' + value 
        + '" ,"phumax":"' +  item.value.So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputSophu = (value,id, field) => {
       // setIsInputEvent(false);
        //setSo_phu_max(e.target.value);
        //console.log(value.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang
        + '" ,"tam_de":"' +  item.value.Tam_de
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' + value 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputReset_Err = (value,id, field) => {
        //setIsInputEvent(false);
        //setReset_Err(e.target.value);
      //  console.log(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' + value
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang
        + '" ,"tam_de":"' +  item.value.Tam_de
        + '" ,"nghieng":"' +  item.value.Chinh_nghieng 
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' +  item.value.So_phu_max
        + '"  }}'
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };
    const handleInputNghieng = (value,id, field) => {
       // setIsInputEvent(false);
        //setChinh_nghieng(e.target.value);
      //  console.log(e.target.value);
        const item = getItemById(itemStates, id)
        updateValueFieldById(id, field, value);
        let string = '{"data":{   "reset_er_c":"' +  item.value.Reset_Err
        + '" ,"min_rpm_c":"' +  item.value.Min_rpm
        + '" ,"max_rpm_c":"' +  item.value.Max_rpm
        + '" ,"mode_run_c":"' +  item.value.Mode
        + '" ,"so_cang_max":"' +  item.value.So_cang
        + '" ,"tam_de":"' +  item.value.Tam_de
        + '" ,"nghieng":"' + value
        + '" ,"led1":"' +  item.value.Led 
        + '" ,"phumax":"' +  item.value.So_phu_max
        + '"  }}'
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor`, data);
        //setIsInputEvent(false);
    };

    useEffect(() => {
        const socket = io('http://tractorserver.myddns.me:3001', {
          extraHeaders: {
            // tractorid: '64e2241bf3ea921e3f7855bb',
            token: token,
          },
        });
        setSocket1(socket)
        socket.on('sate-tractor-all',(state)=>{
           
            const tractorId = state.tractorId
            const newState_log = JSON.parse(state.state)
            console.log(newState_log.data)
            const state1 = newState_log.data
            const newState = {
                Mode: parseInt(state1.mode_run_c) ,
                So_cang: parseInt(state1.so_cang_max) ,
                Max_rpm: parseInt( state1.max_rpm_c),
                Min_rpm:parseInt(state1.min_rpm_c) ,
                Tam_de: parseInt(state1.tam_de),
                Chinh_nghieng: parseInt(state1.nghieng),
                Led: parseInt(state1.led1),
                So_phu_max:parseInt(state1.phumax) ,
                Reset_Err: parseInt(state1.reset_er_c),
            }
            setNewState1(newState)
            setIdOnchangeing(tractorId)
           
          // updateAllValuesById(tractorId, newState);
        })
       // console.log(`${id}`)
       
        
      }, []);

      useEffect(()=>{
        //console.log(newState)
        console.log(itemStates)
        if(itemStates.length!=0){
                 const updatedItemStates = itemStates.map(item => {
            if (item.id === idOnchangeing) {
              // Cập nhật vị trí của phần tử có id bằng tractorId
              return {
                ...item,
                // Cập nhật thông tin vị trí tại đây (ví dụ: item.position = newPosition)
                value: newState1,
              };
            }
            // Giữ nguyên các phần tử khác
            return item;
          });
         setItemStates(updatedItemStates)
        }
      }, [newState1])
      {/**
    
         useEffect(() => {
        //console.log(TractorState)
       
              // Sử dụng childObject ở đây
           if(isUserInput){
            const stateOftractor = itemStates.find(item=>item.id===idOnchange)
            console.log(stateOftractor)
          if (stateOftractor&&client) {
            let string = '{"data":{   "reset_er_c":"' + stateOftractor?.value.Reset_Err
            + '" ,"min_rpm_c":"' + stateOftractor?.value.Min_rpm
            + '" ,"max_rpm_c":"' + stateOftractor?.value.Max_rpm 
            + '" ,"mode_run_c":"' + stateOftractor?.value.Mode
            + '" ,"so_cang_max":"' + stateOftractor?.value.So_cang 
            + '" ,"tam_de":"' + stateOftractor?.value.Tam_de 
            + '" ,"nghieng":"' + stateOftractor?.value.Chinh_nghieng 
            + '" ,"led1":"' + stateOftractor?.value.Led 
            + '" ,"phumax":"' + stateOftractor?.value.So_phu_max 
            + '"  }}'
            //console.log(string)
            //console.log( string);
            client.publish(`testtopic111111_789_7878`,string , { qos: 0, retain: false })
            const data = {
                tractorId: stateOftractor.id,
                state: string
            }
            socket1.emit(`sate-tractor`, data);
           
        }
           }
              
    }, [itemStates, client]);


    */}
  
    
    //console.log(currentCommand)
    const polyline_path = []
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
      //  console.log([mapCenter1.lat, mapCenter1.lng])
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
            //console.log([calculateCentroid(coor).lat, calculateCentroid(coor).lng])
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
                          //  console.log(polyline_path)
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
                                                            // onClick={() => handelSendComand('stop', item.tractorId)}
                                                            >
                                                                <span>Mode</span>
                                                                <select value={getItemById(itemStates,item.tractorId)?.value.Mode} onInput={(e)=>handleInputMode(e.target.value, item.tractorId, "Mode")}>
                                                                    <option value="1">Pause</option>
                                                                    <option value="2">Continue</option>
                                                                </select>
                                                            </div>
                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'continue' ? 'continue' : ''}`}
                                                            //  onClick={() => handelSendComand('continue', item.tractorId)}
                                                            >
                                                                <span>Max rpm</span>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={2700}
                                                                    step={100}
                                                                    value={getItemById(itemStates,item.tractorId).value.Max_rpm}
                                                                    onInput={(e) => {
                                                                        handleInputMax_rpm(e.target.value, item.tractorId, "Max_rpm")
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Min rpm</span>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={2700}
                                                                    step={100}
                                                                    value={getItemById(itemStates,item.tractorId).value.Min_rpm}
                                                                    onInput={(e) => {
                                                                        handleInputMin_rpm(e.target.value, item.tractorId, "Min_rpm")
                                                                    }}
                                                                />
                                                            </div>

                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Số càng</span>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={49}
                                                                    step={1}
                                                                    value={getItemById(itemStates,item.tractorId).value.So_cang}
                                                                    onInput={(e) => {
                                                                        handleInputSo_cang(e.target.value, item.tractorId, "So_cang")
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Tấm dè</span>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={49}
                                                                    step={1}
                                                                    value={getItemById(itemStates,item.tractorId).value.Tam_de}
                                                                    onInput={(e) => {
                                                                        handleInputTam_de(e.target.value, item.tractorId, "Tam_de")
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Đèn</span>
                                                                <select value={getItemById(itemStates,item.tractorId).value.Led} onInput={(e)=> handleInputDen(e.target.value, item.tractorId, "Led")}>

                                                                    <option value="0">Off</option>
                                                                    <option value="1">On</option>
                                                                </select>
                                                            </div>


                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Số phụ</span>
                                                                <select value={getItemById(itemStates,item.tractorId).value.So_phu_max} onInput={(e)=>handleInputSophu(e.target.value,item.tractorId,"So_phu_max")}>
                                                                    <option value="0">NO</option>
                                                                    <option value="1">Normal</option>
                                                                    <option value="2">Fast</option>
                                                                </select>
                                                            </div>
                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Reset ERR</span>
                                                                <select value={getItemById(itemStates,item.tractorId).value.Reset_Err} onInput={(e)=>handleInputReset_Err(e.target.value, item.tractorId, "Reset_Err")}>

                                                                    <option value="0">NO</option>
                                                                    <option value="1">RESET</option>
                                                                </select>
                                                            </div>

                                                            <div
                                                                className={`mobile-command-item  ${currentCommand[item.tractorId] === 'poweroff' ? 'power-off' : ''}`}
                                                            //onClick={() => handelSendComand('poweroff', item.tractorId)}
                                                            >
                                                                <span>Độ nghiêng</span>
                                                                <select value={getItemById(itemStates,item.tractorId).value.Chinh_nghieng} onInput={(e)=>handleInputNghieng(e.target.value, item.tractorId, "Ching_nghieng")}>
                                                                    <option value="0">NO</option>
                                                                    <option value="1">Nghiêng 1 trục</option>
                                                                    <option value="2">Nghiêng 2 trục</option>
                                                                    <option value="3">Nghiêng 3 trục</option>
                                                                </select>
                                                            </div>

                                                            <div
                                                            className={`button_command  ${currentCommand[item.tractorId] === 'stop' ? 'stop' : ''}`}
                                                            onClick={() =>  setMode_control((prevState) => ({
                                                                ...prevState,
                                                                [item.tractorId]: 0,
                                                            }))}
                                                        >
                                                            Stop
                                                        </div>
                                                            <div
                                                                className={`button_command detail ${currentCommand[item.tractorId] === 'openchart' ? 'openchart' : ''}`}
                                                                //onClick={() => handelSendComand('openchart', item.tractorId)}
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
function getItemById(arr, idToFind) {
    // Sử dụng vòng lặp để tìm item với id tương ứng
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === idToFind) {
        return arr[i];
      }
    }
  
    // Hoặc sử dụng phương thức find
    // const foundItem = acc.find(item => item.id === idToFind);
    // return foundItem;
  
    // Nếu không tìm thấy, trả về null hoặc giá trị mặc định khác
    return null;
  }

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


function isEqual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
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
