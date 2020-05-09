import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

function syncRequest() {
    window.location.href = "http://www.strava.com/oauth/authorize";
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