import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

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
  @Input() id!: number;

  constructor(private router: Router) {
  }

  navigateToDetail() {
    this.router.navigate(['/dish', this.id]);
  }

}
