import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'productsAdded',
    initialState: {
        products: []
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

        }
    }
})

export const productsAdded = (state) => state.productsAdded;

export const { productAdded, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;