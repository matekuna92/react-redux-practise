import { uiSliceActions } from './ui-slice';
import { cartSliceActions } from './cart-slice';

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
             //   body: JSON.stringify(cart)
                body: JSON.stringify({ products: cart.products, totalAmount: cart.totalAmount, totalPrice: cart.totalPrice })
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

export const fetchCartData = () => {
    // returns a function with dispatch as an argument - action creator thunk
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-redux-319a7-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

            if(!response.ok) {
                throw new Error('Fetching card data failed.');
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            // replace current cart data with fetched items
            dispatch(cartSliceActions.replaceCart(cartData));
        }
        catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching card data failed'
            }));
        }
    }
};

