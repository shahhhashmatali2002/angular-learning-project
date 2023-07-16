import { createAction, props } from "@ngrx/store";

export const addUserLoginData = createAction('[Login] Login User', props<{item: any}>());
export const removeUserLoginData = createAction('[Login] Remove Login User');