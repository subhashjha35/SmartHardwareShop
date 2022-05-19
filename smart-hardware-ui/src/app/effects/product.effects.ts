import { ProductService } from '../service/products.service';
import {
	searchProducts,
	searchProductsFailure,
	searchProductsSuccess,
} from '../actions/product.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Product } from '../model/product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
	constructor(
		private actions$: Actions,
		private productService: ProductService
	) {}

	searchProducts$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(searchProducts),
			switchMap(action =>
				this.productService.searchProducts(action.searchStr).pipe(
					map((products: Product[]) =>
						searchProductsSuccess({ products })
					),
					catchError(error =>
						of<Action>(searchProductsFailure({ error }))
					)
				)
			)
		)
	);
}
