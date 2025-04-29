import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  constructor(private firestore: Firestore) {}

  async getAboutUsData() {
    const aboutUsCollection = collection(this.firestore, 'aboutUs');
    const aboutUsSnapshot = await getDocs(aboutUsCollection);

    const aboutUs_intro: any[] = [];
    const aboutUs_grid: any[] = [];
    const aboutUs_last: any[] = [];

    aboutUsSnapshot.forEach((doc) => {
      const data = doc.data();
      switch (data['category']) {
        case 'aboutUs_intro':
          aboutUs_intro.push(data);
          break;
        case 'aboutUs_grid':
          aboutUs_grid.push(data);
          break;
        case 'aboutUs_last':
          aboutUs_last.push(data);
          break;
      }
    });

    return { aboutUs_intro, aboutUs_grid, aboutUs_last };
  }
}
