import {
	searchProducts,
	searchProductsSuccess,
	searchProductsFailure,
} from '../../actions/product.actions';
import * as fromProducts from './products.reducer';

describe('ProductsReducer', () => {
	describe('searchProducts', () => {
		it('should set the loading to true', () => {
			expect(
				fromProducts.reducer(
					{ ...fromProducts.initialState },
					searchProducts({ searchStr: '' })
				)
			).toEqual({
				...fromProducts.initialState,
				isLoading: true,
				isLoaded: false,
			});
		});
	});

	describe('searchProductsSuccess', () => {
		it('should set the load the products in list and set loading to false, loaded to true', () => {
			expect(
				fromProducts.reducer(
					{ ...fromProducts.initialState },
					searchProductsSuccess({
						products: [
							{
								name: 'name',
								id: 1,
								description: 'description',
								defaultImage: '',
								price: 12,
								discount: 10,
								images: [],
							},
						],
					})
				)
			).toEqual({
				...fromProducts.initialState,
				isLoading: false,
				isLoaded: true,
				list: [
					{
						name: 'name',
						id: 1,
						description: 'description',
						defaultImage: '',
						price: 12,
						discount: 10,
						images: [],
					},
				],
			});
		});
	});

	describe('searchProductsFailure', () => {
		it('should set the loading, loaded to false and empty the list', () => {
			expect(
				fromProducts.reducer(
					{ ...fromProducts.initialState },
					searchProductsFailure({ error: 'error' })
				)
			).toEqual({
				...fromProducts.initialState,
				isLoading: false,
				isLoaded: false,
				list: [],
			});
		});
	});
});
