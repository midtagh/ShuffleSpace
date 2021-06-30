import TopBar from './topBar/TopBar';
import { Box, Grid } from '@material-ui/core';
import ProjectList from "./ProjectList";

const MainPage = ({api, customers, user, scanBarcodeFunction}) => {

    return (
        <Box>
            <Grid direction='column' container>
                <Grid item>
                    <TopBar
                        signOut={api.signOut}
                    />
                </Grid>
                <Grid item>
                    {
                        customers &&
                        <ProjectList
                            customers={customers}
                            scanBarcodeFunction={scanBarcodeFunction}
                            user={user}
                        />
                    }

                </Grid>
            </Grid>
        </Box>
    );
};


export default MainPage;