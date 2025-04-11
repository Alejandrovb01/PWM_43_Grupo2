import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-page-no-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-page-no-qr.component.html',
  styleUrls: ['./dish-page-no-qr.component.css']
})
export class DishPageNoQrComponent implements OnInit {
  @Input() dishImage: string = '';
  @Input() dishTitle: string = '';
  @Input() dishPrice: string = '';
  @Input() dishDescription: string = '';

  loading: boolean = true;
  error: string | null = null;
  allergens: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.loadDish(id);
  }

  loadDish(id: number) {
    this.menuService.getDishById(id).subscribe({
      next: (dish) => {
        if (dish) {
          this.dishImage = 'assets/' + dish.imagen;
          this.dishTitle = dish.nombre;
          this.dishPrice = dish.precio;
          this.dishDescription = dish.descripcion;
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
