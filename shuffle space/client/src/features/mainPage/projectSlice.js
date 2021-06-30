import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCustomerProjectsAction = createAsyncThunk(
    'project/getCustomerProjects',
    async ({getAllUsersProjects}) => {
        try {
            return await getAllUsersProjects();
        } catch (e) {
            throw e;
        }
    }
);

export const scanBarcodeAction = createAsyncThunk(
    'project/scanBarcode',
    async ({scanBarcode, projectId}) => {
        try {
            return await scanBarcode(projectId);
        } catch (e) {
            throw e;
        }
    }
);

const initialState = {
    customers: null,
    error: null
};

const projectSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCustomerProjectsAction.fulfilled, (state, {payload}) => {
            return {
                ...state,
                customers: payload
            };
        });

        builder.addCase(getCustomerProjectsAction.rejected, (state, {error}) => {
            return {
                ...state,
                error: error.message
            };
        });

        builder.addCase(scanBarcodeAction.fulfilled, (state, {payload}) => {
            const userId = payload.userId;
            const customerIndex = state.customers.findIndex(c => c.id === userId);

            const projectIndex = state.customers[customerIndex].projects.findIndex(p => p.id === payload.id);

            state.customers[customerIndex].projects[projectIndex] = payload;

            return state;
        });

        builder.addCase(scanBarcodeAction.rejected, (state, {error}) => {
            return {
                ...state,
                error: error.message
            };
        });

    }
})

export default projectSlice.reducer;

export const projectSelector = state => state.projects;

