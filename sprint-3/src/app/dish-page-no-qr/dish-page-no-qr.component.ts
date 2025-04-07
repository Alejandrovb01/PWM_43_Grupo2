import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-dish-page-no-qr',
  templateUrl: './dish-page-no-qr.component.html',
  styleUrls: ['./dish-page-no-qr.component.css']
})
export class DishPageNoQrComponent implements OnInit {
  dish: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.loadMenuData();
  }

  loadMenuData() {
    this.menuService.loadMenuData().subscribe({
      next: () => {
        const id = +this.route.snapshot.params['id'];
        this.loadDish(id);
      },
      error: (err) => {
        this.error = 'Error al cargar el menú';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadDish(id: number) {
    const dish = this.menuService.getDishById(id);
    if (dish) {
      this.dish = {
        ...dish,
        allergens: this.menuService.getAllergenImages(dish.alergenos || [])
      };
    } else {
      this.error = 'Plato no encontrado';
    }
    this.loading = false;
  }
}
