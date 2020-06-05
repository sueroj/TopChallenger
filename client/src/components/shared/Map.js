import Polyline from '@mapbox/polyline';
import React from 'react';
import * as config from 'api/config.json';
import './css/Map.css';
// import mapboxgl from 'mapbox-gl';


function Map(props) {
    const startLng = props.challenge.StartLng;
    const startLat = props.challenge.StartLat;
    const endLng = props.challenge.EndLng;
    const endLat = props.challenge.EndLat;
    const polyline = props.challenge.Polyline;
    const name = props.challenge.Name;
    // const zoom = props.zoom;

    const challengeType = {
        MILESTONE: 0,
        EXPLORATION: 1,
        TIMETRIAL: 2,
        ENDURANCE: 3,
    }

    const map = {
        api: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static",
        size: "765x248@2x",
        oWidth: 4,
        oTransparency: 0.5,
        oColorA: "ff4500",
        oColorB: "000",
        oColorLine: "f44",
        zoom: 12,
        display: []
    }

    // MapBox GL JS version. commented out for now while Static API version is used.
    // mapboxgl.accessToken = config.MAP_TOKEN;
    // useEffect(() => {
    //     console.log("render map")

    //     setMap(new mapboxgl.Map({
    //     container: 'map',
    //             center: [startLng, startLat],
    //             zoom: zoom,
    //     style: 'mapbox://styles/mapbox/streets-v9'
    //     }));
    // }, [startLng, startLat, zoom]
    // );

    switch (props.challenge.Type) {
        case challengeType.MILESTONE:
            //
            break;
        case challengeType.EXPLORATION:
            map.display = <img className="map" alt={name} src={`${map.api}/pin-s-a+${map.oColorA}(${startLng},${startLat}),pin-s-b+${map.oColorB}(${endLng},${endLat}),path-${map.oWidth}+${map.oColorLine}-${map.oTransparency}(${polyline})/${startLng},${startLat},${map.zoom}/${map.size}?access_token=${config.MAP_TOKEN}`} />
            break;
        case challengeType.TIMETRIAL:
            map.display = <img className="map" alt={name} src={`${map.api}/pin-s-a+${map.oColorA}(${startLng},${startLat}),pin-s-b+${map.oColorB}(${endLng},${endLat}),path-${map.oWidth}+${map.oColorLine}-${map.oTransparency}(${polyline})/auto/${map.size}?access_token=${config.MAP_TOKEN}`} />
            break;
        case challengeType.ENDURANCE:
            // isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
            break;
        default:
            alert("An error has occurred.");
    }

    return (
        <>
            <div className="map-wrapper">
                {map.display}
                {/* <div className="map" id={map}></div> */}
            </div>
        </>
    );

}

export default Map;
