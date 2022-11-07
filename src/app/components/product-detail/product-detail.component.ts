import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  products: Product[] = [];
  product?: Product;

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private route: ActivatedRoute
  ) {}

  addToCart(product: Product) {
    this._cartService.addItem(product, 1);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    console.log(this.route.title);
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.products = this._productsService.getProducts();
    this.product = this.products.find(
      (product) => product.id === productIdFromRoute
    );
  }
}
