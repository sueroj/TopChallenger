import React from 'react';
import * as config from 'api/config.json';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';


function Map(props) {
    const startLng = props.challenge.StartLng;
    const startLat = props.challenge.StartLat;
    const endLng = props.challenge.EndLng;
    const endLat = props.challenge.EndLat;
    const polyline = props.challenge.Polyline;
    const name = props.challenge.Name;
    // const zoom = props.zoom;
    // const [map, setMap] = useState([]);

    const map = {
        api: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static",
        size: "765x248",
        oWidth: 4,
        oTransparency: 0.5,
        oColorA: "ff4500",
        oColorB: "000",
        oColorLine: "f44",
    }

    // useEffect(() => {
    //     console.log("render map")
        
    //     setMap(new mapboxgl.Map({
    //     container: 'map',
    //             center: [lng, lat],
    //             zoom: zoom,
    //     style: 'mapbox://styles/mapbox/streets-v9'
    //     }));
    // }, []
    // );

    return(

        <div className="map-wrapper">
            <img className="map" alt={name} src={`${map.api}/pin-s-a+${map.oColorA}(${startLng},${startLat}),pin-s-b+${map.oColorB}(${endLng},${endLat}),path-${map.oWidth}+${map.oColorLine}-${map.oTransparency}(${polyline})/auto/${map.size}?access_token=${config.MAP_TOKEN}`} />
            {/* <div className="map" id={map} /> */}
        </div>
    );   

}

export default Map;
