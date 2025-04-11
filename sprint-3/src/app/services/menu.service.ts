import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

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
  private menuData$: Observable<MenuData>;

  constructor(private http: HttpClient) {
    this.menuData$ = this.http.get<MenuData>('assets/data/menu.json').pipe(
      shareReplay(1)
    );
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

  getAllergenImages(allergens: string[]): {name: string, image: string}[] {
    const allergenMap: Record<string, string> = {
      'gluten': 'gluten.png',
      'lacteos': 'milk.png',
      'huevo': 'egg.png',
      'pescado': 'fish.png'
    };

    return allergens.map(name => ({
      name,
      image: `assets/${allergenMap[name] || 'unknown.png'}`
    }));
  }

  getDishById(id: number): Observable<Dish | undefined> {
    return this.menuData$.pipe(
      map(data => {
        const allDishes = [
          ...data.menu.clasicas,
          ...data.menu.bestsellers,
          ...data.menu.gourmet,
          ...data.menu.appetizers,
          ...data.menu.antipasti
        ];
        return allDishes.find(dish => dish.id === id);
      })
    );
  }
}
