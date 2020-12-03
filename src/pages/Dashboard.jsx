import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { ContainerDefault, ContainerCenter } from '../components/Index';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

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

    gridElement: {
        backgroundColor: '#8a8989',
        padding: '20px',
        borderRadius: '10px',
        margin: '5px',
        color: '#fff',
        border: '1px solid #fff',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textDecoration: 'none',
        textAlign: 'center',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            backgroundColor: '#6b6b6b'
        }
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
                    <Link to="/usuario" className={classes.gridElement}>
                        <Typography>Usuários</Typography>
                    </Link>
                    <Link to="/cidade" className={classes.gridElement}>
                        <Typography>Cidades</Typography>
                    </Link>
                    <Link to="/bairro" className={classes.gridElement}>
                        <Typography>Bairros</Typography>
                    </Link>
                </Box>
            </ContainerCenter>
        </ContainerDefault>
    )
}