// SyncButton
// Purpose: Initiates Strava login process. Redirects user to Strava Oauth for token.
// Export: Login
// --TBD-- 
// Eval refactor and lift up to Login component.
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { CLIENT_ID, REDIRECT_URI } from '../../api/config.json';

function apiAuth() {
  try {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read&state=newauth`;
  }
  catch (e) {
  }
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function SyncButton(props) {
  const [isLoading, setLoading] = useState(false);
  const api = props.api;

  useEffect(() => {
    if (isLoading) {
      apiAuth().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading, api]);

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