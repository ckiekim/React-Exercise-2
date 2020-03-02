import { fade } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    paper: {
        marginLeft: 15,
        marginRight: 15
    },
    progress: {
        margin: theme.spacing(2)
    },
    menu: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    tableHead: {
        fontSize: '1.0rem'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
            width: 200,
            },
        },
    },
});

export default styles;