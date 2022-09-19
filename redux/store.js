import { configureStore } from '@reduxjs/toolkit';
import { buyerReducer } from './buyerReducer/reducer';
import { productReducer } from './productReducer/reducer';
import { poDetailReducer, poMasterDataReducer, poReducer } from './purchaseReducer/reducer';
import { sellerReducer } from './sellerReducer/reducer';
import { authReducer, messageReducer } from './userReducer/reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        poList: poReducer,
        poDetail: poDetailReducer,
        sellerList: sellerReducer,
        masterData: poMasterDataReducer,
        buyerData:buyerReducer,
        products:productReducer
    }
})

export default store;