import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

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

  async getData(collectionName: string): Promise<any[]> {
    if (!this.isConnectedSubject.value) {
      console.error('No se puede obtener datos. No hay conexión con Firebase.');
      return [];
    }
    const data: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, collectionName));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }
}
