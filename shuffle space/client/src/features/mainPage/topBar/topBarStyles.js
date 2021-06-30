import { makeStyles } from '@material-ui/core';


const topBarStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default topBarStyles;