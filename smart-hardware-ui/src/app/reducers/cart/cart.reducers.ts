import {
	addQty,
	addToCart,
	removeFromCart,
	removeQty,
} from '../../actions/cart.actions';
import { Cart, CartProduct } from '../../model/cart';
import {
	Action,
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

export interface CartState {
	product: CartProduct[];
}

export const initialState: CartState = {
	product: [],
};

export const cartReducer = createReducer(
	initialState,
	on(addToCart, (state, action) => {
		if (
			state.product.find(prod => prod.id === action.product.id) !==
			undefined
		) {
			return reducer(state, addQty({ id: action.product.id }));
		} else {
			return {
				...state,
				product: [...state.product, action.product],
			};
		}
	}),

	on(removeFromCart, (state, action) => ({
		...state,
		product: [...state.product.filter(item => item.id !== action.id)],
	})),
	on(addQty, (state, action) => {
		const id = action.id;
		const item = state.product.find(cart => cart.id === id) as CartProduct;
		const qty = item.quantity + 1;
		const new_item = { ...item, quantity: qty };
		return {
			...state,
			product: [
				...state.product.filter(item => item.id !== action.id),
				new_item,
			],
		};
	}),
	on(removeQty, (state, action) => {
		const id = action.id;
		const item = state.product.find(cart => cart.id === id) as CartProduct;
		const qty = item.quantity - 1;
		const new_item = { ...item, quantity: qty };
		return {
			...state,
			product: [
				...state.product.filter(item => item.id !== action.id),
				new_item,
			],
		};
	})
);

export function reducer(state = initialState, action: Action): CartState {
	return cartReducer(state, action);
}

export const getCartState = createFeatureSelector<CartState>('cart');

export const getAllCartItems = createSelector(
	getCartState,
	(state: CartState) => {
		const product = [...state.product];
		if (product.length > 1) {
			product.sort((a, b) => a.id - b.id);
		}
		return product;
	}
);
