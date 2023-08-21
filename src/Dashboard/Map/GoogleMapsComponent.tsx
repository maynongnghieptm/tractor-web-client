import React from 'react'
import usePositionData from 'Dashboard/fakedata'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api'
const containerStyle = {
  width: '100%',
  height: '400px',
}
//const markerIconUrl = 'D:\\5\\39566.jpg'
const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
}
const GoogleMapsComponent: React.FC = () => {
  const positions = usePositionData();
 
  // Khởi tạo mảng để lưu trữ dữ liệu vị trí
  const positionArray = positions.map(position => ({
    lat: position.llh[0],
    lng: position.llh[1],
  }));
  const latestPosition = positionArray[positionArray.length - 1]
 // console.log('Position from SomeOtherComponent:', positionArray)
  return (
    <LoadScript googleMapsApiKey="AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Polyline
          path={positionArray}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
        <Marker position={latestPosition}  />
      </GoogleMap>
    </LoadScript>
  )
}
export default GoogleMapsComponent
