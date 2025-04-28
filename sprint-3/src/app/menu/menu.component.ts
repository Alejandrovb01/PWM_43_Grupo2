import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { DishMenuComponent } from '../dish-menu/dish-menu.component';
import {NgForOf, NgIf, AsyncPipe} from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import {Observable, map, tap, of, Subscription} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu-qr',
  standalone: true,
  imports: [
    DishMenuComponent,
    NgIf,
    NgForOf,
    CardSliderComponent,
    AsyncPipe,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit, OnDestroy {
  menuItems$: Observable<{ [category: string]: any[] }> = of({});
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();
  routeSubscription: Subscription | undefined;

  constructor(
    private firebaseDataService: FirebaseDataService,
  ) { }

  ngOnInit(): void {
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
}
