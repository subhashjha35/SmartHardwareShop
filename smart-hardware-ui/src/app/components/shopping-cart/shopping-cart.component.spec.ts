import { CartDetailedProduct } from 'src/app/model/product';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { addQty, removeQty } from 'src/app/actions/cart.actions';

describe('ShoppingCartComponent', () => {
	let spectator: Spectator<ShoppingCartComponent>;
	let component: ShoppingCartComponent;
	let store: Store;
	const initialState = {
		cart: {
			products: [
				{
					id: 1,
					quantity: 2,
				},
			],
		},
	};
	const createComponent = createComponentFactory({
		component: ShoppingCartComponent,
		providers: [provideMockStore({ initialState })],
	});
	beforeEach(() => {
		spectator = createComponent();
		component = spectator.component;
		store = spectator.inject(Store);
		spyOn(store, 'dispatch');
	});
	afterEach(() => {
		spectator.fixture.destroy();
	});

	describe('addQty', () => {
		it('should dispatch an action', () => {
			const product: CartDetailedProduct = {
				name: 'name',
				id: 1,
				description: 'description',
				defaultImage: '',
				price: 12,
				discount: 10,
				images: [],
				quantity: 1,
			};
			component.addQty(product);

			spectator.detectChanges();

			expect(store.dispatch).toHaveBeenCalledWith(addQty({ id: 1 }));
		});
	});

	describe('removeQty', () => {
		it('should dispatch an action', () => {
			const product: CartDetailedProduct = {
				name: 'name',
				id: 1,
				description: 'description',
				defaultImage: '',
				price: 12,
				discount: 10,
				images: [],
				quantity: 2,
			};
			component.removeQty(product);

			spectator.detectChanges();

			expect(store.dispatch).toHaveBeenCalledWith(removeQty({ id: 1 }));
		});
	});
});
