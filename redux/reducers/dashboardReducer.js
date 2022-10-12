import { createReducer } from "@reduxjs/toolkit";

export const dashboardListReducer = createReducer(
    {},
    {
        dashboardListRequest: (state) => {
            state.loading = true;
            state.dashboardList = [];
        },
        dashboardListSuccess: (state, action) => {
            state.loading = false;
            state.dashboardList = action.payload.data;
        },
        dashboardListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
);
export const dashboardDetailsReducer = createReducer(
    {},
    {
        dashboardDetailRequest: (state) => {
            state.loading = true;
            state.dashboardDetails = [];
        },
        dashboardDetailSuccess: (state, action) => {
            state.loading = false;
            state.dashboardDetails = action.payload.data;
        },
        dashboardDetailFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
);
export const dashboardInventoryDataReducer = createReducer(
    {},
    {
        dashboardInventoryDataRequest: (state) => {
            state.loading = true;
            state.dashboardInventoryData = [];
        },
        dashboardInventoryDataSuccess: (state, action) => {
            state.loading = false;
            state.dashboardInventoryData = action.payload.data;
        },
        dashboardInventoryDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
);
export const ssDataReducer = createReducer(
    {},
    {
        sSDataRequest: (state) => {
            state.loading = true;
            state.ssData = [];
        },
        sSDataSuccess: (state, action) => {
            state.loading = false;
            state.ssData = action.payload.data;
        },
        sSDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
);


