import { configureStore } from '@reduxjs/toolkit';
import { poDetailReducer, poReducer } from './purchaseReducer/reducer';
import { authReducer, messageReducer } from './userReducer/reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        poList: poReducer,
        poDetail:poDetailReducer
    }
})

export default store;