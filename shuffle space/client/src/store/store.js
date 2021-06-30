import { applyMiddleware, combineReducers, createStore } from 'redux';
import authenticationReducer from '../features/authentication/authenticationSlice';
import projectReducer from '../features/mainPage/projectSlice'
import middlewares from '../middlewares';

export const rootReducer = combineReducers({
    auth: authenticationReducer,
    projects: projectReducer
});

export default createStore(rootReducer, applyMiddleware(...middlewares))