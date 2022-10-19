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

export const productDetailReducer = createReducer(
    {},
    {
        productDetailRequest: (state) => {
            state.loading = true;
            state.productDetail = {};
        },
        productDetailSuccess: (state, action) => {
            state.loading = false;
            state.productDetail = action.payload.data;
        },
        productDetailFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

export const productInventoryReducer = createReducer(
    {},
    {
        productInventoryRequest: (state) => {
            state.loading = true;
            state.productInventory = [];
        },
        productInventorySuccess: (state, action) => {
            state.loading = false;
            state.productInventory = action.payload.data;
        },
        productInventoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);