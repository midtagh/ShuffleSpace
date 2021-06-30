import {Button, Container, Grid, Link, TextField, Typography} from '@material-ui/core';
import signInStyles from './SignInStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { authenticationSelector, signInAction } from './authenticationSlice';



const SignIn = ({signIn}) => {
    const classes = signInStyles();
    const dispatch = useDispatch();

    const auth = useSelector(authenticationSelector);
    const { user, error } = auth;

    const [credentials, setCredentials] = useState(() => ({
        user: '',
        password: ''
    }));

    const onSubmit = e => {
        e.preventDefault();
        dispatch(signInAction({signIn, credentials}));
    };

    const onChange = e => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    if (user) {
        return (
            <span role='status'>
                {
                    `${user.user} signed in.`
                }
            </span>
        );
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.wrapper}>
                <Typography component='h1' variant='h5'>
                    Demo
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='user'
                        label='User'
                        autoFocus
                        type='text'
                        onChange={onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        id='password'
                        onChange={onChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        size='large'
                    >
                        Sign In
                    </Button>
                    <Typography
                        component='p'
                        variant='body1'
                        color='error'
                        className={classes.error}
                        role='signInError'
                    >
                        {
                            error
                        }
                    </Typography>
                </form>
            </div>
        </Container>
    );
};

export default SignIn;