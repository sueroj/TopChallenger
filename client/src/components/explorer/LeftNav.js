// SideView
// Purpose: Container for all side windows.
// Export: dashboard
import React from 'react';
import Filters from 'components/explorer/Filters';
import Nearby from 'components/explorer/Nearby';

function LeftNav(props) {

    return( 
            <>
            <Filters className="side-view" updateFilters={props.updateFilters}/>
            <Nearby className="side-view" {...props}/>
            </>
        ); 
    }  

export default LeftNav;