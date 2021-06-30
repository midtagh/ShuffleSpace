import { makeStyles } from "@material-ui/core";


const signInStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        marginBottom: theme.spacing(2)
    }
}));

export default signInStyles;