import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dish-menu',
  standalone: true,
  imports: [],
  templateUrl: './dish-menu.component.html',
  styleUrl: './dish-menu.component.css'
})
export class DishMenuComponent {
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() description: string = '';
}
