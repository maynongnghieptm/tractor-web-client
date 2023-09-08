import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { connect } from 'react-redux';
import { disconnectSocket } from '../socket'; // Thay thế bằng import thích hợp
import { getDataFromRedux } from '../../action'
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
};
let newPolygon2 = {}
    let newPolygon3 = {}
const GoogleMapsComponent1 = ({socketData}) => {

  
  const [positionArray, setPositionArray] = useState([]);
  const [plansArray, setPlansArray] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);
  const [showMarker, setShowMarker] = useState(false);
  const [roll, setRoll] = useState(0);
  const [polygonLine, setPolygonLine] = useState([]);

  const [polygonElements, setPolygonElements] = useState([]);

  useEffect(() => {
    
    if(socketData&&socketData.ypr) {
      
      const newRoll = socketData.ypr[0];
      setRoll(newRoll);

      if (socketData.llh) {
        const newPosition = {
          lat: socketData.llh[0],
          lng: socketData.llh[1],
        };
        
        setPositionArray(prevArray => [...prevArray, newPosition]);
      }

      const plans = [];
      for (let i = 0; i < socketData.plans.length; i += 2) {
        plans.push({
          lat: socketData.plans[i],
          lng: socketData.plans[i + 1],
        });
      }
      setPlansArray(plans);
    };

    
 
    
   
  }, [socketData]);

  const latestPosition = positionArray[positionArray.length - 1];

  useEffect(() => {
   
    if (showMarker) {
      setMapCenter(latestPosition);
    }
  }, [showMarker, latestPosition]);

  useEffect(() => {
    
    if (positionArray.length > 0) {
      let polygon_line = [];

      for (let i = 0; i < positionArray.length; i++) {
        const ax = positionArray[i].lng;
        const ay = positionArray[i].lat;
        const head = roll;
        const W = 0.000007;

        const newLat = ay + W * Math.sin(head + Math.PI / 2);
        const newLng = ax + W * Math.cos(head + Math.PI / 2);
        const newLat1 = ay + W * Math.sin(head - Math.PI / 2);
        const newLng1 = ax + W * Math.cos(head - Math.PI / 2);
        const newPolygon1 = {
          lat: newLat,
          lng: newLng,
        };
        const newPolygon4 = {
          lat: newLat1,
          lng: newLng1,
        };

        if (newPolygon2 != null) {
          polygon_line.push(newPolygon2, newPolygon1, newPolygon4, newPolygon3);
        }
        newPolygon2 = newPolygon1;
        newPolygon3 = newPolygon4;
      }

      setPolygonLine(polygon_line);

      const newPolygonElement = (
        <Polygon
          paths={polygon_line}
          options={{
            fillColor: 'green',
            strokeColor: 'transparent',
            strokeOpacity: 0.2,
          }}
        />
      );

      setPolygonElements(prevPolygonElements => [...prevPolygonElements, newPolygonElement]);
    }
  }, [positionArray, roll]);

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

        

        <Marker position={latestPosition} />
        
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
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
const mapStateToProps = (state) => ({
  socketData: state.socketData, // Đảm bảo tên prop khớp với tên state trong Redux store
});

export default connect(mapStateToProps)(GoogleMapsComponent1);