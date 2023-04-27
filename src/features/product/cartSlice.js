import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'productsAdded',
    initialState: {
        products: []
    },
    reducers: {
        // productAdded: {
        //     reducer(state, action) {
        //         console.log('payload', action.payload)
        //         console.log('state', state)
        //         // console.log( 'reducer',{
        //         //     ...state, state: [...state, action.payload]
        //         // })
        //         // NOTE: first check if product id exits in cart. If yes => increase quantity, else add product to cart
        //         return {
        //             ...state, state: [...state, action.payload]
        //         }
        //     },
        //     // prepare(id, name, brand, prices, gallery, attributes, quantityAdded, selectedAttribute) {
        //     //     return {
        //     //         payload: {
        //     //             id,
        //     //             name,
        //     //             brand,
        //     //             prices,
        //     //             gallery,
        //     //             attributes,
        //     //             quantityAdded,
        //     //             selectedAttribute
        //     //         }
        //     //     }
        //     // }
        // },
        productAdded(state, action) {

            console.log('payload', action.payload)
            console.log('state', state)
            // console.log( 'reducer',{
            //     ...state, state: [...state, action.payload]
            // })
            // NOTE: first check if product id exits in cart. If yes => increase quantity, else add product to cart
            const { id } = action.payload
            console.log('id', id)

            // const existingProduct = state.products.entities[id]
            const existingProductIndex  = state.products.findIndex(item => item.id === id)

            if (existingProductIndex !== -1 ) {
                console.log('exists')
                const updatedProduct = {
                    ...state.products[existingProductIndex],
                    quantity: state.products[existingProductIndex].quantity + 1
                };
                const updatedProducts = [...state.products]
                updatedProducts[existingProductIndex] = updatedProduct;
                return { ...state, products: updatedProducts}
            } else {
                console.log('doesnt exist')
                const newProducts = [...state.products, action.payload];
                return { ...state, products: newProducts}
            }
        },
        // quantityAdded(state, action) {
        //     const { id } = action.payload
        //     const existingProduct = state.find(item => item.id === id)
        //     if (existingProduct) {
        //         existingProduct.quantityAdded++
        //     } else {
        //         existingProduct.quantityAdded = 1;
        //     }
        // }
        // ,
    }
})

export const productsAdded = (state) => state.productsAdded;

export const { productAdded, quantityAdded } = cartSlice.actions;

export default cartSlice.reducer;