import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../services/firebase-data.service';
import {DishMenuComponent} from '../dish-menu/dish-menu.component';
import {NgForOf, NgIf} from '@angular/common';
import {CardSliderComponent} from '../card-slider/card-slider.component';

@Component({
  selector: 'app-menu-qr',
  standalone: true,
  imports: [
    DishMenuComponent,
    NgIf,
    NgForOf,
    CardSliderComponent
  ],
  templateUrl: './menu-qr.component.html',
  styleUrl: './menu-qr.component.css'
})
export class MenuQrComponent implements OnInit {
  menuItems: { [category: string]: any[] } = {};
  categoryOrder: string[] = ['Clásicas', 'Bestsellers', 'Gourmet', 'Appetizers', 'Antipasti'];

  constructor(private firebaseDataService: FirebaseDataService) { }

  ngOnInit(): void {
    this.firebaseDataService.getData('menu').then(items => {
      this.menuItems = this.groupByCategory(items);
    });
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
