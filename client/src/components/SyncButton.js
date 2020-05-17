import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { CLIENT_ID, REDIRECT_URI } from '../api/config.json';

function syncRequest() {
    console.log("Redirecting..."); //dev only
    try{
      window.location.href = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=read&state=newauth`;
    }
    catch(e){
      console.log(e); //dev only
    }
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  
  function SyncButton() {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      if (isLoading) {
        syncRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoading(true);
  
    return (
      <Button
        variant="warning"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Syncronizing...' : 'Sync'}
      </Button>
    );
  }

export default SyncButton;