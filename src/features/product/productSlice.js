import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'productsAdded',
    initialState: {},
    reducers: {
        productAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(id, name, brand, prices, gallery, attributes, quantityAdded) {
                return {
                    payload: {
                        id,
                        name,
                        brand,
                        prices,
                        gallery,
                        attributes,
                        quantityAdded
                    }
                }
            }
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

export const { productAdded, quantityAdded } = productSlice.actions;

export default productSlice.reducer;