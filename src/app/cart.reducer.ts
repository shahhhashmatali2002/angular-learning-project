// cart.reducer.ts
import { createReducer, createSelector, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart } from './cart.actions'
import { userState, CartItem } from './app.state';

export const initialState: any = {
  items: []
};


export const getCartItems = (state: any) => state.cart.items;

export const cartRedcuer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(removeFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item: any) => item['id'] !== itemId)
  })),
  on(clearCart, () => ({
    items: []
  }))
);
