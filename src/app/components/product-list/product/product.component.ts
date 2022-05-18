import { Product } from './../../../model/product';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
	@Input() item: Product = {} as any;
	constructor() {}
}
