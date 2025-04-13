import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dish-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-menu-item.component.html',
  styleUrls: ['./dish-menu-item.component.css']
})
export class DishMenuItemComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() price!: string;


  constructor(private router: Router) {}

  navigateToDetail() {
    this.router.navigate(['/dish', this.id]);
  }

}
