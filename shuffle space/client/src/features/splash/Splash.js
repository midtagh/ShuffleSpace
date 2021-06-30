import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import splashStyles from './splashStyles';

const Splash = () => {
    const classes = splashStyles();

    return (
        <Container component='div' maxWidth='xs' className={classes.container}>
            <div>
                <Typography
                    variant='h2'
                    component='div'
                    color='primary'
                >
                    <Box
                        textAlign='center'
                        mb={2}
                    >
                        Demo
                    </Box>
                </Typography>
                <div className={classes.progressContainer}>
                    <CircularProgress
                        color='secondary'
                    />
                </div>
            </div>
        </Container>
    );
};

export default Splash;