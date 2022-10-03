import { createReducer } from "@reduxjs/toolkit";

export const buyerReducer = createReducer(
    {},
    {
        buyerByIdRequest: (state) => {
            state.loading = true;
            state.buyerData = {};
        },
        buyerByIdSuccess: (state, action) => {
            state.loading = false;
            state.buyerData = action.payload.data;
        },
        buyerByIdFailure: (state, action) => {
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

export const buyerListReducer = createReducer(
    {},
    {
        buyersRequest: (state) => {
            state.loading = true;
            state.buyerList = [];
        },
        buyersSuccess: (state, action) => {
            state.loading = false;
            state.buyerList = action.payload;
        },
        buyersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);