import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css'],
})
export class CardSliderComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
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
