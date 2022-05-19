import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
	let spectator: Spectator<ShoppingCartComponent>;
	let component: ShoppingCartComponent;
	const initialState = {
		cart: {
			products: [],
		},
	};
	const createComponent = createComponentFactory({
		component: ShoppingCartComponent,
		providers: [provideMockStore({ initialState })],
	});
	beforeEach(() => {
		spectator = createComponent();
		component = spectator.component;
	});
});
