import { Product } from 'src/app/model/product';
import {
	searchProducts,
	searchProductsSuccess,
	searchProductsFailure,
} from '../../actions/product.actions';
import {
	Action,
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

export interface ProductState {
	isLoading: boolean;
	isLoaded: boolean;
	list: Product[];
}

export const initialState: ProductState = {
	isLoading: false,
	isLoaded: false,
	list: [],
};

export const productReducer = createReducer(
	initialState,
	on(searchProducts, state => ({
		...state,
		isLoading: true,
		isLoaded: false,
		list: [],
	})),
	on(searchProductsSuccess, (state, action) => ({
		...state,
		isLoading: false,
		isLoaded: true,
		list: action.products,
	})),
	on(searchProductsFailure, state => ({
		...state,
		isLoading: false,
		isLoaded: false,
		list: [],
	}))
);

export function reducer(state = initialState, action: Action): ProductState {
	return productReducer(state, action);
}

export const getProductsState = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
	getProductsState,
	(state: ProductState) => state.list
);

export const areProductsLoading = createSelector(
	getProductsState,
	(state: ProductState): boolean => !!state.isLoading
);

export const areProductsLoaded = createSelector(
	getProductsState,
	(state: ProductState): boolean => !!state.isLoaded
);
