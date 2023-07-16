// cart.reducer.ts
import { createReducer, createSelector, on } from '@ngrx/store';
import { addUserToRegister } from './userRegister.action';

export const initialState: any = {
  items: []
};


export const getUserRegisterItem = (state: any) => state.userRegister.items;

export const userRegisterReducer = createReducer(
  initialState,
  on(addUserToRegister, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
);
