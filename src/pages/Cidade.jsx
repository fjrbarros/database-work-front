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
    const colunsHeader = ['Código', 'Nome', 'UF', 'Editar', 'Excluir'];
    const [arrayUf, setArrayUf] = useState([]);
    const [dadosCidade, setDadosCidade] = useState([]);
    const [values, setValues] = useState({
        idCidade: null,
        nome: '',
        uf: ''
    });

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        getUfs();
        getCidades();
    }, []);

    function getUfs() {
        Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(resp => setArrayUf(resp.data))
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao buscar UFs!',
                    'error'
                );
            })
    }

    function resetValues() {
        setValues({
            nome: '',
            uf: ''
        })
    }

    function atualizaLista(data) {
        if (!data.length) {
            setDadosCidade([]);
            return;
        }

        var newArray = dadosCidade.slice();

        if (values.idCidade) {
            newArray = newArray.filter(item => item.idCidade !== values.idCidade);
        }

        data.forEach(item => {
            item.Editar = true
            item.Excluir = true
            newArray.push(item);
        });

        setDadosCidade(newArray);
    }

    function getCidades() {
        Api.get('/cidade/recuperaTodos')
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
        executaQuestionamento(() => removeCidade(dados));
    }

    function removeCidade(dados) {
        Api.delete(`/cidade/delete/${dados.idCidade}`)
            .then(() => {
                toaster.notify('Cidade removida com sucesso!', { duration: 2000 });
                removeCidadeEspecifica(dados.idCidade);
            })
            .catch(() => {
                Swal.fire(
                    'Erro!',
                    'Erro ao excluir cidade!',
                    'error'
                );
            });
    }

    function removeCidadeEspecifica(id) {
        const newArray = dadosCidade.filter(item => item.idCidade !== id);
        setDadosCidade(newArray);
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
            idCidade: dados.idCidade,
            nome: dados.nome,
            uf: dados.uf
        });
    }

    function hadleSubmit(event) {
        event.preventDefault();
        salvarCidade();
    }

    function salvarCidade() {
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
                            label='Cidade'
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
                            <InputLabel>UF</InputLabel>
                            <Select
                                name='uf'
                                value={values.uf}
                                onChange={handleChange}
                            >
                                {
                                    arrayUf.map(item => {
                                        return <MenuItem value={item.sigla}>{item.sigla} - {item.nome}</MenuItem>
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
                    data={dadosCidade}
                    type='CIDADE'
                    onClickExcluir={handleClickExcluir}
                    onClickEditar={handleClickEditar}
                />
            </ContainerCenter>
        </ContainerDefault>
    )
}