import { cartDetailedSelector } from '../../reducers/index';
import { CartDetailedProduct } from '../../model/product';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, of } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { addQty, removeFromCart, removeQty } from '../../actions/cart.actions';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
	cartDetailedItems$: Observable<CartDetailedProduct[]>;
	totalPrice = 0;
	onDestroyed = new Subject();
	constructor(private store: Store) {}
	ngOnInit(): void {
		this.cartDetailedItems$ = this.store
			.select(cartDetailedSelector)
			.pipe(takeUntil(this.onDestroyed));

		this.cartDetailedItems$.subscribe(items => {
			this.totalPrice = items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		});
	}

	addQty(item: CartDetailedProduct) {
		this.store.dispatch(addQty({ id: item.id }));
	}

	removeQty(item: CartDetailedProduct) {
		if (item.quantity > 1) {
			this.store.dispatch(removeQty({ id: item.id }));
		} else {
			this.store.dispatch(removeFromCart({ id: item.id }));
		}
	}

	removeItem(item: CartDetailedProduct) {
		this.store.dispatch(removeFromCart({ id: item.id }));
	}
	ngOnDestroy(): void {
		this.onDestroyed.complete();
	}
}
