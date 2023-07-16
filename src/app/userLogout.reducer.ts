// cart.reducer.ts
import { createReducer, createSelector, on } from '@ngrx/store';
import { addUserLogoutData, updateUserLogoutData } from './userLogout.action';

export const initialState: any = {
  items: []
};


export const getUserLogoutItem = (state: any) => state.userLogout.items;

export const userLogoutReducer = createReducer(
  initialState,
  on(addUserLogoutData, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(updateUserLogoutData, (state, { itemId, data }) => ({
    ...state,
    items: state.items.map((item: any) => {
      if (item.user.id === itemId) {
        return { ...item, data };
      }
      return item;
    })

  })),
);
