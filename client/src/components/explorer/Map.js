// Map
// Purpose: Displays maps for modals. (and Explorer page TBD) 
// Export: TrackedModal / Badge
// --TBD-- 
// Add maps for all challengeTypes, and all others TBD.
import Polyline from '@mapbox/polyline';
import React, { useEffect, useState } from 'react';
import * as config from 'api/config.json';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';
import * as challengeType from 'common/challengeType.json';

function Map(props) {
    const challenges = props.challenges;
    const [startLng, setStartLng] = useState(0.17);
    const [startLat, setStartLat] = useState(52.18);
    const [endLng, setEndLng] = useState(null);
    const [endLat, setEndLat] = useState(null);
    const [polyline, setPolyline] = useState("");
    const zoom = 5;

    // Hooks custom version
    const map = React.createRef;
    mapboxgl.accessToken = config.MAP_TOKEN;

    useEffect(() => {

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

        // if (props.activities.length > 0) {
        //     setStartLng(props.activities[2].start_longitude);
        //     setStartLat(props.activities[2].start_latitude);
        //     setEndLng(props.activities[2].end_latlng[1]);
        //     setEndLat(props.activities[2].end_latlng[0]);
        //     setPolyline(props.activities[2].map.summary_polyline);
        //     map.setCenter([startLng, startLat]);
        //     // select map style.
        //     lineStyle(map);
        // }


 

        function lineStyle(map) {
            createMarker(startLng, startLat, map, "#00FF00");
            createMarker(endLng, endLat, map, "#FF0000");

            map.on('load', () => {
                createGeojsonSource(map, 'LineString', decodePolyline());
                map.addLayer({
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
    
        const linePaint = () => ({
            'line-width': 2,
            'line-color': '#FF0000',
            'line-opacity': 0.6
        });



    }, [startLng, startLat, zoom, challenges]
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
        <div>
            <div ref={map}></div>
        </div>
    );

}

export default Map;