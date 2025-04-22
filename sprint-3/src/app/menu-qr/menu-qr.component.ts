import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { DishMenuComponent } from '../dish-menu/dish-menu.component';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { Observable, map, tap, of } from 'rxjs'; // Asegúrate de importar 'of'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu-qr',
  standalone: true,
  imports: [
    DishMenuComponent,
    NgIf,
    NgForOf,
    CardSliderComponent,
    AsyncPipe
  ],
  templateUrl: './menu-qr.component.html',
  styleUrl: './menu-qr.component.css'
})
export class MenuQrComponent implements OnInit {
  menuItems$: Observable<{ [category: string]: any[] }> = of({}); // Inicialización con 'of({})'
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  constructor(private firebaseDataService: FirebaseDataService) { }

  ngOnInit(): void {
    this.menuItems$ = this.firebaseDataService.getData('menu').pipe(
      tap(() => this.loading.next(true)),
      tap(items => console.log('Datos de Firebase:', items)), // Agrega este log
      map(items => this.groupByCategory(items)),
      tap(() => this.loading.next(false))
    );
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

  protected readonly String = String;
}
