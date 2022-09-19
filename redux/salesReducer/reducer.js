import { createReducer } from "@reduxjs/toolkit";

export const soReducer = createReducer(
    {},
    {
        salesOrderRequest: (state) => {
            state.loading = true;
            state.soList = [];
        },
        salesOrderSuccess: (state, action) => {
            state.loading = false;
            state.soList = action.payload.data.salesOrder;
        },
        salesOrderFailure: (state, action) => {
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
export const soDetailReducer = createReducer(
    {},
    {
        soDetailRequest: (state) => {
            state.loading = true;
            state.soDetail = null;
        },
        soDetailSuccess: (state, action) => {
            state.loading = false;
            state.soDetail = action.payload.data;
        },
        soDetailFailure: (state, action) => {
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

