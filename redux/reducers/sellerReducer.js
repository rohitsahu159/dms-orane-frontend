import { createReducer } from "@reduxjs/toolkit";

export const sellerReducer = createReducer(
    {},
    {
        sellerRequest: (state) => {
            state.loading = true;
            state.sellerList = [];
        },
        sellerSuccess: (state, action) => {
            state.loading = false;
            state.sellerList = action.payload;
        },
        sellerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

export const sellerByIdReducer = createReducer(
    {},
    {
        sellerByIdRequest: (state) => {
            state.loading = true;
            state.seller = {};
        },
        sellerByIdSuccess: (state, action) => {
            state.loading = false;
            state.seller = action.payload;
        },
        sellerByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);