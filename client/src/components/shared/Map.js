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



    const circlePaint = () => ({
        'circle-radius': 30,
        'circle-color': '#FF0000',
        'circle-opacity': 0.4
    });

    const linePaint = () => ({
        'line-width': 2,
        'line-color': '#FF0000',
        'line-opacity': 0.6
    });

    useEffect(() => {
        const challengeType = {
            MILESTONE: 0,
            EXPLORATION: 1,
            TIMETRIAL: 2,
            ENDURANCE: 3,
        }

        const map = new mapboxgl.Map({
            container: 'map',
            center: [startLng, startLat],
            zoom: zoom,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        const marker = new mapboxgl.Marker({
            'layout': {
                'icon-size': '0.2'
            },
            'paint': {
                'icon-color': '#90EE90'
            }
        })
        .setLngLat([startLng, startLat])
        .addTo(map);

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

        const decodePolyline = () => {
            return Polyline.toGeoJSON(polyline);
        }

    }, [startLng, startLat, endLng, endLat, zoom, polyline, props.challenge.Type]
    );

    return (
        <div ref={map}></div>
    );

}

export default Map;
