import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#6b6b6b',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    tableIcon: {
        fontSize: '25px',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.2)'
        }
    }
});

export default function MaterialTable(props) {
    const classes = useStyles();
    const { colunsHeader, data, type, onClickExcluir, onClickEditar } = props;

    function getRow(row) {
        switch (type) {
            case 'USUARIO':
                return <>
                    <StyledTableCell>{row.idUsuario}</StyledTableCell>
                    <StyledTableCell>{row.nome}</StyledTableCell>
                    <StyledTableCell>{row.cpf}</StyledTableCell>
                    <StyledTableCell>{row.dataNascimento}</StyledTableCell>
                    <StyledTableCell>{row.telefone}</StyledTableCell>
                    {row.Editar &&
                        <StyledTableCell align='center'>
                            {<EditIcon
                                className={classes.tableIcon}
                                onClick={event => onClickEditar(event, row)}
                            />}
                        </StyledTableCell>
                    }
                    {
                        row.Excluir &&
                        <StyledTableCell align='center'>
                            {<DeleteForeverIcon
                                className={classes.tableIcon}
                                onClick={event => onClickExcluir(event, row)}
                            />}
                        </StyledTableCell>
                    }
                </>
                 case 'CIDADE':
                    return <>
                        <StyledTableCell>{row.idCidade}</StyledTableCell>
                        <StyledTableCell>{row.nome}</StyledTableCell>
                        <StyledTableCell>{row.uf}</StyledTableCell>
                        {row.Editar &&
                            <StyledTableCell align='center'>
                                {<EditIcon
                                    className={classes.tableIcon}
                                    onClick={event => onClickEditar(event, row)}
                                />}
                            </StyledTableCell>
                        }
                        {
                            row.Excluir &&
                            <StyledTableCell align='center'>
                                {<DeleteForeverIcon
                                    className={classes.tableIcon}
                                    onClick={event => onClickExcluir(event, row)}
                                />}
                            </StyledTableCell>
                        }
                    </>
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            colunsHeader.map((item, index) => (
                                <StyledTableCell key={index} align={item === 'Editar'|| item === 'Excluir' ? 'center' : 'left'}>
                                    {item}
                                </StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row, index) => (
                            <StyledTableRow key={index}>
                                {
                                    getRow(row)
                                }
                            </StyledTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}