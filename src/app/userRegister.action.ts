import { createAction, props } from "@ngrx/store";

export const addUserToRegister = createAction('[User] Add User', props<{item: any}>());