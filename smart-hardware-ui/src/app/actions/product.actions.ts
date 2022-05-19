import { Product } from '../model/product';
import { createAction, props } from '@ngrx/store';

export const searchProducts = createAction(
	'[Product] Search Products',
	props<{ searchStr: string }>()
);

export const searchProductsSuccess = createAction(
	'[Product] Search Products Success',
	props<{ products: Product[] }>()
);

export const searchProductsFailure = createAction(
	'[Product] Search Products Failure',
	props<{ error: string }>()
);
