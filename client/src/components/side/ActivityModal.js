import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/ActivityModal.css';
import fakeActivityReturn from '__tests__/fakeActivityReturn.json';

function ActivityModal(props) {
    const [profile, setProfile] = useState(props.profile);
    const [allActivities, setAllActivities] = useState([]);
    const [numActivities, setNumActivities] = useState(0);
    const [activityResults, setActivityResults] = useState(null);
    const isSynced = props.isSynced;

    const challengeType = {
        MILESTONE: 0,
        EXPLORATION: 1,
        TIMETRIAL: 2,
        ENDURANCE: 3,
    }
    //dev only
    // const activity = fakeActivityReturn;

    
    useEffect(() => {
        
    }, []
  );

  //-------------------
  // Activity check algorithm here. Each challenge type to be organized to
  // skip redundant checks. Ex. A speed challenge should only have its speed checked
  // elevation should be skipped. Only Milestones checked vs milestones, etc.
  // Also include check to see if challenges are tracked before running sync algo
  //---------------

  function getActivities() {
    if (isSynced === false){
    //     let d = Math.floor(Date.now() / 1000);
    //     const beforeDate = d.valueOf();
    //     const afterDate = d.valueOf() - 604800;
    //     axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
    //       headers: {Authorization: `Bearer ${props.user.access_token}`},
    //       params: {
    //         before: beforeDate,
    //         after: afterDate
    //       }
    //     })
    //     .then((response) => { 
    //       setAllActivities(response.data);
    //       return true;
    //     })
    //     .catch ((e) => {
    //       console.log("Could not connect to server:", e);
    //       return false;
    //     })
        setAllActivities(checkIfQualifies(fakeActivityReturn)); // test inj
        setNumActivities(fakeActivityReturn.length);
        props.setSync(true);
        console.log(allActivities);
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
                            // isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                            break;
                        case challengeType.TIMETRIAL:
                            // isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
                            break;
                        case challengeType.ENDURANCE:
                            // isComplete = executeMilestoneMetrics(allActivities[list], profile.TrackedChallenges[slot]);
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
            console.log("passfail()")
            return metric >= target ? true : false;
        }
        else return isComplete;
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

                {/* { activityResults ? <Results activityResults={activityResults} /> : <DisplayActivities allActivities={allActivities} /> } */}
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
