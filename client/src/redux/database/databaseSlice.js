import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    loading: false,
    changing: false,
    databaseUrl: null,
    currentItems: null,
    updatedItems: null,
    search: null,
    currentPage: 1,
    total: null,
    lastCheck: null,
}

const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        requestSuccess: (state) => {
			state.loading = false;
			state.error = null;
        },
		requestFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
        getItemsSuccess: (state, action) => {
            state.currentItems = action.payload;
			state.loading = false;
			state.error = null;
        },
        getUpdatedSuccess: (state, action) => {
            state.updatedItems = action.payload;
			state.loading = false;
			state.error = null;
        },
        changingStart: (state) => {
            state.changing = true;
            state.error = null;
        },
        changeStringSuccess: (state) => {
			state.changing = false;
			state.error = null;
        },
        changeStringFailure: (state, action) => {
			state.error = action.payload;
			state.changing = false;
        },
        updateLastCheck: (state, action) => {
            state.lastCheck = action.payload;
        },
    },
});

export const { 
    requestStart, 
    requestSuccess, 
    requestFailure, 
    getItemsSuccess,
    getUpdatedSuccess,
    changingStart,
    changeStringSuccess,
    changeStringFailure,
    updateLastCheck
} = databaseSlice.actions;

export default databaseSlice.reducer;