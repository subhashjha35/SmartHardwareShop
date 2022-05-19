import { Cart, CartProduct } from '../model/cart';
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
	'[Cart] Add To Cart',
	props<{ product: CartProduct }>()
);

export const removeFromCart = createAction(
	'[Cart] Remove From Cart',
	props<{ id: number }>()
);

export const addQty = createAction(
	'[Cart] Add Quantity',
	props<{ id: number }>()
);

export const removeQty = createAction(
	'[Cart] Remove Quantity',
	props<{ id: number }>()
);
