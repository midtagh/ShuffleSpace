import { useDispatch, useSelector } from 'react-redux';
import { authenticationSelector, isAuthenticated, getUserDataAction } from './features/authentication/authenticationSlice';
import { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import SignIn from './features/authentication/SignIn';
import Splash from './features/splash/Splash';
import MainPage from './features/mainPage/MainPage';
import './app.css'
import {scanBarcodeAction, getCustomerProjectsAction, projectSelector} from "./features/mainPage/projectSlice";

const App = ({api}) => {
    const dispatch = useDispatch();

    const auth = useSelector(authenticationSelector);
    const {user, initialLoadingDone} = auth;

    const projectsState = useSelector(projectSelector);
    const {customers, error} = projectsState;


    const {getUserData, getAllUsersProjects, scanBarcode} = api;

    const scanBarcodeDispatcher = (projectId) => {
        dispatch(scanBarcodeAction({
            scanBarcode,
            projectId
        }));
    }

    useEffect(() => {
        dispatch(getUserDataAction({getUserData}));
    }, []);

    useEffect(() => {
        if (!user) return;
        dispatch(getCustomerProjectsAction({getAllUsersProjects}))
    }, [user]);

    return (
        <CssBaseline>
            {
                initialLoadingDone ?
                    isAuthenticated(user) ?
                        (
                            <MainPage
                                api={api}
                                customers={customers}
                                scanBarcodeFunction={scanBarcodeDispatcher}
                                user={user}
                            />
                        ) :
                        (
                            <SignIn
                                signIn={api.signIn}
                            />
                        ) :
                    (
                        <Splash/>
                    )
            }
        </CssBaseline>
    );
}

export default App;
