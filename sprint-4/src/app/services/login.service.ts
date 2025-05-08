import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private firestore: Firestore) {}

  async getUserCredentials() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      return userData;
    } else {
      return null;
    }
  }
}
