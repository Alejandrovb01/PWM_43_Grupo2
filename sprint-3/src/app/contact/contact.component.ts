import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import { Review } from '../models/review.model';
import { ReviewsService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})

export class ContactComponent implements AfterViewInit {
  reviewForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reviewsService: ReviewsService) {
    this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      review: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    })
  }

  ngAfterViewInit(): void {
    const starContainer = document.getElementById('star-rating');
    const stars = document.querySelectorAll<HTMLSpanElement>('.star');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value') || '0', 10);
        this.reviewForm.get('rating')?.setValue(value);


        stars.forEach(s => {
          if (parseInt(s.getAttribute('data-value') || '0', 10) <= value) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });

      star.addEventListener('mouseover', () => {
        const value = parseInt(star.getAttribute('data-value') || '0', 10);
        stars.forEach(s => {
          s.style.color =
            parseInt(s.getAttribute('data-value') || '0', 10) <= value ? 'gold' : 'grey';
        });
      });

      star.addEventListener('mouseout', () => {
        stars.forEach(s => {
          if (!s.classList.contains('active')) {
            s.style.color = 'grey';
          }
        });
      });
    });
  }

  async sendReview() {
    if (this.reviewForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios correctamente, incluyendo la valoración.');
      return;
    }

    const reviewConFecha = {
      ...this.reviewForm.value,
      date: new Date()
    };

    console.log('Valoración enviada:', reviewConFecha);
    const response = await this.reviewsService.addReview(reviewConFecha);
    console.log(response);

    this.reviewForm.reset();
    const stars = document.querySelectorAll<HTMLSpanElement>('.star');
    stars.forEach(s => {
      s.classList.remove('active');
      s.style.color = 'grey';
    });
  }
}
