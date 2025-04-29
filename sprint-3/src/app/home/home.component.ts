import { Component } from '@angular/core';
import { Review } from '../models/review.model';
import { ReviewsService } from '../services/contact.service';
import { Dish, KitchenService } from '../services/kitchen.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { CardSliderComponent } from '../card-slider/card-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    CardSliderComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  reviews: Review[] = [];
  bestDishes: Dish[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private dishesService: KitchenService
  ) {}

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

    this.dishesService.getMenuItems().subscribe(allMenuItems => {
      const allDishes: Dish[] = Object.values(allMenuItems).flat();
      this.bestDishes = this.getRandomDishes(allDishes, 3);
    });
  }

  private getRandomDishes(dishes: Dish[], count: number): Dish[] {
    const shuffled = [...dishes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
