import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {}

  @Input() product: Product | null = null;

  addToCart(product: Product) {
    window.alert('This product has been added to cart!');
    this._cartService.addToCart(product);
  }
}
