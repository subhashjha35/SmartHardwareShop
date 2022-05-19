import { searchProducts } from 'src/app/actions/product.actions';
import { takeUntil, Subject, Observable } from 'rxjs';
import {
	areProductsLoading,
	areProductsLoaded,
} from '../../reducers/product/products.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
	constructor(private store: Store) {}
	areProductsLoading$: Observable<boolean>;
	areProductsLoaded$: Observable<boolean>;
	componentDestroyed = new Subject();

	ngOnInit() {
		this.store.dispatch(searchProducts({ searchStr: '' }));
		this.areProductsLoading$ = this.store
			.select(areProductsLoading)
			.pipe(takeUntil(this.componentDestroyed));

		this.areProductsLoaded$ = this.store
			.select(areProductsLoaded)
			.pipe(takeUntil(this.componentDestroyed));
	}

	searchProduct(event: any) {
		if (event.target.value.length >= 3) {
			this.store.dispatch(
				searchProducts({ searchStr: event.target.value })
			);
		}
	}

	ngOnDestroy() {
		this.componentDestroyed.complete();
	}
}
