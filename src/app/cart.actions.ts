import { createAction, props } from "@ngrx/store";
import { CartItem } from "./app.state";

export const addToCart = createAction('[Cart] Add Item', props<{item: any}>());
export const removeFromCart = createAction('[Cart] Remove Item', props<{ itemId: number }>());
export const clearCart = createAction('[Cart] Clear Cart');
