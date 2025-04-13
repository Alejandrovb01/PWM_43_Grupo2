import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-page-no-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-page-no-qr.component.html',
  styleUrls: ['./dish-page-no-qr.component.css']
})
export class DishPageNoQrComponent implements OnInit {
  dish: any = null;
  loading = true;
  error: string | null = null;
  allergens: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log('ID recibido:', id);
    this.loadDish(id);
  }

  loadDish(id: number) {
    this.menuService.getDishById(id).subscribe({
      next: (dish) => {
        if (dish) {
          this.dish = {
            ...dish,
            imagePath: 'assets/' + dish.imagen
          };
          this.allergens = this.menuService.getAllergenImages(dish.alergenos || []);
        } else {
          this.error = 'Plato no encontrado';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el plato';
        this.loading = false;
      }
    });
  }
}
