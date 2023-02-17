import { createSlice } from '@reduxjs/toolkit';

const initialState = { isCartVisible: false };

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        toggleCart(state) {
            state.isCartVisible = !state.isCartVisible;
            /* return {
                isCartVisible: !state.isCartVisible
            } */
        }
    }
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;