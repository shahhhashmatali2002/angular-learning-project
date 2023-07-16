// cart.reducer.ts
import { createReducer, createSelector, on } from '@ngrx/store';
import { addUserLogoutData, updateUserLogoutData } from './userLogout.action';
import { addUserLoginData, removeUserLoginData } from './userLogin.action';

export const initialState: any = {
  items: []
};


export const getUserLoginItem = (state: any) => state.userLogin.items;

export const userLoginReducer = createReducer(
  initialState,
  on(addUserLoginData, (state, { item }) => ({
    items: [item]
  })),
  on(removeUserLoginData, () => ({
    items: []
  })),
);
