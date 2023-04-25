import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/product/pdpSlice';
import cartSlice from "../features/product/cartSlice";

export const store = configureStore({
    reducer: {
        pdpProduct: productReducer, cartSlice,
        productsAdded: cartSlice
    }
})