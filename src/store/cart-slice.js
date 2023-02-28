import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [], totalAmount: 0, totalPrice: 0, changed: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // replace cart on fetch Data with fetched data
        replaceCart(state, action) {
            state.products = action.payload.products;
            state.totalAmount = action.payload.totalAmount;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.products.find(item => item.id === newItem.id);

            state.totalAmount = state.totalAmount + 1;
            state.changed = true;

            if(!existingItem) {
                // can use push because of redux-toolkit, otherwise with only redux direct manipulation of existing state is not allowed!
                state.products.push({
                    id: newItem.id,
                    price: newItem.price,
                    amount: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });  
            }
            else {
                existingItem.amount = existingItem.amount + 1;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        
        remoteItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.products.find(item => item.id === id);

            state.totalAmount = state.totalAmount - 1;
            state.changed = true;

            // remove item from cart
            if(existingItem.amount === 1) {
                state.products = state.products.filter(item => item.id !== id);
            }
            // decrease amount in cart by 1, it it's more than 1 product from the same type
            else {
                existingItem.amount = existingItem.amount - 1;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
    
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice;