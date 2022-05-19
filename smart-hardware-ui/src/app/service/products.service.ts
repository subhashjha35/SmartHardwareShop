import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private httpClient: HttpClient) {}

	searchProducts(str: string): Observable<Product[]> {
		return this.httpClient.get<Product[]>('http://localhost:8088/products');
	}
}
