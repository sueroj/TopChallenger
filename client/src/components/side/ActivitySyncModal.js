import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/ActivitySyncModal.css';
import fakeActivityReturn from '__tests__/fakeActivityReturn.json';


function ActivitySyncModal(props) {
    const [profile, setProfile] = useState(props.profile);
    const [isSynced, setIsSynced] = useState(false);
    const [output, setOutput] = useState("Syncronizing...");
    const [activitiesFound, setActivitiesFound] = useState(false);
    const [activityResult, setActivityResult] = useState([]); //Stopped here
    //dev only
    const activity = fakeActivityReturn;

    // getActivities(profile);


    
    useEffect(() => {
         

        // if (!isSynced)
        // {
        //     const sync = getActivities(); // delay for test, dev only
        //     if (sync === true)
        //     {
        //         setIsSynced(true);
        //     }
        // }
        
    }, []
  );

  //-------------------
  // Activity check algorithm here. Each challenge type to be organized to
  // skip redundant checks. Ex. A speed challenge should only have its speed checked
  // elevation should be skipped. Only Milestones checked vs milestones, etc.
  // Also include check to see if challenges are tracked before running sync algo
  //---------------

  function getActivities(profile) {
    let allActivities = [];
    // let d = Math.floor(Date.now() / 1000);
    // const beforeDate = d.valueOf();
    // const afterDate = d.valueOf() - 604800;
    // axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
    //   headers: {Authorization: `Bearer ${user.access_token}`},
    //   params: {
    //     before: beforeDate,
    //     after: afterDate
    //   }
    // })
    // .then((response) => { 
    //   console.log(response.data);
    //   return true;
    // })
    // .catch ((e) => {
    //   console.log("Could not connect to server:", e);
    //   setOutput("Could not Syncronize, "+ e);
    //   return false;
    // })
    allActivities = fakeActivityReturn;
    console.log(allActivities);

    // Check for every activity within last 7 days.
    
    if (allActivities.length > 0) {
        
        for (let list=0;list<allActivities.length;list++)
        {
            // Check activities vs. tracked challenges.
            for(let slot=0;slot<profile.Tracked.length;slot++)
            {
                if (profile.Tracked[slot] !== null){ // Execute for only tracked challenges
                    // Check For earned Milestone Challenges (not Manual and not Flagged)
                    if(profile.Tracked[slot].Type === 0 && allActivities[list].manual !== true && allActivities[list].flagged !== true) {
                        let isComplete = null;

                        console.log("isComplete: "+isComplete);
                        isComplete = passFailMetric(allActivities[list].distance, profile.Tracked[slot].Distance, isComplete);
                        isComplete = passFailMetric(allActivities[list].average_speed, profile.Tracked[slot].AverageSpeed, isComplete);
                        isComplete = passFailMetric(allActivities[list].max_speed, profile.Tracked[slot].MaxSpeed, isComplete);
                        isComplete = passFailMetric(allActivities[list].moving_time, profile.Tracked[slot].MovingTime, isComplete);
                        isComplete = passFailMetric(allActivities[list].total_elevation_gain, profile.Tracked[slot].Elevation, isComplete);
                        console.log("isComplete.after: "+isComplete);

                        // Activity successfully meets criteria, remove challenge from tracked list and
                        // upload to server
                        if (isComplete === true) {
                            profile.Tracked[slot] = null;
                            setActivityResult("PASS");
                            // profile.Award[0] = profile.Tracked[y];

                            fetch((`http://localhost:4000/api/topchallenger/award/${profile.Id}`), { 
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(profile)
                              })
                              .then(response => { if (!response.ok) {
                                     throw new Error('Network response was not ok');}  
                                     return response })
                              .catch(error => {
                                console.error('Server Error:', error);
                              });

                        }
                        setActivityResult("FAIL");
                        // failed challenge output here?
                        
                    }
                }
            }
        }


        console.log("sync track");
        return profile;
    } else {
        console.log("skip track")
        return profile;
    }

  }

//   function handleModal() {
//     toggleModal(!viewModal);
//   }

    function passFailMetric(metric, target, isComplete) {
        if (target > 0) {
            console.log("passfail()")
            return metric >= target ? true : false;
        }
        else return isComplete;
    }

    // function activitiesFound() {

    // }

    return(
        <div className="badge-list-wrapper">
            <Modal className="badge-modal"
                {...props}
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

                {activity !== null ? <ul>{(activity.map(activity => {
                    return <li> {activityResult} {activity.name} {activity.start_date}</li>
                }))}</ul>
                : null }



                    {/* <span> { isSynced ? "Syncronization Complete" : output } </span> */}
                </Modal.Body>
                <Modal.Footer className="activity-sync-modal-footer">
                    <Button variant="success" className="activity-sync-modal-button" onClick={() => getActivities(profile)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );   
}  


export default ActivitySyncModal;









