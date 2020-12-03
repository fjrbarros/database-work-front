import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    containerCenter: {
        position: 'relative',
        margin: '0 auto',
        height: '100%',
        maxWidth: '700px',
        backgroundColor: '#ffffff',
        borderRadius: '10px'
    }
}));

export default function ContainerCenter(props) {
    const classes = useStyles();
    return (
        <Box className={classes.containerCenter}>
            {props.children}
        </Box>
    );
}