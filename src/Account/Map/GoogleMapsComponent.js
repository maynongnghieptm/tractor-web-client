import React from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
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
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnLh_HYtNHAJhPQWb1RnGLhidH-Re07XM&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', this.handleScriptLoad);
    document.body.appendChild(script);
  }

  handleScriptLoad = () => {
    const customIcon = {

      url: '/tractor.png',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20)

    };

    this.setState({ customIcon });
  };

  componentDidUpdate(prevProps) {
    const { yaw } = this.state
    const data = this.props
    if (this.props.data !== prevProps.data) {
      this.updatePositionAndPlans(this.props.data);
      const rotation = document.querySelector('img[src="/tractor.png"]');
      if (rotation) {

        rotation.style.transform = 'rotate(' + yaw + 'deg)';
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      positionArray: [],
      plansArray: [],
    });
  }

  updatePositionAndPlans(data) {
    if (data && data.ypr) {
      if (data.llh && data.plans) {
        const newPosition = {
          lat: data.llh[0],
          lng: data.llh[1],
        };

        const plans = [];
        for (let i = 0; i < data.plans.length; i += 2) {
          plans.push({
            lat: data.plans[i],
            lng: data.plans[i + 1],
          });
        }
        let updatedPositionArray = [...this.state.positionArray, newPosition];
        if (updatedPositionArray.length > 1000) {
          updatedPositionArray = updatedPositionArray.slice(1);
        }

        this.setState((prevState) => ({
          positionArray: updatedPositionArray,
          plansArray: plans,
          yaw: parseFloat(data.ypr[0]),
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
              strokeColor: "#00FF00",
              strokeOpacity: 1.0,
              strokeWeight: 3,
            }}
          />
          <Polyline
            path={plansArray}
            options={{
              strokeColor: 'blue',
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />

          <Marker position={positionArray[positionArray.length - 1]}
            icon={customIcon}
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



export default GoogleMapsComponent;