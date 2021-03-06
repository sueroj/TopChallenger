// Map
// Purpose: Displays maps for modals. (and Explorer page TBD) 
// Export: TrackedModal / Badge
// --TBD-- 
// Add maps for all challengeTypes, and all others TBD.
import Polyline from '@mapbox/polyline';
import React, { useEffect } from 'react';
import * as config from 'api/config.json';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';
import * as challengeType from 'common/challengeType.json';

function Map(props) {
    const startLng = props.challenge.StartLng;
    const startLat = props.challenge.StartLat;
    const endLng = props.challenge.EndLng;
    const endLat = props.challenge.EndLat;
    const polyline = props.challenge.Polyline;
    const zoom = 11

    // Hooks custom version
    const miniMap = React.createRef;
    mapboxgl.accessToken = config.MAP_TOKEN;

    useEffect(() => {

        const decodePolyline = () => {
            console.log(Polyline.toGeoJSON(polyline));
            return Polyline.toGeoJSON(polyline);
        }

        const miniMap = new mapboxgl.Map({
            container: 'miniMap',
            center: [startLng, startLat],
            zoom: zoom,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        // select map style.
        switch (props.challenge.Type) {
            case challengeType.MILESTONE:
                //
                break;
            case challengeType.EXPLORATION:
                circleStyle(miniMap);
                break;
            case challengeType.TIMETRIAL:
                lineStyle(miniMap);
                break;
            case challengeType.ROUTE:
                lineStyle(miniMap);
                break;
            case challengeType.ENDURANCE:
                //
                break;
            default:
                alert("An error has occurred.");
        }      

        function circleStyle(map) {
            miniMap.on('load', () => {
                createGeojsonSource(map, 'Point', [startLng, startLat]);
                map.addLayer({
                    'id': 'marker',
                    'type': 'circle',
                    'source': 'base',
                    'paint': circlePaint()
                });
            });
        }

        function lineStyle(miniMap) {
            createMarker(startLng, startLat, miniMap, "#00FF00");
            createMarker(endLng, endLat, miniMap, "#FF0000");

            miniMap.on('load', () => {
                createGeojsonSource(miniMap, 'LineString', decodePolyline());
                miniMap.addLayer({
                    'id': 'segment',
                    'type': 'line',
                    'source': 'base',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': linePaint()
                });
            });
        }

        const circlePaint = () => ({
            'circle-radius': {
                'base': 30,
                'stops': [
                    [4,8],
                    [12,16],
                    [13,32],
                    [14,64],
                    [15,128],
                    [16,256],
                    [17,512],
                    [18,1024]
                ]
            },
            'circle-color': '#FF0000',
            'circle-opacity': 0.4
        });
    
        const linePaint = () => ({
            'line-width': 2,
            'line-color': '#FF0000',
            'line-opacity': 0.6
        });



    }, [startLng, startLat, endLng, endLat, zoom, polyline, props.challenge.Type]
    );

    function createMarker(lng, lat, map, color) {
        new mapboxgl.Marker({
            'color': color,
        })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    function createGeojsonSource(map, type, source) {
        let geometry = (type === 'Point') ? {
            'type': type,
            'coordinates': source
        }
        :
        source

        map.addSource('base', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': geometry
            }
        });
    }

    return (
        <div ref={miniMap}></div>
    );

}

export default Map;
