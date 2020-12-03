import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import dentista from '../assets/dentista.jpg';
import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Swal from 'sweetalert2';
import Api from '../api/Index';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${dentista})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        backgroundColor: 'rgb(0,0,0,0.4)'
    },
    btnLogin: {
        marginTop: '10px',
        width: '50%'
    },

    titleForm: {
        fontSize: '20px',
        color: '#ffffff'
    },
    inputProps: {
        color: '#ffffff!important'
    },

    inputLabelPropsEmail: {
        color: '#ffffff!important'
    },

    inputLabelPropsPassword: {
        color: '#ffffff!important'
    },

    textField: {
        '& label.Mui-focused': {
            color: '#ffffff!important'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff!important'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#ffffff!important',
        }
    }
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [valuesLogin, setValuesLogin] = useState({
        cpf: '',
        senha: ''
    });

    function handleClickShowPasswordLogin() {
        setShowPasswordLogin(!showPasswordLogin);
    }

    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    function handleChangeLogin(event) {
        setValuesLogin({ ...valuesLogin, [event.target.name]: event.target.value });
    }

    function handleSubimtLogin(event) {
        event.preventDefault();
        Api.post('/usuario/login', valuesLogin)
            .then(resp => {
                history.push('/usuario');
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Usuário não encontrado!',
                    'error'
                );
            });
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.formContainer}>
                <form onSubmit={handleSubimtLogin}>
                    <Typography className={classes.titleForm}>Login</Typography>
                    <TextField
                        className={classes.textField}
                        label='Cpf'
                        name='cpf'
                        type='number'
                        required
                        value={valuesLogin.cpf}
                        onChange={handleChangeLogin}
                        InputProps={{
                            className: classes.inputProps
                        }}
                        InputLabelProps={{
                            className: classes.inputLabelPropsEmail
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Senha'
                        name='senha'
                        required
                        value={valuesLogin.senha}
                        onChange={handleChangeLogin}
                        type={showPasswordLogin ? 'text' : 'password'}
                        InputLabelProps={{
                            className: classes.inputLabelPropsPassword
                        }}
                        InputProps={{
                            className: classes.inputProps,
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        className={classes.inputProps}
                                        onClick={handleClickShowPasswordLogin}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPasswordLogin ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        color='primary'
                        className={classes.btnLogin}
                        type='submit'
                    >
                        Entrar
                </Button>
                </form>
            </Box>
        </Box>
    );
}