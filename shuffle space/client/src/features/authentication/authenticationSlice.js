import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const signInAction = createAsyncThunk(
    'users/signIn',
    async ({signIn, credentials}) => {
        try {
            const {user, password} = credentials;
            return await signIn(user, password);
        } catch (e) {
            throw e;
        }
    }
);

export const signOutAction = createAsyncThunk(
    'users/signOut',
    async ({signOut}) => {
        try {
            return await signOut();
        } catch (e) {
            throw e;
        }
    }
);

export const getUserDataAction = createAsyncThunk(
    'users/getUserData',
    async ({getUserData}) => {
        try {
            return await getUserData();
        } catch (e) {
            throw e;
        }
    }
);



const initialState = {
    user: null,
    error: null,
    initialLoadingDone: false
};

const authenticationSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signInAction.fulfilled, (state, {payload}) => {
            return {
                ...state,
                user: payload
            };
        });

        builder.addCase(signInAction.rejected, (state, {error}) => {
            return {
                ...state,
                error: error.message
            };
        });

        builder.addCase(signOutAction.fulfilled, (state, {payload}) => {
            return {
                ...state,
                user: null,
                error: null
            };
        });

        builder.addCase(signOutAction.rejected, (state, {error}) => {
            return state;
        });

        builder.addCase(getUserDataAction.fulfilled, (state, {payload}) => {
            return {
                ...state,
                user: payload,
                initialLoadingDone: true
            };
        });

        builder.addCase(getUserDataAction.rejected, (state, {error}) => {
            return {
                ...state,
                initialLoadingDone: true
            };
        });

    }
})

export default authenticationSlice.reducer;

export const authenticationSelector = state => state.auth;

export const isAuthenticated = user => user !== null;
