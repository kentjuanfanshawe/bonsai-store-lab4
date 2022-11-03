import { identifierName } from '@angular/compiler';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs';
import { CartItem } from '../components/models/cart-item';
import { Product } from '../components/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _products: Product[] = [];
  totalPrice!: number;

  constructor() {}

  @Output() event = new EventEmitter();

  addToCart(product: Product) {
    let indexCart: number;

    indexCart = this._products.findIndex((p) => p.id === product.id);

    if (indexCart === -1) {
      product.quantity = 1;
      // console.log(indexCart);
      product.totalPrice = product.price;
      this._products.push(product);
    } else {
      // console.log(indexCart);
      this._products[indexCart].quantity += 1;
      this._products[indexCart].totalPrice =
        this._products[indexCart].quantity * product.price;
    }

    // console.log(product);
    // console.log(this._products);
  }

  getTotalPrice(item: number) {
    this._products[item].totalPrice =
      this._products[item].quantity * this._products[item].price;

    return this._products[item].totalPrice;
  }

  getItems() {
    return this._products;
  }

  clearCart() {
    return (this._products = []);
  }
}
