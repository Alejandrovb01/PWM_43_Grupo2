import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Order} from '../models/order.model';
import {Dish} from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  constructor(private firestore: Firestore) {}

  getOrders(): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }) as Observable<Order[]>;
  }

  updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    return updateDoc(orderDoc, { status: newStatus });
  }

  getMenuItems(): Observable<Dish[]> {
    const menuRef = collection(this.firestore, 'menu');
    return collectionData(menuRef, { idField: 'id' }) as Observable<Dish[]>;
  }

  addMenuItem(dish: Dish): Promise<any> {
    const menuRef = collection(this.firestore, 'menu');
    return addDoc(menuRef, dish);
  }

  updateOrderEstimatedTime(orderId: string, minutes: number): Promise<void> {
    const orderRef = doc(this.firestore, `orders/${orderId}`);
    return updateDoc(orderRef, { estimatedTime: minutes });
  }

  updateMenuItem(id: string, dish: Partial<Dish>): Promise<void> {
    const dishRef = doc(this.firestore, `menu/${id}`);
    return updateDoc(dishRef, dish);
  }

  deleteMenuItem(id: string): Promise<void> {
    const dishRef = doc(this.firestore, `menu/${id}`);
    return deleteDoc(dishRef);
  }

  deleteOrderId(id: string): Promise<void> {
    const orderRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderRef);
  }
}
