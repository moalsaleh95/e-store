import { configureStore } from "@reduxjs/toolkit";
import pdpSlice from '../features/product/pdpSlice';
import cartSlice from "../features/product/cartSlice";
import plpSlice from "../features/product/plpSlice";

export const store = configureStore({
    reducer: {
        plpProducts: plpSlice,
        pdpProduct: pdpSlice,
        productsAdded: cartSlice
    }
})