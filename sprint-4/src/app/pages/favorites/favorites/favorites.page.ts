import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../../../services/firebase-data.service';
import { FavoritesService } from '../../../services/favorites.service';
import { Dish } from '../../../models/dish.model';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    CurrencyPipe
  ]
})
export class FavoritesPage implements OnInit {
  allDishes: Dish[] = [];
  favoriteIds: string[] = [];

  constructor(
    private firebaseService: FirebaseDataService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
    this.loadDishes();
  }

  async loadFavorites() {
    const favorites = await this.favoritesService.getAllFavorites();
    this.favoriteIds = favorites.map(f => f.id!).filter(id => !!id);
  }

  loadDishes() {
    this.firebaseService.getData('menu').subscribe({
      next: (dishes: Dish[]) => {
        this.allDishes = dishes;
      },
      error: (err) => {
        console.error('Error al cargar los platos:', err);
      }
    });
  }

  get favoriteDishes(): Dish[] {
    return this.allDishes.filter(dish => dish.id && this.favoriteIds.includes(dish.id));
  }

  goToDetail(dishId?: string) {
    if (dishId) {
      this.router.navigate(['/app/dish', dishId]);
    }
  }
}
