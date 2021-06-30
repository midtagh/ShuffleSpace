import authenticationReducer,
{
    getUserDataAction,
    signInAction,
    signOutAction,
} from '../authenticationSlice';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import DevelopmentApi from '../../../config/DevelopmentApi';
const store = createStore(authenticationReducer, applyMiddleware(thunk));
const api = new DevelopmentApi();


test('initial get user to be null', async () => {
    expect(store.getState()).toEqual({
        user: null,
        error: null,
        initialLoadingDone: false
    });

    const getUserData = api.getUserData();

    await store.dispatch(getUserDataAction({getUserData}));
    expect(store.getState()).toEqual({
        user: null,
        error: null,
        initialLoadingDone: true
    });
});


test('sign in works properly', async () => {
    expect(store.getState()).toEqual({
        user: null,
        error: null,
        initialLoadingDone: true
    });

    const signIn = api.signIn;
    const credentials = {
        user: 'test@test.ca',
        pass: '1'
    };

    await store.dispatch(signInAction({signIn, credentials}));
    expect(store.getState().user).toEqual({
        user: 'test@test.ca',
        id: '1',
        name: 'some name'
    });
});

test('sign out works properly', async () => {
    expect(store.getState()).toEqual({
        user: {
            user: 'test@test.ca',
            id: '1',
            name: 'some name'
        },
        error: null,
        initialLoadingDone: true
    });

    const signOut = api.signOut;

    await store.dispatch(signOutAction({signOut}));
    expect(store.getState()).toEqual({
        user: null,
        error: null,
        initialLoadingDone: true
    });
});

test('sign in fails due to error', async () => {
    const store = createStore(authenticationReducer, applyMiddleware(thunk));

    const signIn = () => {
        return Promise.reject('wrong credentials');
    };
    const credentials = {
        user: 'test@test.ca',
        pass: '321'
    };

    await store.dispatch(signInAction({signIn, credentials}));

    expect(store.getState().user).toBe(null);
    expect(store.getState().error).toBe('wrong credentials');
});

