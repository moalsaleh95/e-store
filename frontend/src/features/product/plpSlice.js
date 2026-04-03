import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CATEGORIES } from '../../queries/queries';
import { client } from "../../App";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await client.query({ query: GET_CATEGORIES });
    return response;
})

export const plpSlice = createSlice({
    name: 'plpProducts',

    initialState: {
        products: null,
        isLoading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export const plpProducts = (state) => state.plpSlice;

// export const {  } = pdpSlice.actions;

export default plpSlice.reducer;