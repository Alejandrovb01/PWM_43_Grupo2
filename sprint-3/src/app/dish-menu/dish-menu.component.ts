import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dish-menu',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dish-menu.component.html',
  styleUrl: './dish-menu.component.css'
})
export class DishMenuComponent {
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() description: string = '';
  @Input() id!: string;
  @Output() addToCartEvent = new EventEmitter<any>();

  constructor(private router: Router) { }

  navigateToDetail() {
    this.router.navigate(['/dish', this.id], { state: { fromMenuQr: true } });
  }

  get isMenuPage(): boolean {
    return this.router.url === '/menu';
  }

  get showAddButton(): boolean {
    return !this.isMenuPage;
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.addToCartEvent.emit({ id: this.id, name: this.title, price: parseFloat(this.price) });
  }
}
