import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../../services/firebase-data.service';
import { NgIf, NgForOf } from '@angular/common';
import { CardSliderComponent } from '../../components/card-slider/card-slider.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CardSliderComponent,
    IonicModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  menuItems: { [category: string]: any[] } = {};
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];
  loading: boolean = true;

  constructor(private firebaseDataService: FirebaseDataService) {}

  ngOnInit(): void {
    this.loading = true;

    this.firebaseDataService.getData('menu').subscribe({
      next: (items: any[]) => {
        this.menuItems = this.groupByCategory(items);
        this.loading = false;
      },
      error: err => {
        console.error('Error al cargar el menú:', err);
        this.loading = false;
      }
    });
  }

  private groupByCategory(items: any[]): { [category: string]: any[] } {
    return items.reduce((acc: any, item: any) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  }
}
