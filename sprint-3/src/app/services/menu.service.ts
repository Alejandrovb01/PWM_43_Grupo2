import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuData: any;

  constructor(private http: HttpClient) { }

  loadMenuData() {
    return this.http.get('assets/menu.json').pipe(
      map(data => {
        this.menuData = data;
        return data;
      })
    );
  }

  getDishById(id: number) {
    if (!this.menuData) return null;

    // Busca en todas las categorías
    for (const category of Object.values(this.menuData.menu)) {
      const dish = (category as any[]).find(item => item.id === id);
      if (dish) return dish;
    }
    return null;
  }

  getAllergenImages(allergens: string[]) {
    // Mapeo de nombres de alérgenos a imágenes
    const allergenMap: {[key: string]: string} = {
      'gluten': 'assets/icons/gluten.png',
      'lacteos': 'assets/icons/lacteos.png',
      'huevo': 'assets/icons/huevo.png',
      'pescado': 'assets/icons/pescado.png'
      // Añade más alérgenos según necesites
    };

    return allergens.map(allergen => ({
      name: allergen,
      image: allergenMap[allergen.toLowerCase()] || 'assets/icons/default-allergen.png'
    }));
  }
}
