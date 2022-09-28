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

export const allProductReducer = createReducer(
    {},
    {
        allProductRequest: (state) => {
            state.loading = true;
            state.allProductList = {};
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.allProductList = action.payload.data;
        },
        allProductFailure: (state, action) => {
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