import React from 'react'
import MuiAlert from '@mui/material/Alert';

const AlertRef = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert {...props} elevation={6} ref={ref} variant="filled"  />;
});

export const Alert = ({ severity, message }) => {
    return (
        <AlertRef severity={severity}>{message}</AlertRef>
    )
}

