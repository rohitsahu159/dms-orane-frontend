import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
    {},
    {
        productRequest: (state) => {
            state.loading = true;
            state.productList = {};
        },
        productSuccess: (state, action) => {
            state.loading = false;
            state.productList = action.payload.data;
        },
        productFailure: (state, action) => {
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