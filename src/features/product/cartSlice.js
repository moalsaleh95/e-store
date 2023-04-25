import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'productsAdded',
    initialState: {},
    reducers: {
        productAdded: {
            reducer(state, action) {
                console.log('payload', action.payload)
                console.log('state', state)
                return { ...state, ...action.payload}
            },
            // prepare(id, name, brand, prices, gallery, attributes, quantityAdded, selectedAttribute) {
            //     return {
            //         payload: {
            //             id,
            //             name,
            //             brand,
            //             prices,
            //             gallery,
            //             attributes,
            //             quantityAdded,
            //             selectedAttribute
            //         }
            //     }
            // }
        },
        quantityAdded(state, action) {
            const { id } = action.payload
            const existingProduct = state.find(item => item.id === id)
            if (existingProduct) {
                existingProduct.quantityAdded++
            } else {
                existingProduct.quantityAdded = 1;
            }
        }
    }
})

export const productsAdded = (state) => state.productsAdded;

export const { productAdded, quantityAdded } = cartSlice.actions;

export default cartSlice.reducer;