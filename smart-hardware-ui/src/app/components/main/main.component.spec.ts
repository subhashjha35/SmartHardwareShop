import { provideMockStore } from '@ngrx/store/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';

import { MainComponent } from './main.component';
import { searchProducts } from 'src/app/actions/product.actions';

describe('MainComponent', () => {
	let spectator: Spectator<MainComponent>;
	let component: MainComponent;
	let store: Store;
	const initialState = {
		products: {
			list: [],
			isLoading: false,
			isLoaded: true,
		},
	};
	const createComponent = createComponentFactory({
		component: MainComponent,
		providers: [provideMockStore({ initialState })],
	});

	beforeEach(() => {
		spectator = createComponent();
		component = spectator.component;
		store = spectator.inject(Store);
		spyOn(store, 'dispatch');
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	describe('searchProduct', () => {
		it('should dispatch searchResult Action', () => {
			const mockEvent = {
				target: {
					value: 'dummyText',
				},
			};
			component.searchProduct(mockEvent);
			spectator.detectChanges();

			expect(store.dispatch).toHaveBeenCalledWith(
				searchProducts({ searchStr: 'dummyText' })
			);
		});
	});
});
