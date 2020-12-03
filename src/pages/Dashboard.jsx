import React, { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { ContainerDefault, ContainerCenter, MaterialTable } from '../components/Index';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Api from '../api/Index';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Swal from 'sweetalert2';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
    containerHeader: {
        backgroundColor: '#6b6b6b',
        padding: '15px',
        textAlign: 'center',
        '& p': {
            color: '#ffffff',
            fontSize: '17px'
        }
    },

    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'
    },

    gridContainerFit: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'
    },

    gridElement: {
        backgroundColor: 'deepPink',
        padding: '20px',
        color: '#fff',
        border: '1px solid #fff'
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <ContainerDefault>
            <ContainerCenter>
                <Box className={classes.containerHeader}>
                    <Typography>Dashboard</Typography>
                </Box>
                <Box className={classes.gridContainer}>
                    <Box className={classes.gridElement}>
        
                    </Box>
                    <Box className={classes.gridElement}>

                    </Box>
                    <Box className={classes.gridElement}>

                    </Box>
                    <Box className={classes.gridElement}>

                    </Box>
                </Box>
            </ContainerCenter>
        </ContainerDefault>
    )
}