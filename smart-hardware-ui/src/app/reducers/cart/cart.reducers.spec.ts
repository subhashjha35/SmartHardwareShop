import {
	addQty,
	addToCart,
	removeFromCart,
	removeQty,
} from 'src/app/actions/cart.actions';
import * as fromCart from './cart.reducers';

describe('CartReducers', () => {
	describe('addToCart', () => {
		it('should add the item to cart', () => {
			expect(
				fromCart.reducer(
					{ ...fromCart.initialState },
					addToCart({ product: { id: 1, quantity: 1 } })
				)
			).toEqual({
				...fromCart.initialState,
				product: [
					...fromCart.initialState.product,
					{ id: 1, quantity: 1 },
				],
			});
		});

		it('should increase the qty for already added item', () => {
			expect(
				fromCart.reducer(
					{
						...fromCart.initialState,
						product: [
							...fromCart.initialState.product,
							{ id: 1, quantity: 1 },
						],
					},
					addToCart({ product: { id: 1, quantity: 1 } })
				)
			).toEqual({
				...fromCart.initialState,
				product: [
					...fromCart.initialState.product,
					{ id: 1, quantity: 2 },
				],
			});
		});
	});

	describe('removeFromCart', () => {
		it('should remove the item', () => {
			expect(
				fromCart.reducer(
					{
						...fromCart.initialState,
						product: [
							...fromCart.initialState.product,
							{ id: 1, quantity: 1 },
						],
					},
					removeFromCart({ id: 1 })
				)
			).toEqual({
				...fromCart.initialState,
			});
		});
	});

	describe('addQty', () => {
		it('should decrease the qty for already added item', () => {
			expect(
				fromCart.reducer(
					{
						...fromCart.initialState,
						product: [
							...fromCart.initialState.product,
							{ id: 1, quantity: 3 },
						],
					},
					addQty({ id: 1 })
				)
			).toEqual({
				...fromCart.initialState,
				product: [
					...fromCart.initialState.product,
					{ id: 1, quantity: 4 },
				],
			});
		});
	});
	describe('removeQty', () => {
		it('should decrease the qty for already added item', () => {
			expect(
				fromCart.reducer(
					{
						...fromCart.initialState,
						product: [
							...fromCart.initialState.product,
							{ id: 1, quantity: 3 },
						],
					},
					removeQty({ id: 1 })
				)
			).toEqual({
				...fromCart.initialState,
				product: [
					...fromCart.initialState.product,
					{ id: 1, quantity: 2 },
				],
			});
		});
	});
});
