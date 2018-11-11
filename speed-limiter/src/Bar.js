import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


function Bar() {
    return (
        <AppBar position="static">
            <Toolbar >
                <h1 className='center'>SpeedMaster</h1>
            </Toolbar>
        </AppBar>
    );
}

export default Bar;
