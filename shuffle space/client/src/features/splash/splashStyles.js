import { makeStyles } from '@material-ui/core';


const splashStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    progressContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default splashStyles;