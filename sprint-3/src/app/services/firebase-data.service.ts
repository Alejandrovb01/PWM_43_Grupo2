import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private db: any;
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();

  constructor() {
    try {
      const app = initializeApp(environment.firebaseConfig);
      this.db = getFirestore(app);
      this.isConnectedSubject.next(true);
      console.log('Conexión a Firebase exitosa.');
    } catch (error) {
      console.error('Error al conectar con Firebase:', error);
      this.isConnectedSubject.next(false);
    }
  }

  getData(collectionName: string): Observable<any[]> { // Cambia el tipo de retorno a Observable
    if (!this.isConnectedSubject.value) {
      console.error('No se puede obtener datos. No hay conexión con Firebase.');
      return new Observable<any[]>(subscriber => subscriber.next([])); // Retorna un Observable vacío si no hay conexión
    }
    const collectionRef = collection(this.db, collectionName);
    return collectionData(collectionRef, { idField: 'id' }); // Usa collectionData desde 'rxfire/firestore'
  }

  async addOrder(collectionName: string, orderData: any): Promise<any> {
    if (!this.isConnectedSubject.value) {
      console.error('No se puede enviar la comanda. No hay conexión con Firebase.');
      throw new Error('No hay conexión con Firebase.');
    }
    try {
      const collectionRef = collection(this.db, collectionName);
      const docRef = await addDoc(collectionRef, orderData);
      console.log('Comanda enviada con ID:', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error al añadir la comanda a Firebase:', error);
      throw error;
    }
  }
}
