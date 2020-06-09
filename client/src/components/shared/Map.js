import Polyline from '@mapbox/polyline';
import React, { useState, useEffect } from 'react';
import * as config from 'api/config.json';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';

function Map(props) {
    const startLng = props.challenge.StartLng;
    const startLat = props.challenge.StartLat;
    const endLng = props.challenge.EndLng;
    const endLat = props.challenge.EndLat;
    const polyline = props.challenge.Polyline;
    const zoom = 11

    // Hooks custom version
    const map = React.createRef;
    mapboxgl.accessToken = config.MAP_TOKEN;

    useEffect(() => {
        const challengeType = {
            MILESTONE: 0,
            EXPLORATION: 1,
            TIMETRIAL: 2,
            ENDURANCE: 3,
        }

        const decodePolyline = () => {
            console.log(Polyline.toGeoJSON(polyline));
            return Polyline.toGeoJSON(polyline);
        }

        const map = new mapboxgl.Map({
            container: 'map',
            center: [startLng, startLat],
            zoom: zoom,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        switch (props.challenge.Type) {
            case challengeType.MILESTONE:
                //
                break;
            case challengeType.EXPLORATION:
                circleStyle(map);
                break;
            case challengeType.TIMETRIAL:
                lineStyle(map);
                break;
            case challengeType.ENDURANCE:
                //
                break;
            default:
                alert("An error has occurred.");
        }      

        function circleStyle(map) {
            map.on('load', () => {
                map.addSource('segment', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [startLng, startLat]
                        }
                    }
                });
                map.addLayer({
                    'id': 'marker',
                    'type': 'circle',
                    'source': 'segment',
                    'paint': circlePaint()
                });
            });
        }

        function lineStyle(map) {
            const startMarker = new mapboxgl.Marker({
                'color': '#00FF00',
            })
            .setLngLat([startLng, startLat])
            .addTo(map);
            const finishMarker = new mapboxgl.Marker({
                'color': '#FF0000',
            })
            .setLngLat([endLng, endLat])
            .addTo(map);

            map.on('load', () => {
                map.addSource('segment', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': decodePolyline()
                    }
                });
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'segment',
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

    return (
        <div ref={map}></div>
    );

}

export default Map;
