import { Component, AfterViewInit } from '@angular/core';
import { Review } from '../models/review.model';
import {ReviewsService} from '../services/contact.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewsService.getReview().subscribe(allReviews => {
      this.reviews = allReviews
        .sort((a, b) => {
          const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
          const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 3);
    });
  }

  /*
  ngAfterViewInit(): void {
    this.loadReviews();
    this.loadMenu();
  }

  private loadTemplate(path: string, containerId: string, callback?: () => void): void {
    fetch(path)
        .then(response => response.text())
        .then(html => {
          const container = document.getElementById(containerId);
          if (container) {
            container.innerHTML = html;
            if (callback) callback();
          }
        });
  }

  private loadReviews(): void {
    fetch('assets/Json/review.json')
        .then(response => response.json())
        .then(data => {
          const reviews = data.reviews;
          reviews.forEach((review: any, index: number) => {
            const containerId = `review${index + 1}`;
            this.loadTemplate('assets/templates/review.html', containerId, () => {
              this.fillReview(containerId, review);
            });
          });
        })
        .catch(error => console.error('Error loading reviews:', error));
  }

  private loadMenu(): void {
    fetch('assets/Json/menu.json')
        .then(response => response.json())
        .then(data => {
          const menu = data.menu;
          const allDishes = [
            ...menu.clasicas,
            ...menu.bestsellers,
            ...menu.gourmet,
            ...menu.appetizers,
            ...menu.antipasti
          ];
          const randomDishes = this.getRandomDishes(allDishes, 3);

          randomDishes.forEach((dish: any, index: number) => {
            const containerId = `item${index + 1}`;
            this.loadTemplate('assets/templates/cardSlider.html', containerId, () => {
              this.fillCard(containerId, dish);
            });
          });
        })
        .catch(error => console.error('Error loading menu:', error));
  }

  private fillReview(containerId: string, review: any): void {
    const container = document.getElementById(containerId);
    if (container) {
      const usernameEl = container.querySelector('.username');
      const textEl = container.querySelector('.review-text');
      const starsContainer = container.querySelector('.stars');

      if (usernameEl) usernameEl.textContent = review.name;
      if (textEl) textEl.textContent = review.description;

      if (starsContainer) {
        starsContainer.innerHTML = '';
        for (let i = 0; i < review.stars; i++) {
          starsContainer.insertAdjacentHTML('beforeend', '&#9733;');
        }
      }
    }
  }

  private fillCard(containerId: string, dish: any): void {
    const container = document.getElementById(containerId);
    if (container) {
      const imageEl = container.querySelector('.card-image') as HTMLImageElement;
      const titleEl = container.querySelector('.card-title');
      const descEl = container.querySelector('.card-description');
      const button = container.querySelector('.button');
      let priceEl = container.querySelector('.price');

      if (imageEl) imageEl.src = `assets/${dish.imagen}`;
      if (titleEl) titleEl.textContent = dish.nombre;
      if (descEl) descEl.textContent = dish.descripcion;
      if (button) button.remove();

      if (!priceEl) {
        priceEl = document.createElement('p');
        priceEl.classList.add('price');
        container.appendChild(priceEl);
      }

      priceEl.textContent = `Precio: ${dish.precio}`;
    }
  }

  private getRandomDishes(dishes: any[], count: number): any[] {
    const shuffled = dishes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  */


}
