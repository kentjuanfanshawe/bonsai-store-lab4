import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { CartItem } from './components/models/cart-item';
import { ShoppingCart } from '../app/components/models/cart';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bonsai-store-lab4';

  public cart!: Observable<ShoppingCart>;
  public cartItems!: CartItem[];
  public itemCount!: number;
  public grossTotal!: number;

  private _cartSubscription!: Subscription;
  private _sumOfProducts!: Subscription;

  public routeFound: boolean = false;
  private _event$;
  private _routes;

  constructor(private _cartService: CartService, private _router: Router) {
    this._routes = this._router.config
      .map((route) => route.path)
      .filter((route) => route != '**');
    // console.log(this._routes);
    this._event$ = this._router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        let url = event.url.split('/')[1];
        console.log(url);
        this._routes.filter((route) => {
          if (route?.split('/')[0] == url) {
            this.routeFound = true;
          }
        });
      }
    });
  }

  public ngOnInit(): void {
    this.cart = this._cartService.get();
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items
        .map((x) => x.quantity)
        .reduce((p, n) => p + n, 0);
    });

    this._sumOfProducts = this.cart.subscribe((cart) => {
      this.grossTotal = cart.items
        .map((x) => x.price)
        .reduce((p, n) => p + n, 0);
      console.log(this.grossTotal);
    });
  }

  public ngOnDestroy(): void {
    if (this._cartSubscription) {
      this._cartSubscription.unsubscribe();
    }

    if (this._sumOfProducts) {
      this._sumOfProducts.unsubscribe();
    }
  }
}
