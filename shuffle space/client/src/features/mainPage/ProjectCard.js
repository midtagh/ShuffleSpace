import {Box, Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";


const CustomerProjectCards = ({user, customer, scanBarcodeFunction}) => {
    const useStyles = makeStyles((theme) => ({
        customerTitle: {
            flexGrow: 1,
        },
        root: {
            minWidth: 275,
            width:300,
            marginBottom: 20
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        box: {
            borderBottom: '1px solid black'
        }
    }));

    const classes = useStyles();

    const clickHandler = projectId => {
        scanBarcodeFunction(projectId);
    }

    return (
        <Box
        className={classes.box}>
            <Typography variant='h3' className={classes.customerTitle}>
                {customer.name}
            </Typography>
            <Typography variant='h6' className={classes.customerTitle}>
                {
                    `total duration: ${Math.floor(customer.projects.reduce((acc, cur) => acc + cur.duration, 0) / (1000))} seconds`
                }
            </Typography>
            {customer.projects.map((p,index) =>
                <Card className={classes.root} key={index}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        </Typography>
                        <Typography variant="h5">
                            {p.title}
                        </Typography>
                        <Typography variant="body1">
                            {`status: ${!p.timeShifts.filter(x => x.workerId === user.id).every(x=> !x.isActive) ?  'active' : 'inactive'}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="small" onClick={e => clickHandler(p.id)}>Scan Barcode</Button>
                    </CardActions>
                </Card>
            )}
        </Box>
    )
}

export default CustomerProjectCards;