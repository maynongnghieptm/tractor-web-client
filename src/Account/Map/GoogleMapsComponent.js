import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { getDataFromRedux } from '../../action';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 20.9527494633333,
  lng: 105.847014555,
};

class GoogleMapsComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      positionArray: [],
      plansArray: [],

      mapCenter: center,
      showMarker: false,
      shouldUpdateMapCenter: false
      
    };
  }

  componentDidMount() {
    //this.setCenter();

  }

  componentDidUpdate(prevProps,prevState) {
 
    if (this.props.socketData !== prevProps.socketData) {
      this.updatePositionAndPlans(this.props.socketData);
    }
   
  }

  componentWillUnmount() {
    this.setState({
      positionArray: [],
      plansArray: [],
    });
  }

  updatePositionAndPlans(socketData) {
   //console.log(333333333)
    if (socketData && socketData.ypr) {
      if (socketData.llh&&socketData.plans) {
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
      this.setState((prevState) => ({
        positionArray: [...prevState.positionArray, newPosition],
        latestPosition: newPosition,
        plansArray: plans
      }));
      }
    
    }
    if (this.state.shouldUpdateMapCenter) {
      this.setCenter();
    }
  }
  setCenter = () => {
   
    const { latestPosition } = this.state

    this.setState({
      mapCenter: latestPosition,
      
    });
  }
  
  render() {
    const {
      positionArray,
      plansArray,
      mapCenter,
      showMarker,
      shouldUpdateMapCenter,
    

    } = this.state;

   
   
    return (
      
      <LoadScript googleMapsApiKey="AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM">
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={20} >
          <Polyline
            path={this.state.positionArray}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />
          <Polyline
            path={this.state.plansArray}
            options={{
              strokeColor: 'blue',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />

          <Marker position={this.state.latestPosition} />

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
                onChange={() => {
                  this.setState({ shouldUpdateMapCenter: !shouldUpdateMapCenter });
                }}
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
