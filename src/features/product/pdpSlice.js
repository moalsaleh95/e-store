import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PRODUCT } from '../../queries/queries';
import { client } from "../../App";

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
    const response = await client.query({ query: GET_PRODUCT, variables: { id } });
    return response;
})

export const pdpSlice = createSlice({
    name: 'pdpProduct',

    initialState: {
        product: null,
        isLoading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('action.payload.data.product:',action.payload.data.product)
                state.product = action.payload.data.product;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export const pdpProduct = (state) => state.pdpSlice;

// export const {  } = pdpSlice.actions;

export default pdpSlice.reducer;