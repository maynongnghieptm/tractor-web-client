import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { getDataFromRedux } from '../../store/actions/Socketaction';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
};

class GoogleMapsComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      positionArray: [],
      plansArray: [],
      mapCenter: center,
      shouldUpdateMapCenter: false,
      customIcon: null,
      yaw: null
    };
  }

  componentDidMount() {
    // Load the Google Maps JavaScript API here
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', this.handleScriptLoad);
    document.body.appendChild(script);
  }

  handleScriptLoad = () => {
    // Google Maps API is loaded, you can now access window.google.maps
    // Initialize your customIcon here
    const customIcon = {
      url: '/tractor.png',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0), // origin
      anchor: new window.google.maps.Point(20, 40)
    };

    this.setState({ customIcon });
  };

  componentDidUpdate(prevProps) {
    const {yaw} = this.state
    if (this.props.socketData !== prevProps.socketData) {
      this.updatePositionAndPlans(this.props.socketData);
     const rotation = document.querySelector('img')
        if(rotation){
        //  rotation.style.transform = 'rotate(' + yaw + 'deg)';
        }
    }
  }

  componentWillUnmount() {
    this.setState({
      positionArray: [],
      plansArray: [],
    });
  }

  updatePositionAndPlans(socketData) {
    if (socketData && socketData.ypr) {
      if (socketData.llh && socketData.plans) {
        const newPosition = {
          lat: socketData.llh[0],
          lng: socketData.llh[1],
        };
  
        const plans = [];
        for (let i = 0; i < socketData.plans.length; i += 2) {
          plans.push({
            lat: socketData.plans[i],
            lng: socketData.plans[i + 1],
          });
        }
  
        // Giới hạn số lượng phần tử trong positionArray
        let updatedPositionArray = [...this.state.positionArray, newPosition];
        if (updatedPositionArray.length > 100) {
          updatedPositionArray = updatedPositionArray.slice(1); // Xóa phần tử đầu tiên
        }
  
        this.setState((prevState) => ({
          positionArray: updatedPositionArray,
          plansArray: plans,
          yaw: parseFloat(socketData.ypr[0]),
        }));
  
        if (this.state.shouldUpdateMapCenter) {
          this.setMapCenter(newPosition);
        }
      }
    }
  }
  

  setMapCenter = (newPosition) => {
    this.setState({
      mapCenter: newPosition,
    });
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      shouldUpdateMapCenter: !prevState.shouldUpdateMapCenter,
    }));
  };

  render() {
    const {
      positionArray,
      plansArray,
      mapCenter,
      shouldUpdateMapCenter,
      customIcon,
      yaw
    } = this.state;
  // / 
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

          <Marker position={positionArray[positionArray.length - 1]}
          // icon={customIcon}
     // Sử dụng giá trị yaw để xoay biểu tượng} 
     />

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
                checked={shouldUpdateMapCenter}
                onChange={this.handleCheckboxChange}
              />
            </label>
          </div>
        </GoogleMap>
      </LoadScript>
    );
  }
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps)(GoogleMapsComponent);