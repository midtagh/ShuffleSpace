import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import topBarStyles from './topBarStyles';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationSelector, signOutAction } from '../../authentication/authenticationSlice';

const TopBar = ({signOut}) => {
    const classes = topBarStyles();
    const dispatch = useDispatch();

    const auth = useSelector(authenticationSelector);
    const { user } = auth;

    const clickHandler = e => {
        dispatch(signOutAction({signOut}));
    };

    if (!user) {
        return (
            <span role='status'>
                signed out
            </span>
        );
    }

    return (
        <AppBar position='static' elevation={0}>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    Demo
                </Typography>
                <Button
                    color='inherit'
                    onClick={clickHandler}
                >
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    );
};



export default TopBar;