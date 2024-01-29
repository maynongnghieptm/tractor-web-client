import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
    FeatureGroup,
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import { useMap } from "react-leaflet";

const existingPolygon = [
    [20.952808953501354, 105.84686569239966],
    [20.95269122556692, 105.84782324101798],
    [20.952191507027003, 105.84767303731314],
];

const EditFeature = ({
    PolyCoor,
    onValueChange,
    strokeColor,
    strokeWidth,
    fillColor,
    fillOpacity,
}) => {
    
    const [editLayer, setEditLayer] = useState(PolyCoor);
    const [originalPolyCoor, setOriginalPolyCoor] = useState(PolyCoor);
    const featureGroupRef = useRef();
    const map = useMap();
    useEffect(()=>{
        setEditLayer(PolyCoor)
    },[PolyCoor])
    const _onEdited = (e) => {
        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
        });
        console.log(`_onEdited: edited ${numEdited} layers`, e);
        const editedLayer = e.layers.getLayers()[0];
        if(editedLayer){
            const editedCoor = editedLayer.getLatLngs()[0];
            onValueChange(editedCoor);
            setEditLayer(editedCoor);
            console.log("Edited Geojson",  e.layers.getLayers());
        }
        // this._onChange();
    };

    const _onCreated = (e) => {
        let type = e.layerType;
        let layer = e.layer;
        if (type === "marker") {
            console.log("_onCreated: marker created", e);
        } else {
            console.log("_onCreated: something else created:", type, e);
        }
       console.log(layer.getLatLngs()[0])
       if(layer){
        const editedCoor = layer.getLatLngs()[0];
        console.log(editedCoor)
        setEditLayer(editedCoor)
        onValueChange(editedCoor);
        //setEditLayer(editedCoor)
    }
        // this._onChange();
    };

    const _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);
        onValueChange([]);
        // this._onChange();
    };

    const _onMounted = (drawControl) => {
        console.log("_onMounted", drawControl);
    };

    const _onEditStart = (e) => {
        console.log("_onEditStart", e);
    };

    const _onEditStop = (e) => {
        console.log("_onEditStop", e);
    };

    const _onDeleteStart = (e) => {
        console.log("_onDeleteStart", e);
    };

    const _onDeleteStop = (e) => {
        console.log("_onDeleteStop", e);
    };

    const _onDrawStart = (e) => {
        console.log("_onDrawStart", e);
    };

    useEffect(() => {
        map.eachLayer((layer) => {
            if (layer instanceof L.Polygon) {
               // console.log('Polygon layer:', layer);
                layer.setStyle({
                    color: strokeColor,
                    weight: strokeWidth,
                    fillColor: fillColor,
                    fillOpacity: fillOpacity,
                });
            }
        });
    }, [strokeColor, strokeWidth, fillColor, fillOpacity]);
    useEffect(() => {
        const polygonLayer = L.polygon(editLayer, {
          color: strokeColor,
          weight: strokeWidth,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
        }).addTo(map);
      
        // Xóa lớp polygon hiện tại (nếu có) trước khi thêm lớp mới
        featureGroupRef.current.clearLayers();
        featureGroupRef.current.addLayer(polygonLayer);
      }, [editLayer, strokeColor, strokeWidth, fillColor, fillOpacity]);
      
      useEffect(() => {
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                console.log(layer)
                map.removeLayer(layer);
            }
          });
        const removeItemAtIndex = (index) => {
          // Tạo một bản sao của mảng
          console.log(PolyCoor)
          const updatedEditLayer = [...PolyCoor];
          console.log(updatedEditLayer)
          // Xóa phần tử tại vị trí index
          updatedEditLayer.splice(index, 1);
          const objectArray = updatedEditLayer.map((coordinate) => {
            const [lat, lng] = coordinate;
            return { lat, lng };
          });
          
          setEditLayer(updatedEditLayer);
          onValueChange(objectArray)
        };
      
        editLayer.forEach((item, index) => {
          const marker = L.marker(item).addTo(map);
          marker.on('contextmenu', () => {
            map.removeLayer(marker);
            removeItemAtIndex(index);
          });
        });
      }, [editLayer, map]);
      
    return (
        <FeatureGroup ref={featureGroupRef}>
            <EditControl
                onEditStart={_onEditStart}
                onDrawStart={_onDrawStart}
                position="topright"
                onEdited={_onEdited}
                onCreated={_onCreated}
                onDeleted={_onDeleted}
                draw={{
                    polyline: {
                        icon: new L.DivIcon({
                            iconSize: new L.Point(8, 8),
                            className: "leaflet-div-icon leaflet-editing-icon",
                        }),
                        shapeOptions: {
                            guidelineDistance: 10,
                            color: "navy",
                            weight: 3,
                        },
                    },
                    rectangle: false,
                    circlemarker: false,
                    marker: false,
                    circle: false,
                    polygon: {
                        shapeOptions: {
                            color: strokeColor,
                            fillColor: fillColor,
                            fillOpacity: fillOpacity,
                            weight: strokeWidth,
                        },
                        editOptions: {
                            edit: true,
                        },
                    },
                }}
            />
        </FeatureGroup>
    );
};

  
  
export default EditFeature;
