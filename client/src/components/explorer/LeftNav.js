// SideView
// Purpose: Container for all side windows.
// Export: dashboard
import React from 'react';
import Filters from 'components/explorer/Filters';
import Nearby from 'components/explorer/Nearby';

function SideView(props) {

    return( 
            <>
            <Filters className="side-view" {...props}/>
            <Nearby className="side-view" {...props}/>
            </>
        ); 
    }  

export default SideView;