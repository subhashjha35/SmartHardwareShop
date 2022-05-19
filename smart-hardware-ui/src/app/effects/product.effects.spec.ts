import { Product } from '../model/product';
import {
	searchProducts,
	searchProductsFailure,
	searchProductsSuccess,
} from '../actions/product.actions';
import { ProductService } from '../service/products.service';
import { SpyObject, mockProvider } from '@ngneat/spectator';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductEffects } from './product.effects';
import { marbles } from 'rxjs-marbles';

describe('ProductEffects', () => {
	let actions$: Observable<any>;
	let effects: ProductEffects;
	let productServiceSpy: SpyObject<ProductService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductEffects,
				provideMockActions(() => actions$),
				mockProvider(ProductService),
			],
		});

		effects = TestBed.inject(ProductEffects);
		productServiceSpy = TestBed.inject(
			ProductService
		) as SpyObject<ProductService>;
	});

	it(
		'should handle search products',
		marbles(async m => {
			actions$ = m.cold('a', {
				a: searchProducts({ searchStr: 'search_str' }),
			});

			const expectedData: Product[] = [
				{
					name: 'prod_name',
					id: 0,
					price: 0,
					discount: 10,
					defaultImage: '',
					images: [],
					description: '',
				},
			];
			productServiceSpy.searchProducts.and.returnValue(
				m.cold('a', { a: expectedData })
			);
			const expected = m.cold('a', {
				a: searchProductsSuccess({
					products: expectedData,
				}),
			});

			await m.expect(effects.searchProducts$).toBeObservable(expected);

			expect(productServiceSpy.searchProducts).toHaveBeenCalledWith(
				'search_str'
			);
		})
	);
	it(
		'should handle search products error',
		marbles(async m => {
			actions$ = m.cold('a', {
				a: searchProducts({ searchStr: 'search_str' }),
			});

			const expectedData: Product[] = [
				{
					name: 'prod_name',
					id: 0,
					price: 0,
					discount: 10,
					defaultImage: '',
					images: [],
					description: '',
				},
			];
			productServiceSpy.searchProducts.and.returnValue(
				m.cold('#', { a: new Error('error') })
			);
			const expected = m.cold('a', {
				a: searchProductsFailure({
					error: 'error',
				}),
			});

			await m.expect(effects.searchProducts$).toBeObservable(expected);

			expect(productServiceSpy.searchProducts).toHaveBeenCalledWith(
				'search_str'
			);
		})
	);
});
