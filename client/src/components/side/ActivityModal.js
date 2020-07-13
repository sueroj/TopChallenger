// ActivityModal
// Purpose: Get activities and submit for completion of challenges. Contains verification logic.
// Export: Challenges
// --TBD-- 
// Implementation of completion login for all challengeTypes.
// Consider creation of new components to seperate logic.
// Refactor / Rebuild as necessary.
import Polyline from '@mapbox/polyline';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/ActivityModal.css';
import axios from 'axios';
import * as challengeType from 'common/challengeType.json';
import * as tier from 'common/tier.json';
import { rpLimit } from 'common/rpLimit';

function ActivityModal(props) {
    const profile = props.profile;
    const [allActivities, setAllActivities] = useState([]);
    const [numActivities, setNumActivities] = useState(0);
    const [recentEfforts, setRecentEfforts] = useState([]);
    const isSynced = props.isSynced;

    function getActivities() {
        if (isSynced === false) {
            let d = Math.floor(Date.now() / 1000);
            const beforeDate = d.valueOf();
            const afterDate = d.valueOf() - 604800;
            axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
                headers: { Authorization: `Bearer ${props.user.access_token}` },
                params: {
                    before: beforeDate,
                    after: afterDate
                }
            })
                .then((response) => {
                    setAllActivities(checkIfQualifies(response.data));
                    setNumActivities(response.data.length);
                    props.setSync(true);
                    return true; //eval req
                })
                .catch((e) => {
                    console.log("Could not connect to server:", e);
                    return false; //eval req
                })
        }
        getSegmentEfforts();
    }

    function getSegmentEfforts() {
        const today = new Date()
        const previousWeek = new Date(today.valueOf() - 604800000);
        let segmentEfforts = [];

        for (let slot = 0; slot < profile.TrackedChallenges.length; slot++) {
            if (profile.TrackedChallenges[slot]) {
                if (profile.TrackedChallenges[slot].Type === challengeType.TIMETRIAL || profile.TrackedChallenges[slot].Type === challengeType.ROUTE) {
                    axios.get((`https://www.strava.com/api/v3/segment_efforts`), {
                        headers: { Authorization: `Bearer ${props.user.access_token}` },
                        params: {
                            segment_id: profile.TrackedChallenges[slot].SegmentId,
                            start_date_local: previousWeek.toISOString(),
                            end_date_local: today.toISOString()
                        }
                    })
                        .then((response) => {
                            segmentEfforts.push(response.data);
                        })
                        .catch((e) => {
                            console.log("Could not connect to server:", e);
                            return false;
                        })
                }
            }
        }
        setRecentEfforts(segmentEfforts);
    }

    // Check for every activity within last 7 days.
    function submitActivities(profile) {
        let output = [];
        for (let slot = 0; slot < profile.TrackedChallenges.length; slot++) {
            if (profile.TrackedChallenges[slot]) {
                let isComplete = null;
                let tierComplete = null;

                switch (profile.TrackedChallenges[slot].Type) {
                    case challengeType.MILESTONE:
                        for (let list = 0; list < allActivities.length; list++) {
                            isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                        }
                        break;
                    case challengeType.EXPLORATION:
                        for (let list = 0; list < allActivities.length; list++) {
                            isComplete = executeExplorationMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                        }
                        break;
                    case challengeType.TIMETRIAL:
                        for (let list = 0; list < recentEfforts.length; list++) {
                            tierComplete = executeTTMetrics(recentEfforts[list], profile.TrackedChallenges[slot]);
                        }
                        if (tierComplete) {
                            isComplete = true;
                        }
                        break;
                    case challengeType.ROUTE:
                        for (let list = 0; list < allActivities.length; list++) {
                            tierComplete = executeRouteMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                        }
                        if (tierComplete) {
                            isComplete = true;
                        }
                        break;
                    case challengeType.ENDURANCE:
                        // 
                        break;
                    default:
                        alert("An error has occurred.");
                }

                // Activity successfully meets criteria, remove challenge from tracked list and
                // upload to server
                if (isComplete === true) {
                    if (tierComplete) {
                        profile.TrackedChallenges[slot].Tier = tierComplete;
                    }
                    profile.Completed.push(profile.TrackedChallenges[slot]);
                    output += (profile.TrackedChallenges[slot].Name + " completed.");
                    profile.TotalCompleted = profile.Completed.length;
                    profile.TotalRp += profile.TrackedChallenges[slot].Rp;
                    profile.TrackedChallenges[slot] = null;
                    profile = calcRank(profile);
                    // profile.UploadedActivities.push(activity[list].id);  multiple activity upload prevention TBD
                    props.updateProfile(profile);
                }
            }
        }
        props.showMessageModal(output);
        props.toggleActivityModal();
    }

    function calcRank(profile) {
        for (let rank = 0; rank < rpLimit.length; rank++)
        {
            if(profile.TotalRp >= rpLimit[rank])
            {
                profile.Rank = rank + 1; // rank up the user
                profile.RpToNext = rpLimit[rank + 1] - profile.TotalRp;
                profile.CurrentRp = profile.TotalRp - rpLimit[rank];
            }
        }
        return profile;
    }

    function executeMilestoneMetrics(activity, trackedChallenge) {
        let isComplete = null;
        isComplete = passFailMetric(activity.distance, trackedChallenge.Distance, isComplete);
        isComplete = passFailMetric(activity.average_speed, trackedChallenge.AverageSpeed, isComplete);
        isComplete = passFailMetric(activity.max_speed, trackedChallenge.MaxSpeed, isComplete);
        isComplete = passFailMetric(activity.moving_time, trackedChallenge.MovingTime, isComplete);
        isComplete = passFailMetric(activity.total_elevation_gain, trackedChallenge.Elevation, isComplete);
        return isComplete;
    }


    function executeExplorationMetrics(activity, trackedChallenge) {
        let isMatch = null;
        isMatch = matchTargetGeojson(activity.map.summary_polyline, trackedChallenge);
        if (isMatch) {
            isMatch = passFailMetric(activity.distance, trackedChallenge.Distance, isMatch);
            isMatch = passFailMetric(activity.average_speed, trackedChallenge.AverageSpeed, isMatch);
            isMatch = passFailMetric(activity.max_speed, trackedChallenge.MaxSpeed, isMatch);
            isMatch = passFailMetric(activity.moving_time, trackedChallenge.MovingTime, isMatch);
            isMatch = passFailMetric(activity.total_elevation_gain, trackedChallenge.Elevation, isMatch);
        }
        return isMatch;
    }

    function executeRouteMetrics(activity, trackedChallenge) {
        let isMatch = null;
        let currentTier = null;

        isMatch = matchRouteGeojson(activity.map.summary_polyline, trackedChallenge);
        if (isMatch) {
            currentTier = passFailTime(activity.moving_time, trackedChallenge.TargetTime.Bronze, tier.BRONZE, currentTier);
            currentTier = passFailTime(activity.moving_time, trackedChallenge.TargetTime.Silver, tier.SILVER, currentTier);
            currentTier = passFailTime(activity.moving_time, trackedChallenge.TargetTime.Gold, tier.GOLD, currentTier);
        }
        return currentTier;
    }

    function passFailMetric(metric, target, isComplete) {
        if (target > 0) {
            return metric >= target ? true : false;
        }
        else return isComplete;
    }

    function matchRouteGeojson(polyline, trackedChallenge) {
        let targetLng = {
            low: [],
            high: []
        }
        let targetLat = {
            low: [],
            high: []
        }
        let activityGeojson = Polyline.toGeoJSON(polyline);
        let activity = {
            lng: activityGeojson.coordinates.map((point) => {
                return point[0];
            }),
            lat: activityGeojson.coordinates.map((point) => {
                return point[1];
            })
        }

        let targetGeojson = Polyline.toGeoJSON(trackedChallenge.Polyline);
        let targetHit = [];
        let coord = [];

        for (let point = 0; point < targetGeojson.coordinates.length; point++) {
            targetHit[point] = false;
            coord = targetGeojson.coordinates[point];
            targetLng.low[point] = coord[0] - 0.001;
            targetLng.high[point] = coord[0] + 0.001;
            targetLat.low[point] = coord[1] - 0.001;
            targetLat.high[point] = coord[1]+ 0.001;
        }

        for (let targetPoint = 0; targetPoint < targetGeojson.coordinates.length; targetPoint++) {
            for (let activityPoint = 0; activityPoint < activityGeojson.coordinates.length; activityPoint++){
                if (targetLng.low[targetPoint] <= activity.lng[activityPoint] && activity.lng[activityPoint] <= targetLng.high[targetPoint]) {
                    if (targetLat.low[targetPoint] <= activity.lat[activityPoint] && activity.lat[activityPoint] <= targetLat.high[targetPoint]) {
                        targetHit[targetPoint] = true;
                    }
                }
            }
        }

        return calcHits("all", targetHit, 90);
    }

    function matchTargetGeojson(polyline, trackedChallenge) {
        const lowLng = trackedChallenge.StartLng - 0.001;
        const highLng = trackedChallenge.StartLng + 0.001;
        const lowLat = trackedChallenge.StartLat - 0.001;
        const highLat = trackedChallenge.StartLat + 0.001;

        let activityGeojson = Polyline.toGeoJSON(polyline);
        let routeTaken = activityGeojson.coordinates.map((point) => {
            if (lowLng <= point[0] && point[0] <= highLng) {
                if (lowLat <= point[1] && point[1] <= highLat) {
                    return true;
                }
            }
            return false;
        })

        return calcHits("single", routeTaken)
    }

    function calcHits(type, routeCoordinates, minPercentHit) {
        if (type === "single"){
                    // Check for single target geojson hit.
        for (let hit = 0; hit < routeCoordinates.length; hit++) {
            if (routeCoordinates[hit] === true) {
                return true;
            }
        }
        return false;
        }

        if (type === "all") {
            let numHits = 0;
            let maxHits = routeCoordinates.length;
            // Check for minimum % target geojson match.
            for (let hit = 0; hit < routeCoordinates.length; hit++) {
                if (routeCoordinates[hit] === true) {
                    numHits++;
                }
            }
            console.log(numHits);
            console.log((numHits / maxHits * 100));
    
            if ( (numHits / maxHits * 100) >= minPercentHit ) {
                return true;
            } else return false;
        }
    }

    function executeTTMetrics(segmentEfforts, trackedChallenge) {
        let currentTier = null;
        for (let list = 0; list < segmentEfforts.length; list++) {
            if (segmentEfforts[list].segment.id === trackedChallenge.SegmentId) {
                currentTier = passFailTime(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Bronze, tier.BRONZE, currentTier);
                currentTier = passFailTime(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Silver, tier.SILVER, currentTier);
                currentTier = passFailTime(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Gold, tier.GOLD, currentTier);
            }
        }
        return currentTier;
    }

    function passFailTime(metric, target, tier, currentTier) {
        if (metric <= target) {
            return tier;
        }
        else return currentTier;
    }

    function checkIfQualifies(activityList) {
        let newActivityList = [];
        activityList.forEach((activity) => {
            if (activity.manual !== true && activity.flagged !== true) {
                newActivityList.push(activity);
            }
        })
        return newActivityList;
    }

    return (
        <Modal className="badge-modal" onShow={() => getActivities()}
            {...props} onHide={() => props.toggleActivityModal()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Your activities to be submitted:</h4>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <DisplayActivities allActivities={allActivities} />
            </Modal.Body>

            <Modal.Footer className="activity-sync-modal-footer">
                {numActivities ? <Button variant="success" className="activity-sync-modal-button" onClick={() => submitActivities(profile)}>OK</Button>
                    : <Button variant="danger" className="activity-sync-modal-button">Importing activities...</Button>}
            </Modal.Footer>
        </Modal>
    );
}

function DisplayActivities(props) {
    return (
        <div>
            {props.allActivities ? <ul>{(props.allActivities.map(activity => {
                return <li> {activity.name} {activity.start_date}</li>
            }))}</ul>
                : null}
        </div>
    );
}

export default ActivityModal;
