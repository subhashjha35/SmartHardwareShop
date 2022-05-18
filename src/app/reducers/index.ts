import { ProductState } from './product/products.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as ProductReducer } from './product/products.reducer';

export interface State {
	products: ProductState;
}

export const reducers: ActionReducerMap<State> = {
	products: ProductReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: [];
