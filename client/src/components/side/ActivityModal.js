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

function ActivityModal(props) {
    const [profile, setProfile] = useState(props.profile);
    const [allActivities, setAllActivities] = useState([]);
    const [numActivities, setNumActivities] = useState(0);
    const [recentEfforts, setRecentEfforts] = useState([]);
    const isSynced = props.isSynced;

    //-------------------
    // Activity check algorithm here. Each challenge type to be organized to
    // skip redundant checks. Ex. A speed challenge should only have its speed checked
    // elevation should be skipped. Only Milestones checked vs milestones, etc.
    // Also include check to see if challenges are tracked before running sync algo
    //---------------

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
                        // 
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
                    profile.TrackedChallenges[slot] = null;
                    // profile.UploadedActivities.push(activity[list].id);  multiple activity upload prevention TBD
                    props.updateProfile(profile);
                }
            }
        }
        props.showMessageModal(output);
        props.toggleActivityModal();
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
        let isComplete = null;
        isComplete = passFailTargetGeojson(activity.map.summary_polyline, trackedChallenge);
        if (isComplete) {
            isComplete = passFailMetric(activity.distance, trackedChallenge.Distance, isComplete);
            isComplete = passFailMetric(activity.average_speed, trackedChallenge.AverageSpeed, isComplete);
            isComplete = passFailMetric(activity.max_speed, trackedChallenge.MaxSpeed, isComplete);
            isComplete = passFailMetric(activity.moving_time, trackedChallenge.MovingTime, isComplete);
            isComplete = passFailMetric(activity.total_elevation_gain, trackedChallenge.Elevation, isComplete);
        }
        return isComplete;
    }

    function passFailMetric(metric, target, isComplete) {
        if (target > 0) {
            return metric >= target ? true : false;
        }
        else return isComplete;
    }

    function passFailTargetGeojson(polyline, trackedChallenge) {
        const lowLng = trackedChallenge.StartLng - 0.001;
        const highLng = trackedChallenge.StartLng + 0.001;
        const lowLat = trackedChallenge.StartLat - 0.001;
        const highLat = trackedChallenge.StartLat + 0.001;

        let geojson = Polyline.toGeoJSON(polyline);
        let route = geojson.coordinates.map((point) => {
            if (lowLng <= point[0] && point[0] <= highLng) {
                if (lowLat <= point[1] && point[1] <= highLat) {
                    return true;
                }
            }
            return false;
        })

        // Check for target geojson hit.
        for (let hit = 0; hit < route.length; hit++) {
            if (route[hit] === true) {
                return true;
            }
        }
        return false;
    }

    function executeTTMetrics(segmentEfforts, trackedChallenge) {
        let currentTier = null;
        for (let list = 0; list < segmentEfforts.length; list++) {
            if (segmentEfforts[list].segment.id === trackedChallenge.SegmentId) {
                currentTier = passFailTimeMetric(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Bronze, tier.BRONZE, currentTier);
                currentTier = passFailTimeMetric(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Silver, tier.SILVER, currentTier);
                currentTier = passFailTimeMetric(segmentEfforts[list].moving_time, trackedChallenge.TargetTime.Gold, tier.GOLD, currentTier);
            }
        }
        return currentTier;
    }

    function passFailTimeMetric(metric, target, tier, currentTier) {
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
