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

export default function Cidade() {
    const classes = useStyles();
    const colunsHeader = ['Código', 'Nome', 'Editar', 'Excluir'];
    const [dadosBairro, setDadosBairro] = useState([]);
    const [dadosCidade, setDadosCidade] = useState([]);
    const [values, setValues] = useState({
        idBairro: null,
        nome: '',
        cidade: {
            idCidade: null
        }
    });

    function handleChange(event) {
        if (event.target.name === 'cidade') {
            setValues({ ...values, cidade: { idCidade: event.target.value } });
            return;
        }

        setValues({ ...values, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        getBairros();
        getCidades();
    }, []);

    function resetValues() {
        setValues({
            idBairro: null,
            nome: '',
            cidade: {
                idCidade: null
            }
        })
    }

    function atualizaLista(data) {
        if (!data.length) {
            setDadosBairro([]);
            return;
        }

        var newArray = dadosBairro.slice();

        if (values.idBairro) {
            newArray = newArray.filter(item => item.idBairro !== values.idBairro);
        }

        data.forEach(item => {
            item.Editar = true
            item.Excluir = true
            newArray.push(item);
        });

        setDadosBairro(newArray);
    }

    function getCidades() {
        Api.get('/cidade/recuperaTodos')
            .then(resp => {
                setDadosCidade(resp.data);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao listar usuários!',
                    'error'
                );
            });
    }

    function getBairros() {
        Api.get('/bairro/recuperaTodos')
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

    function handleClickExcluir(event, dados) {
        executaQuestionamento(() => removeBairro(dados));
    }

    function removeBairro(dados) {
        Api.delete(`/cidade/delete/${dados.idCidade}`)
            .then(() => {
                toaster.notify('Cidade removida com sucesso!', { duration: 2000 });
                removeBairroEspecifica(dados.idCidade);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao excluir cidade!',
                    'error'
                );
            });
    }

    function removeBairroEspecifica(id) {
        const newArray = dadosBairro.filter(item => item.idCidade !== id);
        setDadosBairro(newArray);
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

    function handleClickEditar(event, dados) {
        setValues({
            idBairro: dados.idBairro,
            nome: dados.nome,
            cidade: {
                idCidade: null
            }
        });
    }

    function hadleSubmit(event) {
        event.preventDefault();
        salvarBairro();
    }

    function salvarBairro() {
        Api.post('/cidade/cadastro', values)
            .then(resp => {
                toaster.notify('Dados salvos com sucesso!', { duration: 2000 });
                resetValues();
                atualizaLista([resp.data]);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao salvar nova cidade!',
                    'error'
                );
            });
    }

    return (
        <ContainerDefault>
            <ContainerCenter>
                <Box className={classes.containerHeader}>
                    <Typography>Cidades</Typography>
                </Box>
                <form onSubmit={hadleSubmit}>
                    <Box className={classes.contentInput}>
                        <TextField
                            className={classes.textField}
                            label='Bairro'
                            required
                            name='nome'
                            onChange={handleChange}
                            value={values.nome}
                        />
                        <FormControl
                            className={classes.textField}
                            variant='filled'
                            fullWidth
                            required
                        >
                            <InputLabel>Cidade</InputLabel>
                            <Select
                                name='cidade'
                                value={values.idCidade}
                                onChange={handleChange}
                            >
                                {
                                    dadosCidade.map(item => {
                                        return <MenuItem value={item.idCidade}>{item.idCidade} - {item.nome}</MenuItem>
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
                    data={dadosBairro}
                    type='BAIRRO'
                    onClickExcluir={handleClickExcluir}
                    onClickEditar={handleClickEditar}
                />
            </ContainerCenter>
        </ContainerDefault>
    )
}