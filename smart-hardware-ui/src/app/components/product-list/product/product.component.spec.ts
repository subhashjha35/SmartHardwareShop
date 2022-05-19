import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductState } from 'src/app/reducers/product/products.reducer';
import { State } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { addToCart } from 'src/app/actions/cart.actions';

describe('ProductComponent', () => {
	let spectator: Spectator<ProductComponent>;
	let component: ProductComponent;
	let store: Store;
	const initialState: State = {
		products: {
			isLoading: false,
			isLoaded: true,
			list: [],
		},
		cart: {
			product: [],
		},
	};
	const createComponent = createComponentFactory({
		component: ProductComponent,
		providers: [provideMockStore({ initialState })],
	});
	beforeEach(() => {
		spectator = createComponent();
		component = spectator.component;
		store = spectator.inject(Store);
		spyOn(store, 'dispatch');
	});

	it('should dispatch addToCart action', () => {
		const item = {
			name: 'name',
			id: 1,
			description: 'description',
			defaultImage: '',
			price: 12,
			discount: 10,
			images: [],
		};
		component.addToCart(item);

		spectator.detectChanges();

		expect(store.dispatch).toHaveBeenCalledWith(
			addToCart({ product: { id: 1, quantity: 1 } })
		);
	});
});
