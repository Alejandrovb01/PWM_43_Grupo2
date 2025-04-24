import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  table: string;
  status: string;
  timestamp: any;
}

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  orders$: Observable<Order[]>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection<Order>('orders', ref => ref.orderBy('timestamp', 'desc'));
    this.orders$ = this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    return this.firestore.doc(`orders/${orderId}`).update({ status: newStatus });
  }
}
