import { ActionReducerMap } from '@ngrx/store';
import { cartRedcuer } from './cart.reducer';
import { userRegisterReducer } from './userRegister.reducer';
import { userLogoutReducer } from './userLogout.reducer';
import { userLoginReducer } from './userLogin.reducer';


export const reducers: ActionReducerMap<any> = {
  cart: cartRedcuer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  userLogin: userLoginReducer 
};