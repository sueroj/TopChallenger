// FocusView
// Purpose: Container for Profile and BadgeWindow.
// Export: dashboard
// --TBD-- 
// Eval lifting up to dashboard.
import React from 'react';
import Profile from './Profile';
import BadgeWindow from './BadgeWindow';

function FocusView(props) {

    return (
        <>
            <Profile {...props} />
            <BadgeWindow {...props} />
        </>
    );
}

export default FocusView;