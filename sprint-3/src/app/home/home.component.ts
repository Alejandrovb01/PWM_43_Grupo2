import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  data: any[] = [];
  isConnected = false;
  private connectionSubscription: Subscription | undefined;

  constructor(private firebaseDataService: FirebaseDataService) { }

  ngOnInit(): void {
    this.connectionSubscription = this.firebaseDataService.isConnected$.subscribe(
      (isConnected) => {
        this.isConnected = isConnected;
        if (isConnected) {
          console.log('Componente conectado a Firebase.');
          this.fetchData('menu');
        } else {
          console.warn('Componente no conectado a Firebase.');
          this.data = [];
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
  }

  async fetchData(collectionName: string): Promise<void> {
    this.data = await this.firebaseDataService.getData(collectionName);
    console.log('Datos obtenidos de Firebase:', this.data);
  }
}
