import React from 'react';
import SyncButton from './SyncButton';

class Login extends React.Component{



    render() {
        return (
            <form>
                <label>Click to Start</label>
                <SyncButton />
            </form>
        );
    }
}

export default Login;
