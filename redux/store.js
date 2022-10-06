import { configureStore } from '@reduxjs/toolkit';
import { buyerListReducer, buyerReducer } from './reducers/buyerReducer';
import { allProductReducer, productDetailReducer, productReducer } from './reducers/productReducer';
import { poDetailReducer, poMasterDataReducer, poReducer } from './reducers/purchaseReducer';
import { sellerReducer } from './reducers/sellerReducer';
import { soReducer, soDetailReducer } from './reducers/salesReducer';
import { dashboardListReducer,dashboardDetailsReducer } from './reducers/dashboardReducer';

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
        dashboardList: dashboardListReducer,
        dashboardDetails: dashboardDetailsReducer,
        soDetail: soDetailReducer,
        allProducts:allProductReducer,
        productDetail:productDetailReducer,
        buyerList: buyerListReducer
    }
})

export default store;