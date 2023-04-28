import { configureStore } from "@reduxjs/toolkit";
import pdpSlice from '../features/product/pdpSlice';
import cartSlice from "../features/product/cartSlice";

export const store = configureStore({
    reducer: {
        pdpProduct: pdpSlice,
        productsAdded: cartSlice
    }
})