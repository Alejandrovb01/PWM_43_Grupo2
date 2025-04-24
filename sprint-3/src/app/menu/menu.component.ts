import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { Observable } from 'rxjs';
import {DishMenuItemComponent} from '../dish-menu-item/dish-menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CardSliderComponent, DishMenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzas$!: Observable<any>;
  appetizers$!: Observable<any>;
  antipasti$!: Observable<any>;
  loading = true;
  error: string | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    try {
      this.pizzas$ = this.menuService.getPizzas();
      this.appetizers$ = this.menuService.getAppetizers();
      this.antipasti$ = this.menuService.getAntipasti();
      this.loading = false;
    } catch (err) {
      this.error = 'Error al cargar el menú';
      this.loading = false;
      console.error(err);
    }
  }
}
