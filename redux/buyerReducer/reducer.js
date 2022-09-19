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