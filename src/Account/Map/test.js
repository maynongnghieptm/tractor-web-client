import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { connect } from 'react-redux';
import { getDataFromRedux } from '../../store/actions/Socketaction'
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
};
const MAX_POSITIONS = 100; // Limit the number of positions to store
const MAX_POLYGON_ELEMENTS = 50; // Limit the number of polygon elements to store


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
        
        setPositionArray(prevArray => {
          const newArray = [...prevArray, newPosition];
          if (newArray.length > MAX_POSITIONS) {
            //return newArray.slice(1); // Remove the oldest position
          }
          return newArray;
        });

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