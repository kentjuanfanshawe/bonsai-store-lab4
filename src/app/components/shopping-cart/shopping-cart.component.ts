import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { platformBrowser } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this._cartService.getItems();
  }
}
