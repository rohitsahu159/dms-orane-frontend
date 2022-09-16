import { createReducer } from "@reduxjs/toolkit";

export const poReducer = createReducer(
    {},
    {
        purchaseOrderRequest: (state) => {
            state.loading = true;
            state.poList = [];
        },
        purchaseOrderSuccess: (state, action) => {
            state.loading = false;
            state.poList = action.payload.data.purchaseOrder;
        },
        purchaseOrderFailure: (state, action) => {
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

export const poDetailReducer = createReducer(
    {},
    {
        poDetailRequest: (state) => {
            state.loading = true;
            state.poDetail = null;
        },
        poDetailSuccess: (state, action) => {
            state.loading = false;
            state.poDetail = action.payload.data;
        },
        poDetailFailure: (state, action) => {
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