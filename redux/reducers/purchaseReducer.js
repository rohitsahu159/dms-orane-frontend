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

export const poMasterDataReducer = createReducer(
    {},
    {
        poMasterDataRequest: (state) => {
            state.loading = true;
            state.masterData = null;
        },
        poMasterDataSuccess: (state, action) => {
            state.loading = false;
            state.masterData = action.payload.data;
        },
        poMasterDataFailure: (state, action) => {
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

export const createPOReducer = createReducer(
    {},
    {
        createPORequest: (state) => {
            state.loading = true;
            state.poList = [];
        },
        createPOSuccess: (state, action) => {
            state.loading = false;
            state.poList = action.payload.data;
        },
        createPOFailure: (state, action) => {
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