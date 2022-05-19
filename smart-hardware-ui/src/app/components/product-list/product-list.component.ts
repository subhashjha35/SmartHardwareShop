import { getAllProducts } from '../../reducers/product/products.reducer';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
	searchResult$: Observable<Product[]>;

	onDestroyed = new Subject();
	constructor(private store: Store) {}
	ngOnInit(): void {
		this.searchResult$ = this.store
			.select(getAllProducts)
			.pipe(takeUntil(this.onDestroyed));
	}

	ngOnDestroy(): void {
		this.onDestroyed.complete();
	}
}
