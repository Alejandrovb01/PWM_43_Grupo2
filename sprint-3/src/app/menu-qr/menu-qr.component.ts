import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { DishMenuComponent } from '../dish-menu/dish-menu.component';
import {NgForOf, NgIf, AsyncPipe, DecimalPipe} from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import {Observable, map, tap, of, Subscription, interval, switchMap} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-menu-qr',
  standalone: true,
  imports: [
    DishMenuComponent,
    NgIf,
    NgForOf,
    CardSliderComponent,
    AsyncPipe,
    DecimalPipe
  ],
  templateUrl: './menu-qr.component.html',
  styleUrl: './menu-qr.component.css'
})

export class MenuQrComponent implements OnInit, OnDestroy {
  menuItems$: Observable<{ [category: string]: any[] }> = of({});
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();
  tableNumber: string | null = null;
  cart: CartItem[] = [];
  showCart = false;
  orderSent = false;
  routeSubscription: Subscription | undefined;
  addToCartConfirmation = new BehaviorSubject<string | null>(null);
  addToCartConfirmation$ = this.addToCartConfirmation.asObservable();
  orderStatus$: Observable<any> = of(null);
  remainingTime$: Observable<number> = of(0);
  private orderId: string | null = null;

  constructor(
    private firebaseDataService: FirebaseDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.tableNumber = params['mesa'];
    });

    this.menuItems$ = this.firebaseDataService.getData('menu').pipe(
      tap(() => this.loading.next(true)),
      map(items => items.filter((item: any) => item.stock)),
      map(items => this.groupByCategory(items)),
      tap(() => this.loading.next(false))
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  groupByCategory(items: any[]): { [category: string]: any[] } {
    const grouped: { [category: string]: any[] } = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }

  handleAddToCart(dish: any): void {
    const existingItem = this.cart.find(item => item.id === dish.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ id: dish.id, name: dish.name, price: dish.price, quantity: 1 });
    }
    this.addToCartConfirmation.next(`${dish.name} añadido al carrito`);
    setTimeout(() => this.addToCartConfirmation.next(null), 2000);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    item.quantity = quantity > 0 ? quantity : 0;
    this.cart = this.cart.filter(i => i.quantity > 0);
  }

  removeFromCart(itemId: string): void {
    this.cart = this.cart.filter(item => item.id !== itemId);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  showOrderStatus = false;


  async processOrder(): Promise<void> {
    if (this.cart.length > 0 && this.tableNumber) {
      try {
        const docRef = await this.firebaseDataService.addOrder('orders', {
          table: this.tableNumber,
          items: this.cart,
          status: 'Pendiente',
          timestamp: serverTimestamp()
        });
        this.orderId = docRef.id;
        this.listenToOrderStatus(this.orderId!);
        this.orderSent = true;
        this.showOrderStatus = true;
        this.cart = [];
      } catch (error) {
        console.error('Error al enviar la comanda a Firebase:', error);
        this.orderSent = false;
      }
    } else {
      alert('El carrito está vacío o no se ha detectado el número de mesa.');
    }
  }

  cerrarModal() {
    this.orderSent = false;
    this.showOrderStatus = false;
    this.toggleCart();
  }



  listenToOrderStatus(orderId: string) {
    const orderDoc$ = this.firebaseDataService.getDocObservable('orders', orderId);
    this.orderStatus$ = orderDoc$;

    this.remainingTime$ = interval(1000).pipe( // cada 1 segundo
      switchMap(() => orderDoc$),
      map((order: any) => {
        const startTime = order.timestamp?.toDate().getTime() || Date.now();
        const estimatedMillis = (order.estimatedTime || 0) * 60000;
        const remaining = startTime + estimatedMillis - Date.now();
        return Math.max(remaining, 0);
      })
    );
  }


}
