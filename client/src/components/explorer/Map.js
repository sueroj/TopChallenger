// Map
// Purpose: Displays maps for modals. (and Explorer page TBD) 
// Export: TrackedModal / Badge
// --TBD-- 
// Add maps for all challengeTypes, and all others TBD.
import React, { useEffect, useState } from 'react';
import * as config from 'api/config.json';
import Col from 'react-bootstrap/Col';
import './css/Map.css';
import 'pages/css/explorer.css';
import mapboxgl from 'mapbox-gl';
import * as challengeType from 'common/challengeType.json';
import ChallengeModal from 'components/dashboard/shared/ChallengeModal';
import LeftNav from "components/explorer/LeftNav";

function Map(props) {
    const challenges = props.challenges;
    const profile = props.profile;
    const [startLng, setStartLng] = useState(0.17);
    const [startLat, setStartLat] = useState(52.18);
    const zoom = 5;
    const [viewModal, toggleModal] = useState(false);
    const [viewChallenge, setViewChallenge] = useState(null);
    const [filter, setFilter] = useState(null);
    const [center, setCenter] = useState([]);

    // Hooks custom version
    // const map = React.createRef;
    mapboxgl.accessToken = config.MAP_TOKEN;

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: 'map',
            center: [startLng, startLat],
            zoom: zoom,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        map.on('load', function () {
            let center = [startLng, startLat];

            map.on('moveend', function () {
                center = map.getCenter();
                console.log(center);
                listNearby(center);
            })

            if (filter) {
                loadSource(filter);
            } else {
                loadSource(challenges);
            }

            function loadSource(source){
                source.forEach((challenge) => {
                    if (challenge) {
                        if (challenge.Type !== challengeType.MILESTONE) {
                            if (challenge.Type !== challengeType.ENDURANCE) {
                                loadBadges(challenge);
                            }
                        }
                    }
                });
            }

            function loadBadges(challenge) {
                map.loadImage(
                    importAsset("scheme_geometric/badges", challenge.ChallengeId),
                    function (error, image) {
                        if (error) throw error;

                        map.addImage("img" + challenge.ChallengeId.toString(), image);
                        createGeojsonSource(map, challenge.ChallengeId.toString(), [challenge.StartLng, challenge.StartLat])
                        map.addLayer({
                            'id': challenge.ChallengeId.toString(),
                            'type': 'symbol',
                            'source': challenge.ChallengeId.toString(),
                            'layout': {
                                'icon-image': "img" + challenge.ChallengeId.toString(),
                                'icon-size': 0.5
                            }
                        });
                    }
                );
                configurePointer(challenge.ChallengeId);
                configureModalOnClick(challenge);
            }
        });

        function configureModalOnClick(challenge) {
            // On click event, open challenge modal
            map.on('click', challenge.ChallengeId.toString(), function (e) {
                // let coordinates = e.features[0].geometry.coordinates.slice();

                toggleChallengeModal(challenge);
            })
        }

        function configurePointer(id) {
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', id.toString(), function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', id.toString(), function () {
                map.getCanvas().style.cursor = '';
            });
        }

        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

    }, [startLng, startLat, filter, zoom, challenges]
    );

    const importAsset = (type, challengeId) => {
        let banner = [];
        try {
            banner = require(`assets/${type}/${challengeId}.png`);
        } catch {
            banner = require(`assets/${type}/default.png`);
        }
        return banner;
    }

    function createGeojsonSource(map, name, source) {
        let geometry = {
            'type': 'Point',
            'coordinates': source
        }

        map.addSource(name, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': geometry
            }
        });
    }

    function toggleChallengeModal(challenge) {
        setViewChallenge(challenge);
        toggleModal(!viewModal);
    }

    const updateFilters = (filter) => {
        let filtered = []
        challenges.forEach((challenge) => {
            if (challenge.Type === challengeType.EXPLORATION && filter.exploration) {
                filtered.push(challenge);
            }
            if (challenge.Type === challengeType.TIMETRIAL && filter.sprints) {
                filtered.push(challenge);
            }
            if (challenge.Type === challengeType.ROUTE && filter.routes) {
                filtered.push(challenge);
            }
        })
        // if (filter.completed === false) {
        //     profile.Completed.forEach((complete) => {

        //     })
        // }
        setFilter(filtered);
    }

    const listNearby = (center) => {
        setCenter(center);
    }

    return (
        <>
            {viewModal ? <ChallengeModal show={viewModal} challenge={viewChallenge} profile={props.profile} toggleChallengeModal={toggleChallengeModal} /> : null}
            <Col sm={2}>
                <div className="explorer-side">
                    <LeftNav importAsset={importAsset} updateFilters={updateFilters} toggleChallengeModal={toggleChallengeModal} challenges={challenges} filter={filter} center={center} />
                </div>
            </Col>
            <Col sm={7}>
                <div id="map" className="explorer-map"></div>
            </Col>
        </>
    );

}

export default Map;