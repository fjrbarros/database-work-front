import React from 'react';
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    containerDefault: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        padding: '5px'
    }
}));

export default function ContainerDefault(props) {
    const classes = useStyles();
    return (
        <Box className={classes.containerDefault}>
            {props.children}
        </Box>
    );
}