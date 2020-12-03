import React, { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
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

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.background,
        position: 'absolute',
        height: '100%',
        width: '100%'
    },

    containerCenter: {
        position: 'relative',
        margin: '0 auto',
        height: '100%',
        maxWidth: '700px',
        backgroundColor: '#ffffff',
        borderRadius: '10px'
    },

    containerHeader: {
        backgroundColor: '#6b6b6b',
        padding: '15px',
        textAlign: 'center',
        '& p': {
            color: '#ffffff',
            fontSize: '17px'
        }
    },

    contentInput: {
        display: 'flex'
    },

    textField: {
        margin: '10px 10px 0px'
    },

    contentButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

    btnSalvar: {
        margin: '10px',
        width: '100px'
    }
}));

export default function Usuario() {
    const classes = useStyles();
    const [dadosUsuario, setDadosUsuario] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const colunsHeader = ['Código', 'Nome', 'Cpf', 'Data nascimento', 'Telefone', 'Editar', 'Excluir'];
    const [ruas, setRuas] = useState([]);
    const [values, setValues] = useState({
        idUsuario: null,
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        senha: '',
        tipoUsuario: '',
        rua: {
            idRua: null
        }
    });

    useEffect(() => {
        getRuas();
        getUsuarios();
    }, []);

    function getRuas() {
        Api.get('/rua/recuperaTodos')
            .then(resp => {
                setRuas(resp.data);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao listar ruas!',
                    'error'
                );
            });
    }

    function getUsuarios() {
        Api.get('/usuario/recuperaTodos')
            .then(resp => {
                atualizaLista(resp.data);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao listar usuários!',
                    'error'
                );
            });
    }

    function handleChange(event) {
        if (event.target.name === 'rua') {
            setValues({ ...values, rua: { idRua: event.target.value } });
            return;
        }
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function hadleSubmit(event) {
        event.preventDefault();
        salvarUsuario();
    }

    function salvarUsuario() {
        const data = values.dataNascimento.split('-');
        const ano = data[0];
        const mes = data[1];
        const dia = data[2];
        const novaData = `${('0' + dia).slice(-2)}/${('0' + mes).slice(-2)}/${ano}`;
        values.dataNascimento = novaData;
        Api.post('/usuario/cadastro', values)
            .then(resp => {
                toaster.notify('Dados salvos com sucesso!', { duration: 2000 });
                resetValues();
                atualizaLista([resp.data], values.idUsuario);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao salvar novo funcionário!',
                    'error'
                );
            });
    }

    function atualizaLista(data, idEdit) {
        if (!data.length) {
            setDadosUsuario([]);
            return;
        }

        var newArray = dadosUsuario.slice();

        if (idEdit) {
            newArray = newArray.filter(item => item.idUsuario !== idEdit);
        }

        data.forEach(item => {
            item.Editar = true
            item.Excluir = true
            newArray.push(item);
        });

        setDadosUsuario(newArray);
    }

    function resetValues() {
        setValues({
            nome: '',
            cpf: '',
            dataNascimento: '',
            telefone: '',
            senha: '',
            tipoUsuario: '',
            rua: { idRua: null }
        });
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    function handleClickExcluir(event, dados) {
        executaQuestionamento(() => removeUsuario(dados));
    }

    function removeUsuarioEspecifico(id) {
        const newArray = dadosUsuario.filter(item => item.idUsuario !== id);
        setDadosUsuario(newArray);
    }

    function removeUsuario(dados) {
        Api.delete(`/usuario/delete/${dados.idUsuario}`)
            .then(() => {
                toaster.notify('Funcionário removido com sucesso!', { duration: 2000 });
                removeUsuarioEspecifico(dados.idUsuario);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao excluir funcionário!',
                    'error'
                );
            })
    }

    function handleClickEditar(event, dados) {
        const data = dados.dataNascimento.split('/');
        const dia = data[0];
        const mes = data[1];
        const ano = data[2];
        const novaData = `${ano}-${('0' + mes).slice(-2)}-${('0' + dia).slice(-2)}`;

        setValues({
            nome: dados.nome,
            cpf: dados.cpf,
            dataNascimento: novaData,
            telefone: dados.telefone,
            tipoUsuario: dados.tipoUsuario,
            idUsuario: dados.idUsuario,
            rua: { idRua: dados.rua.idRua }
        });
    }

    function executaQuestionamento(cbYes) {
        Swal.fire({
            title: 'Exclusão',
            text: 'Confirma a exclusão?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!'
        }).then(result => {
            if (result.isConfirmed) cbYes();
        });
    }

    return (
        <ContainerDefault>
            <ContainerCenter>
                <Box className={classes.containerHeader}>
                    <Typography>Funcionários</Typography>
                </Box>
                <form onSubmit={hadleSubmit}>
                    <Box className={classes.contentInput}>
                        <TextField
                            className={classes.textField}
                            label='Nome'
                            required
                            name='nome'
                            onChange={handleChange}
                            value={values.nome}
                        />
                        <TextField
                            className={classes.textField}
                            label='Cpf'
                            type='number'
                            required
                            name='cpf'
                            onChange={handleChange}
                            value={values.cpf}
                        />
                    </Box>
                    <Box className={classes.contentInput}>
                        <TextField
                            className={classes.textField}
                            label='Data nascimento'
                            type='date'

                            required
                            name='dataNascimento'
                            onChange={handleChange}
                            value={values.dataNascimento}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label='Telefone'
                            type='number'
                            required
                            name='telefone'
                            onChange={handleChange}
                            value={values.telefone}
                        />
                    </Box>
                    <Box className={classes.contentInput}>
                        <FormControl
                            className={classes.textField}
                            variant='filled'
                            fullWidth
                            required
                        >
                            <InputLabel>Função</InputLabel>
                            <Select
                                name='tipoUsuario'
                                value={values.tipoUsuario}
                                onChange={handleChange}
                            >
                                <MenuItem value={'D'}>Dentista</MenuItem>
                                <MenuItem value={'R'}>Recepcionista</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label='Senha'
                            name='senha'
                            required
                            value={values.senha}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box className={classes.contentInput}>
                        <FormControl
                            className={classes.textField}
                            variant='filled'
                            fullWidth
                            required
                        >
                            <InputLabel>Rua</InputLabel>
                            <Select
                                name='rua'
                                value={values.rua.idRua}
                                onChange={handleChange}
                            >
                                {
                                    ruas.map(item => {
                                        return <MenuItem value={item.idRua}>{item.idRua} - {item.nome}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={classes.contentButton}>
                        <Button color='primary'
                            className={classes.btnSalvar}
                            startIcon={<SaveIcon />}
                            type='submit'
                        >
                            Salvar
                    </Button>
                    </Box>
                </form>
                <MaterialTable
                    colunsHeader={colunsHeader}
                    data={dadosUsuario}
                    type='USUARIO'
                    onClickExcluir={handleClickExcluir}
                    onClickEditar={handleClickEditar}
                />
            </ContainerCenter>
        </ContainerDefault>
    )
}