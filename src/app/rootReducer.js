import { combineReducers } from 'redux';
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
// import productsFilterReducer from "../features/products/productsFilterSlice"

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  // productsFilter: productsFilterReducer,
});

export default rootReducer;