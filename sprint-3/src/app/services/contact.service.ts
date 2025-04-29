import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc
} from '@angular/fire/firestore';

import { Review } from '../models/review.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  constructor(private firestore: Firestore) { }

  addReview(review: Review) {
    const reviewRef = collection(this.firestore, 'reviews');
    return addDoc(reviewRef, review);
  }

  getReview(): Observable<Review[]> {
    const reviewRef = collection(this.firestore, 'reviews');
    return collectionData(reviewRef, { idField: "id"}) as Observable<Review[]>;
  }
}
