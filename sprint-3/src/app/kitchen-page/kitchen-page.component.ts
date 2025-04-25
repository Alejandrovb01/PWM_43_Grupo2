import { Component, OnInit } from '@angular/core';
import { KitchenService, Order, Dish } from '../services/kitchen.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kitchen-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kitchen-page.component.html',
  styleUrls: ['./kitchen-page.component.css']
})
export class KitchenPageComponent implements OnInit {
  orders$: Observable<Order[]> = of([]);
  orderStatuses = ['Pendiente', 'En Preparación', 'Listo', 'Entregado'];

  menuItems$: Observable<Dish[]> = of([]);
  editingItem: Dish | null = null;
  newItem: Dish = { name: '', description: '', image: '', price: 0, category: '', stock: true };

  showMenuManagement = false;

  constructor(private kitchenService: KitchenService) { }

  ngOnInit(): void {
    this.orders$ = this.kitchenService.getOrders();
    this.menuItems$ = this.kitchenService.getMenuItems();
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.kitchenService.updateOrderStatus(orderId, newStatus);
  }

  toggleMenuManagement() {
    this.showMenuManagement = !this.showMenuManagement;
    this.editingItem = null;
  }

  editItem(item: Dish): void {
    this.editingItem = { ...item };
  }

  saveEdit(): void {
    if (this.editingItem?.id) {
      this.kitchenService.updateMenuItem(this.editingItem.id, this.editingItem).then(() => {
        this.editingItem = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
      this.kitchenService.deleteMenuItem(id);
    }
  }

  addItem(): void {
    this.kitchenService.addMenuItem(this.newItem).then(() => {
      this.newItem = { name: '', description: '', image: '', price: 0, category: '', stock: true };
    });
  }

  updateStock(item: Dish, newStock: boolean): void {
    this.kitchenService.updateMenuItem(item.id!, { ...item, stock: newStock });
  }

  protected readonly HTMLInputElement = HTMLInputElement;
  checked: any;
}
