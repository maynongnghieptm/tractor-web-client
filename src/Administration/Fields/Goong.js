import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polygon, MapConsumer, useMapEvents, FeatureGroup, } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { HexColorPicker } from "react-colorful";
import { useMap } from "react-leaflet";
import EditFeature from "./EditControl";
import axios from '../../_config/AxiosConfig';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

let polyline;
const Map = ({onMapZoom, onChangeMap, polyCoor, zoom }) => {
    const [viewport, setViewport] = useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14,
    });
    const [Strokecolor, setStrokeColor] = useState("#aabbcc");
    const [Fillcolor, setFillColor] = useState("#ccc");
    const [strokeWeight, setStrokeWeight] = useState(1);
    const [fillOpacity, setFillOpacity] = useState(0.5);
    const polygonRef = useRef();
    const [coordinates, setCoordinates] = useState([]);
    const [mapSwitchCoor, setMapSwitchCoor] = useState([])
    const [receivedValue, setReceivedValue] = useState("");
    const [map, setMap] = useState(null);
    const handleValueChange = (value) => {
        console.log(value)
        setReceivedValue(value);
    };
    useEffect(() => {
        const newArray = polyCoor.map(({ lat, lng }) => [lat, lng]);
        setMapSwitchCoor(newArray)
        //console.log(newArray);
    }, [])

    const handlePolygonClick = () => {
        if (polygonRef.current) {
            console.log(polygonRef.current)
            polygonRef.current.editing.enable()
        }
    };
    const handlePolygonDoubleClick = () => {
        if (polygonRef.current) {
            polygonRef.current.editing.disable()
        }
    };
    const handleSaveField = async () => {
        const data = {
            coordinate: mapSwitchCoor,
            strokeColor: Strokecolor,
            strokeWidth: strokeWeight,
            fillColor: Fillcolor,
            fillOpacity: fillOpacity
        }
        console.log(data)
        const res = await axios.post('/fields/createfield', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res)
        if (res.status === 200) {
            alert('Lưu thành công')
        }
    }
    const handleSwitchMap = () => {
        onChangeMap()
    }
    useEffect(() => {
        map?.on("zoomend", function () {
          console.log(map.getZoom());
        });
      }, [map]);
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapContainer
            whenCreated={setMap}
            defaultZoom={20}
                className="markercluster-map"
                center={[20.95302564232467, 105.84628633525244]}
                zoom={ zoom}
                maxZoom={24}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom={20}
                    subdomains={['mt1', 'mt2', 'mt3']}
                />
                <EditFeature PolyCoor={mapSwitchCoor}  onValueChange={handleValueChange} strokeColor={Strokecolor} fillColor={Fillcolor} strokeWidth={strokeWeight} fillOpacity={fillOpacity} />
                
            </MapContainer>
            <div className='input_coordinate' style={{ "top": "150px" }}>
                <button className="btn-search" style={{ "zIndex": "1000" }} onClick={() => handleSwitchMap()}>Switch map</button>
                <div className='edit-polygon-option'>
                    <div className='edit-polygon-option_item' >
                        <div>
                            <span>Stroke color</span>
                            <HexColorPicker color={Strokecolor} onChange={setStrokeColor} />
                        </div>
                        <div className='edit-polygon-option_item_opacity'>
                            <span>Stroke width</span>
                            <input
                                type="number"
                                min={0}
                                value={strokeWeight}
                                onChange={(e) => setStrokeWeight(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='edit-polygon-option'>
                    <div className='edit-polygon-option_item'>
                        <div>
                            <span>Fill Color</span>
                            <HexColorPicker color={Fillcolor} onChange={setFillColor} />
                        </div>
                        <div className='edit-polygon-option_item_opacity'>
                            <span>Fill Opacity</span>
                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.1}
                                value={fillOpacity}
                                onChange={(e) => setFillOpacity(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button className="btn-search" onClick={() => handleSaveField()}>Save</button>
                <button className="btn-search">Delete</button>
            </div>
        </div>
    );
}

export default Map;
