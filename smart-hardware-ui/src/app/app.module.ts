import { productReducer } from './reducers/product/products.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product-list/product/product.component';
import { BannerComponent } from './components/banner/banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainComponent } from './components/main/main.component';
import { ProductEffects } from './effects/product.effects';
import { HttpClientModule } from '@angular/common/http';
import { CartEffects } from './effects/cart.effects';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ShoppingCartComponent,
		ProductListComponent,
		ProductComponent,
		BannerComponent,
		MainComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatCardModule,
		MatIconModule,
		MatProgressSpinnerModule,
		FlexLayoutModule,
		HttpClientModule,
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictActionTypeUniqueness: true,
			},
		}),
		StoreModule.forFeature('products', productReducer),
		EffectsModule.forRoot([ProductEffects, CartEffects]),
		environment.production
			? []
			: StoreDevtoolsModule.instrument({
					maxAge: 25, //  Retains last 25 states
			  }),
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
