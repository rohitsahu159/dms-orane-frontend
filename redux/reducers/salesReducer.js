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

export const salesInvoiveListReducer = createReducer(
    {},
    {
        salesInvoiceRequest: (state) => {
            state.loading = true;
            state.salesInvoiveList = [];
        },
        salesInvoiceSuccess: (state, action) => {
            state.loading = false;
            state.salesInvoiveList = action.payload.data;
        },
        salesInvoiceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

export const siDetailReducer = createReducer(
    {},
    {
        siDetailRequest: (state) => {
            state.loading = true;
            state.siDetail = null;
        },
        siDetailSuccess: (state, action) => {
            state.loading = false;
            state.siDetail = action.payload.data;
        },
        siDetailFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

