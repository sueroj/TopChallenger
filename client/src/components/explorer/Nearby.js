// Friends
// Purpose: Display Strava friends rank on TC and allows user interaction. 
// Export: SideView
// --TBD-- 
// Full Implementation due.
import * as turf from '@turf/turf';
import React from 'react';
import Image from 'react-bootstrap/Image';
import './css/Nearby.css';
import * as challengeType from 'common/challengeType.json';

function Nearby(props) {
    const center = props.center;
    const filter = props.filter;
    const mappedChallenges = filterMapped(props.challenges);
    let list = [];

    if (center.lat) {
        if (filter) {
            list = orderByNearestToCenter(filter, center);
        } else list = orderByNearestToCenter(mappedChallenges, center);
    }

    function filterMapped(source) {
        let mapped = [];
        source.forEach((challenge) => {
            if (challenge.Type !== challengeType.MILESTONE) {
                if (challenge.Type !== challengeType.ENDURANCE) {
                    mapped.push(challenge);
                }
            }
        });
        return mapped;
    }

    function orderByNearestToCenter(source, center) {
        let distance = [];
        let sorted = [];
        const from = turf.point([center.lng, center.lat]);
        const options = { units: 'miles' };

        source.forEach((challenge) => {
            let to = turf.point([challenge.StartLng, challenge.StartLat]);
            distance.push([challenge, turf.distance(from, to, options)]);
        })

        distance.sort((a, b) => {
            return a[1] - b[1];
        })

        sorted = distance.map((challenge) => {
            return challenge[0];
        })
        return sorted;
    }

    return (
        <div className="nearby-view">
            <h1>Nearby</h1>
            <div className="nearby-list">
                {list.length ? list.map((challenge) => {
                    return (
                        <button className="side-button-wrapper" onClick={() => props.toggleChallengeModal(challenge)}>
                            <Image className="side-img-badge" src={props.importAsset("scheme_geometric/badges", challenge.ChallengeId)} alt={"Badge"} rounded />
                            <div className="side-description">
                                {challenge.Name}
                            </div>
                        </button>
                    )
                }) : "Zoom in to search nearby challenges"}
            </div>
        </div>
    );
}
export default Nearby;