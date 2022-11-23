import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ShoppingCart } from '../components/models/cart';
import { CartItem } from '../components/models/cart-item';
import { Product } from '../components/models/product';
import { ProductsService } from './products.service';
import { LocalStorageService } from './storage.service';

const CART_KEY: string = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _storage: Storage;
  private _subscriptionObservable!: Observable<ShoppingCart>;
  private _subscribers: Array<Observer<ShoppingCart>> = new Array<
    Observer<ShoppingCart>
  >();

  private _products: Product[];
  // TODO: implement storage

  // added totalPrice
  totalPrice!: number;

  constructor(
    private _productService: ProductsService,
    private _storageService: LocalStorageService
  ) {
    this._storage = this._storageService.get();
    this._products = this._productService.getProducts();
    this._subscriptionObservable = new Observable<ShoppingCart>(
      (observer: Observer<ShoppingCart>) => {
        this._subscribers.push(observer);
        observer.next(this.retrieve());
        return () => {
          this._subscribers = this._subscribers.filter(
            (obs) => obs !== observer
          );
        };
      }
    );
  }

  public get(): Observable<ShoppingCart> {
    return this._subscriptionObservable;
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      item.price = product.price;
      cart.items.push(item);
    }
    // add quantity per add to cart
    item.quantity += quantity;

    // remove all the products that have a quantity equal to zero.
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this._storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
      .map(
        (item) =>
          item.quantity *
          this._products.find((p) => p.id === item.productId)!.price
      )
      .reduce((previous, current) => previous + current, 0);
  }

  private save(cart: ShoppingCart): void {
    this._storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this._subscribers.forEach((sub) => {
      try {
        sub.next(cart);
      } catch (e) {
        //
      }
    });
  }

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
