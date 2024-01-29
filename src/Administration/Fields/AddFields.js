import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, Polygon as Polygon_GG_Map, useLoadScript, DrawingManager } from '@react-google-maps/api';
import './AddFields.css';
import Map from './Goong';
import axios from '../../_config/AxiosConfig';
import { HexColorPicker } from "react-colorful";
import { MapContainer, TileLayer, MapConsumer, useMapEvents, Polygon as Polygon_React_Leaflet, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import EditFeature from "./EditControl";
import { StandaloneSearchBox } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "@reach/combobox/styles.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
delete L.Icon.Default.prototype._getIconUrl;
const containerStyle = {
    width: '100%',
    height: '100%',
};
const mapWidth = 800;
const center = {
    lat: 20.9527494633333,
    lng: 105.847014555,
};
const coordinatesArray = [
    { lat: 20.95316839885564, lng: 105.84682009484641 },
    { lat: 20.95307070995979, lng: 105.8475764777886 },
    { lat: 20.95268541685053, lng: 105.84759995341301 },
    { lat: 20.952498351942257, lng: 105.84713123109213 }
];
const AddFields = () => {
    const [polygonPath, setPolygonPath] = useState([]);
    const [isPolygonClosed, setIsPolygonClosed] = useState(false);
    const [Strokecolor, setStrokeColor] = useState("#aabbcc");
    const [Fillcolor, setFillColor] = useState("#ccc");
    const [strokeWeight, setStrokeWeight] = useState(1);
    const [fillOpacity, setFillOpacity] = useState(0.5);
    const [switchMap, setSwitchMap] = useState(false)
    const [addPoint, setAddPoint] = useState(false)
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
    const [map, setMap] = useState(null)
    const [map1, setMap1] = useState(null)
    const [zoom, setZoom] = useState(20)
    const [zoom1, setZoom1] = useState(20)
    const [mapCenter1, setMapCenter1] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [mapCenter, setMapCenter] = useState({ lat: 20.95302564232467, lng: 105.84628633525244 });
    const [map_leaflet_coor, setMap_leaflet_coor] = useState([])
    const [receivedValue, setReceivedValue] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        setMap(map)
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const handleMapClick = (event) => {
        if (!isPolygonClosed) {
            setPolygonPath((prevPath) => [...prevPath, { lat: event.latLng.lat(), lng: event.latLng.lng() }]);
        }
    };

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
                path.addListener("insert_at", onInsert),
                path.addListener("remove_at", onRemove),
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

    const handleDelete = () => {
        setPolygonPath([])
        // console.log(res)
    }

    const handleSwitchMap = () => {
        setSwitchMap(!switchMap)
    }

    const handleMapchange = () => {
        setSwitchMap(false);
    };

    const handleValueChange = (value) => {
        console.log(value)
        setPolygonPath(value);
    };

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
        setZoom1(zoom1)
        setZoom(zoom)
    }, [zoom1, zoom])
    const onSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
            if (place.geometry && place.geometry.location) {
                bounds.extend(place.geometry.location);
            }
        });
        if (map) {
            map.fitBounds(bounds);
        }
    };

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
            console.log([calculateCentroid(coor).lat, calculateCentroid(coor).lng])
        }
    }

    const onInsert = useCallback(() => {
        console.log("Vertex added");
        onEdit();
    }, [onEdit]);

    const onRemove = useCallback(() => {
        console.log("Vertex removed");
        onEdit();
    }, [onEdit]);

    const handleDeleteVetice = (index) => {
        if (index >= 0 && index < polygonPath.length) {
            const updatedPath = [...polygonPath];
            updatedPath.splice(index, 1);
            setPolygonPath(updatedPath);
        }
    }

    const handleAddPoint = () => {
        setAddPoint(!addPoint)
    }
    useEffect(() => {
        const arrayArray = polygonPath.map(({ lat, lng }) => [lat, lng])
        setMap_leaflet_coor(arrayArray)
    }, [polygonPath])
    return (
        <div className='map_contain' style={{ width: '100%', height: '100%' }}>
            {!switchMap ? (
                <MapContainer
                    defaultZoom={20}
                    className="markercluster-map"
                    center={[mapCenter1.lat, mapCenter1.lng] || [20.95302564232467, 105.84628633525244]}
                    zoom={zoom}
                    ref={setMap1}
                    maxZoom={20}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                        maxZoom={20}
                        subdomains={['mt1', 'mt2', 'mt3']}
                    />
                    <LeafletgeoSearch />
                    <EditFeature
                        PolyCoor={map_leaflet_coor}
                        onValueChange={handleValueChange}
                        strokeColor={Strokecolor}
                        fillColor={Fillcolor}
                        strokeWidth={strokeWeight}
                        fillOpacity={fillOpacity}
                    />
                </MapContainer>
            )
                :
                (
                    <GoogleMap
                        mapTypeId="satellite"
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={zoom1}
                        onClick={addPoint ? handleMapClick : null}
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
                        onLoad={onMapLoad}
                    >
                        <Polygon_GG_Map
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
                        {polygonPath.map((vertex, index) => (
                            <Marker
                                key={index}
                                position={vertex}
                                label={`${index + 1}`}
                                onRightClick={() => handleDeleteVetice(index)}
                            />
                        ))}
                    </GoogleMap>
                )}
            <div className='search_box'>
                {switchMap &&
                    <Search panTo={panTo} />
                }
            </div>
            <div className='btn_enable_add'>
                {switchMap && <button className="btn-search" style={{ "zIndex": "1000" }} onClick={() => handleAddPoint()}>{!addPoint ? "Bật thêm điểm" : " Tắt thêm điểm"}</button>}

            </div>
            <div className='input_coordinate'>
                <button className="btn-search" style={{ "zIndex": "1000", "marginLeft":"0" }} onClick={() => handleSwitchMap()}>Switch map</button>
                <textarea
                    value={`{"a": [${polygonPath.flatMap(point => [point.lat, point.lng])}]}`
                    }>
                </textarea>
                <div className='edit-polygon-option'>
                    <div className='edit-polygon-option_item'>
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
                <button className="btn-search" onClick={() => handleSaveField()}>Save</button>
                {switchMap && <button className="btn-search" onClick={() => handleDelete()}>Delete</button>}
                {polygonPath.length > 2 && <button className="btn-search" onClick={() => handleSetCenter(polygonPath)}>Set Center</button>}
            </div>
        </div>

    );
};
function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",
        requestOptions: {
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    panTo({ lat, lng });
                    console.log("📍 Coordinates: ", { lat, lng });
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)} style={{ "color": "black" }}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref}>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
                style={{ "width": "100%" }}
            />
            {status === "OK" && <ul style={{ "zIndex": "3000", "background": "white", "paddingLeft": 0, "color": "white" }}>{renderSuggestions()}</ul>}
        </div>
    );
}
function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            position: 'topright',
        });
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);
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

export default AddFields;
