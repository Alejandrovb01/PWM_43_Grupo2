import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Order {
  id?: string;
  customerId: string;
  items: { name: string; quantity: number }[];
  status: string;
  table: string;
  timestamp?: any;
}

export interface Dish {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  category: string;
  stock: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class KitchenService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private menuCollection: AngularFirestoreCollection<Dish>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection<Order>('orders');
    this.menuCollection = firestore.collection<Dish>('menu');
  }

  getOrders(): Observable<Order[]> {
    return this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    return this.ordersCollection.doc(orderId).update({ status: newStatus });
  }

  getMenuItems(): Observable<Dish[]> {
    return this.menuCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        id: a.payload.doc.id,
        ...a.payload.doc.data() as Dish
      })))
    );
  }

  addMenuItem(dish: Dish): Promise<DocumentReference<Dish>> {
    return this.menuCollection.add(dish);
  }

  updateMenuItem(id: string, dish: Dish): Promise<void> {
    return this.menuCollection.doc(id).update(dish);
  }

  deleteMenuItem(id: string): Promise<void> {
    return this.menuCollection.doc(id).delete();
  }
}
