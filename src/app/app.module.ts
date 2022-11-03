import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductsListComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'product-list', component: ProductsListComponent },
      { path: 'shop', component: ProductsListComponent },
      { path: '', redirectTo: '/about-us', pathMatch: 'full' },
      { path: '404', component: PageNotFoundComponent },
      {
        path: '**',
        component: PageNotFoundComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
