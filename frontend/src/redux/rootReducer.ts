import { combineReducers } from '@reduxjs/toolkit';
import topSalesReducer from './topSalesSlice';
import catalogReducer from './catalogSlice';
import goodsReducer from './goodsSlice';
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
    topSales: topSalesReducer,
    catalog: catalogReducer,
    goods: goodsReducer,
    cart: cartReducer,
});

export default rootReducer;
