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
      const { id, ...data } = this.editingItem;
      this.kitchenService.updateMenuItem(id, data).then(() => {
        this.editingItem = null;
        this.showConfirmation('Plato actualizado con éxito');
      });
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
      this.kitchenService.deleteMenuItem(id);
      this.showConfirmation('Plato eliminado con éxito');
    }
  }

  removeOrder(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta comanda?')) {
      this.kitchenService.deleteOrderId(id);
      this.showConfirmation('Comanda eliminada con éxito');
    }
  }

  updateTime(orderId: string, minutes: number): void {
    this.kitchenService.updateOrderEstimatedTime(orderId, minutes);
  }

  addItem(): void {
    this.kitchenService.addMenuItem(this.newItem).then(() => {
      this.newItem = { name: '', description: '', image: '', price: 0, category: '', stock: true };
      this.showConfirmation('Plato añadido con éxito');
    });
  }

  confirmationMessage: string | null = null;

  private showConfirmation(message: string): void {
    this.confirmationMessage = message;
    setTimeout(() => {
      this.confirmationMessage = null;
    }, 2000);
  }

}
