import * as productReducer from '../../reducers/product/products.reducer';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { ProductListComponent } from './product-list.component';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
	let spectator: Spectator<ProductListComponent>;
	let component: ProductListComponent;
	const initialState = {
		products: {
			list: [],
			isLoading: false,
			isLoaded: true,
		},
	};
	const createComponent = createComponentFactory({
		component: ProductListComponent,
		providers: [provideMockStore({ initialState })],
	});
	beforeEach(() => {
		// spyOn(productReducer, 'getAllProducts');
		spectator = createComponent();
		component = spectator.component;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set the searchResult', () => {
		component.searchResult$.subscribe(res => {
			expect(res).toEqual([]);
		});
	});
});
