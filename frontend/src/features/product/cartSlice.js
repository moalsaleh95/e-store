import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CURRENCIES } from "../../queries/queries";
import { client } from "../../App";

export const fetchCurrencies = createAsyncThunk('cart/fetchCurrencies', async () => {
    const response = await client.query({ query: GET_CURRENCIES });
    return response;
})


export const cartSlice = createSlice({
    name: 'productsAdded',
    initialState: {
        products: [],
        currencies: [],
        selectedCurrencyIndex: 0,
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {

        productAdded(state, action) {
            const { id } = action.payload

            const existingProductIDIndex = state.products.findIndex(item => item.id === id);

            // increment if same id exists
            if (existingProductIDIndex !== -1) {
                // console.log('exists')
                const updatedProduct = {
                    ...state.products[existingProductIDIndex],
                    quantity: state.products[existingProductIDIndex].quantity + 1
                };
                const updatedProducts = [...state.products]
                updatedProducts[existingProductIDIndex] = updatedProduct;
                return { ...state, products: updatedProducts }
            } else {
                // console.log('doesnt exist')
                const newProducts = [...state.products, action.payload];
                return { ...state, products: newProducts }
            }
        },

        increment(state, action) {
            const existingProductIDIndex = state.products.findIndex(item => item.id === action.payload);

            // increment quantity
            const incrementedProduct = {
                ...state.products[existingProductIDIndex],
                quantity: state.products[existingProductIDIndex].quantity + 1
            };
            const updatedProducts = [...state.products]
            updatedProducts[existingProductIDIndex] = incrementedProduct
            return { ...state, products: updatedProducts }
        },

        decrement(state, action) {
            const existingProductIDIndex = state.products.findIndex(item => item.id === action.payload);

            if (state.products[existingProductIDIndex].quantity === 1) {
                // remove product from cart
                let updatedProducts = [...state.products]
                updatedProducts = updatedProducts.filter(item => item.id !== action.payload)
                return { ...state, products: updatedProducts }
            } else {
                // decrement quantity
                const decrementedProduct = {
                    ...state.products[existingProductIDIndex],
                    quantity: state.products[existingProductIDIndex].quantity - 1
                };
                const updatedProducts = [...state.products]
                updatedProducts[existingProductIDIndex] = decrementedProduct
                return { ...state, products: updatedProducts }
            }
        },

        selectCurrency(state, action) {
            // console.log('selectedCurrencyIndex', selectedCurrencyIndex)
            state.selectedCurrencyIndex = action.payload;
        },

        totalQuantity(state, action) {
            state.totalQuantity = action.payload
        },

        totalCost(state, action) {
            // console.log('action.payloadtotalcost:', action.payload)
            // surprisingly this works, however the code below it causes an infinte loop!
            state.totalPrice = action.payload;

            // return {
            //     ...state,
            //     totalPrice: state.totalPrice + action.payload
            // }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload.data.currencies;
            })
    }
})

export const productsAdded = (state) => state.productsAdded;

export const { productAdded, increment, decrement, selectCurrency, totalQuantity, totalCost } = cartSlice.actions;

export default cartSlice.reducer;