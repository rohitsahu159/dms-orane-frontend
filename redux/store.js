import { configureStore } from '@reduxjs/toolkit';
import { buyerReducer } from './reducers/buyerReducer';
import { productReducer } from './reducers/productReducer';
import { poDetailReducer, poMasterDataReducer, poReducer } from './reducers/purchaseReducer';
import { sellerReducer } from './reducers/sellerReducer';
import { soReducer, soDetailReducer } from './reducers/salesReducer';
import { authReducer, messageReducer } from './reducers/userReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        poList: poReducer,
        poDetail: poDetailReducer,
        sellerList: sellerReducer,
        masterData: poMasterDataReducer,
        buyerData: buyerReducer,
        products: productReducer,
        soList: soReducer,
        soDetail: soDetailReducer,
    }
})

export default store;