import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { DishMenuComponent } from '../dish-menu/dish-menu.component';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { Observable, map, of } from 'rxjs'; // Importa 'of'

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
  menuItems$: Observable<{ [category: string]: any[] }> = of({}); // Inicializar con un Observable que emite un objeto vacío
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];

  constructor(private firebaseDataService: FirebaseDataService) { }

  ngOnInit(): void {
    this.menuItems$ = this.firebaseDataService.getData('menu').pipe(
      map(items => this.groupByCategory(items))
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
