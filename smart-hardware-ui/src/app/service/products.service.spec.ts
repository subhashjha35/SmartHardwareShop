import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
	createHttpFactory,
	HttpMethod,
	SpectatorHttp,
} from '@ngneat/spectator';
import { ProductService } from './products.service';

describe('ProductsService', () => {
	let spectator: SpectatorHttp<ProductService>;
	let service: ProductService;

	const createHttp = createHttpFactory<ProductService>({
		service: ProductService,
		imports: [HttpClientTestingModule],
	});

	beforeEach(() => {
		spectator = createHttp();

		service = spectator.service;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('searchProducts', () => {
		it('should call the right endpoint for updating Azure Encryption Resources', () => {
			service.searchProducts('some_text').subscribe();

			const req = spectator.expectOne(
				'http://localhost:8088/products',
				HttpMethod.GET
			);
			expect(req.request.body).toEqual(null);
		});
	});
});
