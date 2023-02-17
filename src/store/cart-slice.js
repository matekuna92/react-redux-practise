import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [], totalAmount: 0, totalPrice: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.products.find(item => item.id === newItem.id);

            if(!existingItem) {
                // can use push because of redux-toolkit, otherwise with only redux direct manipulation of existing state is not allowed!
                state.items.push({
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
            state.products = state.products.findIndex(action.payload)
        }
    }
});

export default cartSlice;