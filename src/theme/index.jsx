import { createMuiTheme } from '@material-ui/core';

const mui = createMuiTheme({
    props: {
        MuiTextField: {
            variant: 'filled',
            margin: 'normal',
            fullWidth: true,
        },
        MuiButton: {
            variant: 'contained'
        }
    },
    typography: {
        h1: {
            fontSize: 28
        },
        h2: {
            fontSize: 24
        },
        h3: {
            fontSize: 16,
            lineHeight: 1.4
        },
        subtitle1: {
            fontSize: 14
        },
        body1: {
            fontSize: 14
        }
    }
});

export default {
    ...mui,
    palette: {
        ...mui.palette,
        background: {
            ...mui.palette.background,
            paper: '#fafafa',
            default: '#f4f4f4'
        }
    },
    appDrawer: {
        width: 240,
        borderColor: '#e0e0e0'
    },
    appHeader: {
        toolbar: {
            background: '#ffffff',
            foreground: mui.palette.text.primary,
            height: 60
        }
    },
    errorList: {
        border: '1px solid #e0e0e0',
        background: '#fff',
        color: mui.palette.error.main,
        borderRadius: '5px',
        marginTop: '10px'
    },
    errorListItem: {
        paddingTop: '2px',
        paddingBottom: '2px'
    },
    defaultColor: {
        color: '#6200ee'
    }
};