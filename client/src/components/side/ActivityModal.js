// ActivityModal
// Purpose: Get activities and submit for completion of challenges. Contains verification logic.
// Export: Challenges
// --TBD-- 
// Implementation of completion login for all challengeTypes.
// Consider creation of new components to seperate logic.
// Refactor / Rebuild as necessary.
import Polyline from '@mapbox/polyline';
import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/ActivityModal.css';
import axios from 'axios';
import * as challengeType from 'common/challengeType.json';

function ActivityModal(props) {
    const [profile, setProfile] = useState(props.profile);
    const [allActivities, setAllActivities] = useState([]);
    const [numActivities, setNumActivities] = useState(0);
    const isSynced = props.isSynced;

  //-------------------
  // Activity check algorithm here. Each challenge type to be organized to
  // skip redundant checks. Ex. A speed challenge should only have its speed checked
  // elevation should be skipped. Only Milestones checked vs milestones, etc.
  // Also include check to see if challenges are tracked before running sync algo
  //---------------

  function getActivities() {
    if (isSynced === false){
        let d = Math.floor(Date.now() / 1000);
        const beforeDate = d.valueOf();
        const afterDate = d.valueOf() - 604800;
        axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
          headers: {Authorization: `Bearer ${props.user.access_token}`},
          params: {
            before: beforeDate,
            after: afterDate
          }
        })
        .then((response) => { 
          setAllActivities(checkIfQualifies(response.data));
          setNumActivities(response.data.length);
          props.setSync(true);
          return true;
        })
        .catch ((e) => {
          console.log("Could not connect to server:", e);
          return false;
        })
    }
   }

    // Check for every activity within last 7 days.
    function submitActivities(allActivities, profile) {
        let output = [];
        for (let list=0;list<allActivities.length;list++)
        {
            // Check activities vs. tracked challenges.
            for(let slot=0;slot<profile.TrackedChallenges.length;slot++)
            {
                if (profile.TrackedChallenges[slot]) {
                    let isComplete = null;

                    switch (profile.TrackedChallenges[slot].Type) {
                        case challengeType.MILESTONE:
                            isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                            break;
                        case challengeType.EXPLORATION:
                            isComplete = executeExplorationMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                            break;
                        case challengeType.TIMETRIAL:
                            // 
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
                        profile.Completed.push(profile.TrackedChallenges[slot]);
                        output += (profile.TrackedChallenges[slot].Name + " completed.");
                        profile.TotalCompleted = profile.Completed.length;
                        profile.TrackedChallenges[slot] = null;
                        profile.UploadedActivities.push(allActivities[list].id);                         
                        props.updateProfile(profile);
                    }          
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

    function checkIfQualifies(activityList) {
        let newActivityList = [];
        activityList.forEach((activity) => {
            if (activity.manual !== true && activity.flagged !== true) {
                newActivityList.push(activity);
            }
        })
        return newActivityList;
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
        for (let hit=0;hit<route.length;hit++) {
            if (route[hit] === true) {
                return true;
            }
        }
        return false;
    }

    return(
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
                    { numActivities ? <Button variant="success" className="activity-sync-modal-button" onClick={() => submitActivities(allActivities, profile)}>OK</Button>
                        : <Button variant="danger" className="activity-sync-modal-button">No Activities Found :(</Button>}     
                </Modal.Footer>
            </Modal>
    );   
}

function DisplayActivities(props){
    return (
        <div>
        { props.allActivities ? <ul>{(props.allActivities.map(activity => {
            return <li> {activity.name} {activity.start_date}</li>
        }))}</ul>
        : null }  
        </div>
    );
}

export default ActivityModal;
