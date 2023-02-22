import { createSlice } from '@reduxjs/toolkit';
import { uiSliceActions } from './ui-slice';

const initialState = { products: [], totalAmount: 0, totalPrice: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.products.find(item => item.id === newItem.id);

            state.totalAmount = state.totalAmount + 1;

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

// action creator thunk - managing http request in a function instead of using useEffect in App.js
// thunk - a function which delays an action until later, until something else finishes
// doesnt return the action itself, but another function which returns the action
export const sendCartData = (cart) => {
    return async dispatch => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending card data'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-redux-319a7-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if(!response.ok) {
                throw new Error('Sending card data failed.');
            }
        };

        // handling errors
        try {
            await sendRequest();

            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent card data successfully'
            }));
        } catch(error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending card data failed'
            }));
        }
    };
};

export const cartSliceActions = cartSlice.actions;
export default cartSlice;