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
    }
);

export const soCreateReducer = createReducer(
    {},
    {
        createSORequest: (state) => {
            state.loading = true;
            state.createSo = {};
        },
        createSOSuccess: (state, action) => {
            state.loading = false;
            state.createSo = action.payload.data;
        },
        createSOFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

