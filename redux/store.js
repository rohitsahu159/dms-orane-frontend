import { configureStore } from '@reduxjs/toolkit';
import { poDetailReducer, poReducer } from './purchaseReducer/reducer';
import { soReducer } from './salesReducer/reducer';

import { authReducer, messageReducer } from './userReducer/reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        poList: poReducer,
        poDetail:poDetailReducer,
        soList:soReducer
    }
})

export default store;