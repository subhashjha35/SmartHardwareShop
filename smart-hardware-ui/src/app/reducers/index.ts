import { Product, CartDetailedProduct } from '../model/product';
import {
	getProductsState,
	ProductState,
	getAllProducts,
} from './product/products.reducer';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as ProductReducer } from './product/products.reducer';
import {
	reducer as CartReducer,
	CartState,
	getCartState,
	getAllCartItems,
} from './cart/cart.reducers';

export interface State {
	products: ProductState;
	cart: CartState;
}

export const reducers: ActionReducerMap<State> = {
	products: ProductReducer,
	cart: CartReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: [];
export const cartDetailedSelector = createSelector(
	getAllCartItems,
	getAllProducts,
	(carts, products): CartDetailedProduct[] => {
		return carts.map(item => ({
			...products.find(prod => prod.id === item.id),
			quantity: item.quantity,
		})) as CartDetailedProduct[];
	}
);
