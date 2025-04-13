import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import {Router} from '@angular/router';

interface Dish {
  id: number;
  imagen: string;
  nombre: string;
  precio: string;
  descripcion: string;
  alergenos?: string[];
}

interface MenuData {
  menu: {
    clasicas: Dish[];
    bestsellers: Dish[];
    gourmet: Dish[];
    appetizers: Dish[];
    antipasti: Dish[];
  };
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private menuData$: Observable<MenuData> = this.http.get<MenuData>('assets/data/menu.json').pipe(
    shareReplay(1)
  );

  navigateToDish(id: number): void {
    this.router.navigate(['/dish', id]);
  }


  getPizzas(): Observable<Dish[]> {
    return this.menuData$.pipe(
      map(data => [...data.menu.clasicas, ...data.menu.bestsellers, ...data.menu.gourmet])
    );
  }

  getAppetizers(): Observable<Dish[]> {
    return this.menuData$.pipe(
      map(data => data.menu.appetizers || [])
    );
  }

  getAntipasti(): Observable<Dish[]> {
    return this.menuData$.pipe(
      map(data => data.menu.antipasti || [])
    );
  }

  getAllergenImages(allergens: string[]): { name: string, image: string }[] {
    const allergenMap: Record<string, string> = {
      'gluten': 'gluten.png',
      'lacteos': 'lacteos.png',
      'huevo': 'huevo.png',
      'pescado': 'pescado.png'
    };

    return allergens.map(name => ({
      name,
      image: `assets/${allergenMap[name] || 'unknown.png'}`
    }));
  }

  getDishById(id: number): Observable<any> {
    return this.menuData$.pipe(
      map(data => {
        // Convierte el objeto de categorías en un array plano de platos
        const allDishes = [
          ...data.menu.clasicas,
          ...data.menu.bestsellers,
          ...data.menu.gourmet,
          ...data.menu.appetizers,
          ...data.menu.antipasti
        ];

        // Busca el plato (comparando números si el ID es numérico)
        return allDishes.find(dish =>
          +dish.id === +id // El "+" convierte a número
        ) || null;
      }),
    );
  }
}
