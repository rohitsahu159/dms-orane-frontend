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

        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    }
);