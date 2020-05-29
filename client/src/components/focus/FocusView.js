import React from 'react';
import Profile from './Profile';
import BadgeWindow from './BadgeWindow';

function FocusView(props) {

    return(
            <><Profile {...props} />
            <BadgeWindow {...props}/></>
        ); 
}  

export default FocusView;