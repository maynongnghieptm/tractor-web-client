import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from '@react-google-maps/api';
import './AddFields.css';
import { useParams } from 'react-router-dom';
import axios from '../../_config/AxiosConfig';
import { HexColorPicker } from "react-colorful";
const containerStyle = {
    width: '100%',
    height: '100%',
};


const EditField = () => {

    const [polygonPath, setPolygonPath] = useState([]);
    const [isPolygonClosed, setIsPolygonClosed] = useState(false);
    const [Strokecolor, setStrokeColor] = useState("#aabbcc");
    const [Fillcolor, setFillColor] = useState("#ccc");
    const [strokeWeight, setStrokeWeight] = useState(1);
    const [fillOpacity, setFillOpacity] = useState(0.5);
    
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 20.9527494633333,
        lng: 105.847014555,
    });
    const { id } = useParams();
    const mapRef = useRef();
    useEffect(() => {
        const fetchField = async () => {
            try {
                console.log(id)
                const res = await axios.get(`/fields/get_fields_byId?id=${id}`)
                console.log(res.data.data)
                setPolygonPath(res.data.data.coordinate)
                setMapCenter(res.data.data.coordinate[0])
                setStrokeColor(res.data.data.strokeColor)
                setFillColor(res.data.data.fillColor)
                setStrokeWeight(res.data.data.strokeWidth)
                setFillOpacity(res.data.data.strokeOpacity)
            } catch (error) {
                console.error(error)
            }
        }
        fetchField()
    }, [])
    const handleMapClick = (event) => {
        console.log(event.latLng.lat())
        if (!isPolygonClosed) {
            setPolygonPath((prevPath) => [...prevPath, { lat: event.latLng.lat(), lng: event.latLng.lng() }]);
        }
    };

    useEffect(() => {
        console.log(polygonPath)
    }, [polygonPath])
    const onEdit = useCallback(() => {
        if (polygonRef.current) {
            const nextPath = polygonRef.current
                .getPath()
                .getArray()
                .map((latLng) => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                });
            setPolygonPath(nextPath);
        }
    }, [setPolygonPath]);

    const onLoad = useCallback(
        (polygon) => {
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        },
        [onEdit]
    );

    const onUnmount = useCallback(() => {
        listenersRef.current.forEach((lis) => lis.remove());
        polygonRef.current = null;
    }, []);
    const handleSaveField = async () => {
        const data = {
            coordinate: polygonPath,
            strokeColor: Strokecolor,
            strokeWidth: strokeWeight,
            fillColor: Fillcolor,
            fillOpacity: fillOpacity
        }
        console.log(data)
        const res = await axios.put(`/fields/update_field?id=${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            alert('Update thành công')
        }

        // console.log(res)
    }
    const onMapLoad = useCallback((map) => {
        //setMap(map)
        mapRef.current = map;
    }, []);
    return (
        <div style={{ width: '100%', height: '100%' }}>
            
                <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={20} onClick={handleMapClick} onLoad={onMapLoad}  mapTypeId="satellite">
                    <Polygon
                        path={polygonPath}
                        editable={true}
                       
                        options={{
                            strokeColor: Strokecolor,
                            strokeOpacity: 1,
                            strokeWeight: strokeWeight,
                            fillOpacity: fillOpacity,
                            fillColor: Fillcolor
                        }}
                        onMouseUp={onEdit}
                        onDragEnd={onEdit}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    />

                </GoogleMap>

            <div className='input_coordinate'>
                <textarea value={`{"a": [${polygonPath.flatMap(point => [point.lat, point.lng])}]}`

                }>

                </textarea>
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

                    <div className='edit-polygon-option_item' >
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


                <button onClick={() => handleSaveField()}>Save Update</button>

            </div>

        </div>
    );
};

export default EditField;
