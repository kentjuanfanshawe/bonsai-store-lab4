import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this._productsService.getProducts();
  }
}
