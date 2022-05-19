import { Store } from '@ngrx/store';
import { Product } from '../../../model/product';
import { Component, Input } from '@angular/core';
import { addToCart } from 'src/app/actions/cart.actions';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
	@Input() item: Product = {} as any;
	constructor(private store: Store) {}

	addToCart(item: Product) {
		const { id } = item;
		this.store.dispatch(addToCart({ product: { id, quantity: 1 } }));
	}
}
