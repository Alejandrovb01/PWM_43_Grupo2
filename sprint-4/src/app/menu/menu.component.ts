import { Component } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { Observable, map, tap } from 'rxjs';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CardSliderComponent,
    AsyncPipe,
    IonicModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuItems$: Observable<{ [category: string]: any[] }> = this.firebaseDataService.getData('menu').pipe(
    tap(() => this.loading = true),
    map(items => items.filter((item: any) => item.stock)),
    map(items => this.groupByCategory(items)),
    tap(() => this.loading = false)
  );

  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];
  loading: boolean = true;

  constructor(private firebaseDataService: FirebaseDataService) {}

  private groupByCategory(items: any[]): { [category: string]: any[] } {
    return items.reduce((acc: any, item: any) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  }
}
