import React from 'react'
import usePositionData from 'Dashboard/fakedata'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from '@react-google-maps/api'
import { CallMissedOutgoingRounded } from '@material-ui/icons'
import { connectSocket, disconnectSocket } from '../socket'
const containerStyle = {
  width: '100%',
  height: '100%',
}
//const markerIconUrl = 'D:\\5\\39566.jpg'
const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
}
interface LatLngLiteral {
  lat: number;
  lng: number;
}
let newPolygon2 : any
let newPolygon3 :any

const GoogleMapsComponent: React.FC=() => {
  const positions = usePositionData();
  const [socket, setSocket] = useState<any>(null);
  const [positionArray, setPositionArray] = useState<any[]>([]);
  const [plansArray, setplansArray] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState(center);
  const [showMarker, setShowMarker] = useState(false);
  const [roll, setRoll] = useState(0);
  const [polygonLine, setPolygonLine] = useState<LatLngLiteral[]>([])
  
  const [polygonElements, setPolygonElements] = useState<JSX.Element[]>([]);
  useEffect(() => {
   
    const token = localStorage.getItem('accessToken') || '';
    const newSocket = connectSocket(token, (data:any) => {
      // Process the received data
      // Update the state based on the received data
     // console.log(data)
      const  x = data
     // console.log(x.ypr[0])
    const newRoll = x.ypr[0]
      setRoll(newRoll)
      if (x.llh) {
        const newPosition = {
          lat: x.llh[0],
          lng: x.llh[1],
        };
        
        setPositionArray(prevArray => [...prevArray, newPosition]);
       // console.log(positionArray)
      }

      const plans = [];
      for (let i = 0; i < x.plans.length; i += 2) {
        plans.push({
          lat: x.plans[i],
          lng: x.plans[i + 1],
        });
      }
      setplansArray(plans)
    });

    setSocket(newSocket);
 
    return () => {
      disconnectSocket(newSocket);
    };
   
  }, []);

 











  const latestPosition = positionArray[positionArray.length - 1];
  

  useEffect(() => {
    if (showMarker) {
      setMapCenter(latestPosition);
    }
  }, [showMarker, latestPosition]);
  
  
  useEffect(()=>{ 
    if (positionArray.length > 0) {
    var polygon_line = [];
    
    for (let i = 0; i < positionArray.length; i++) {
      const ax = positionArray[i].lng; // Replace with your old longitude value
      const ay = positionArray[i].lat; // Replace with your old latitude value
      const head = roll;
     // console.log(roll)
      const W = 0.000007;

      const newLat = ay + W * Math.sin(head + Math.PI / 2);
      const newLng = ax + W * Math.cos(head + Math.PI / 2);
      const newLat1 = ay + W * Math.sin(head - Math.PI / 2);
      const newLng1 = ax + W * Math.cos(head - Math.PI / 2);
      const newPolygon1: LatLngLiteral = {
        lat: newLat,
        lng: newLng,
      };
      const newPolygon4: LatLngLiteral = {
        lat: newLat1,
        lng: newLng1,
      };
      polygon_line=[]
      if (newPolygon2 != null) {
        polygon_line.push(newPolygon2, newPolygon1, newPolygon4, newPolygon3);
      }
      newPolygon2 = newPolygon1;
      newPolygon3 = newPolygon4;
      
    }

  
    setPolygonLine(polygon_line);
    const newPolygonElement = (
      <Polygon
       // key={polygonElements.length} // Give each polygon element a unique key
        paths={polygon_line}
        options={{
          fillColor: 'green',
          strokeColor: 'transparent',
          strokeOpacity: 0.2,
        }}
      />
    );

    //setPolygonElements([newPolygonElement]);

    setPolygonElements(prevPolygonElements => [...prevPolygonElements, newPolygonElement]);
  }},[positionArray, roll])
  //console.log(mapCenter)
  //console.log(positionArray)
  return (
    <LoadScript googleMapsApiKey="AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM">
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={20}>
        <Polyline
          path={positionArray}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
        <Polyline
          path={plansArray}
          options={{
            strokeColor: 'blue',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
       
       
        
   

    {polygonElements}
        <Marker position={latestPosition}  
            />
          <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000, // Higher value to bring the checkbox to the front
          }}
        >
          <label>
            Auto Center
            <input
              type="checkbox"
              checked={showMarker}
              onChange={() => {
                setShowMarker(!showMarker);
               
              }}
            />
          </label>
        </div>
      </GoogleMap>
    </LoadScript>
  );
};
export default GoogleMapsComponent
/*
ver	:	1
id		[3]
0	:	64e2241bf3ea921e3f7855bb
1	:	gt435345
2	:	235643gret
drive		[5]
0	:	36
1	:	2
2	:	0
3	:	65
4	:	26
time		[7]
0	:	22
1	:	8
2	:	2023
3	:	14
4	:	42
5	:	54.672
6	:	7
sum		[6]
0	:	1958
1	:	42
2	:	979
3	:	21
4	:	9.79
5	:	0.21
llh		[3]
0	:	20.006601247
1	:	106.004524676
2	:	106.5559
xyz		[3]
0	:	48605078.30243249
1	:	2212526.969306958
2	:	100.3396
ypr		[3]
0	:	289.65
1	:	10.85
2	:	1.3
rtk		[4]
0	:	3
1	:	24
2	:	16
3	:	2
sen		[13]
0	:	84
1	:	98.6
2	:	300.824
3	:	300.719
4	:	100.322
5	:	100.043
6	:	29
7	:	29
8	:	28
9	:	0
10	:	0
11	:	0
12	:	0
ctr_fed		[18]
0	:	0
1	:	0
2	:	1231
3	:	380
4	:	0
5	:	0
6	:	-2
7	:	-2
8	:	2
9	:	2
10	:	14
11	:	14
12	:	0
13	:	0
14	:	0
15	:	0
16	:	0
17	:	0
ctr_oly		[8]
0	:	1
1	:	0
2	:	0
3	:	0
4	:	1
5	:	90
6	:	90
7	:	90
plans		[12]
0	:	20.006601247
1	:	106.004524676
2	:	20.006623893
3	:	106.004480098
4	:	20.006655307
5	:	106.004441198
6	:	20.006681077
7	:	106.004398351
8	:	20.006705899
9	:	106.004354947
10	:	20.006723437
11	:	106.004308124
err		[7]
0	:	0
1	:	1
2	:	123
3	:	213
4	:	122
5	:	475
6	:	45747
*/