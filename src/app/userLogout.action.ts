import { createAction, props } from "@ngrx/store";

export const addUserLogoutData = createAction('[Logout] Logout User', props<{item: any}>());
export const updateUserLogoutData = createAction('[Logout] Update Logout User', props<{itemId: any, data: any }>());