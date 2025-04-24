// kitchen-page.component.ts
import { Component, OnInit } from '@angular/core';
import { KitchenService, Order } from '../services/kitchen.service';
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

  constructor(private kitchenService: KitchenService) {
  }

  ngOnInit(): void {
    this.orders$ = this.kitchenService.getOrders();
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.kitchenService.updateOrderStatus(orderId, newStatus);
  }
}
