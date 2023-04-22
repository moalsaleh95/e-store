import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/product/cartSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
    }
})