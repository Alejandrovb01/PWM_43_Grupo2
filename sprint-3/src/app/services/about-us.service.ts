import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { AboutUsItem } from '../models/about-us.model';
import { Observable, forkJoin, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  constructor(private firestore: Firestore) {}

  getData(): Observable<{
    aboutUs_intro: AboutUsItem[],
    aboutUs_grid: AboutUsItem[],
    aboutUs_last: AboutUsItem[]
  }> {
    const allDocsRef = collection(this.firestore, 'aboutUs');

    return collectionData(allDocsRef, { idField: 'id' }).pipe(
      switchMap((items: any[]) => {
        const storage = getStorage();

        const addImageUrl = (item: any): Observable<AboutUsItem> => {
          const imageRef = ref(storage, `about-us/${item.imagen}`);
          return from(getDownloadURL(imageRef)).pipe(
            map(url => ({ ...item, imagen: url }))
          );
        };

        const grouped = {
          aboutUs_intro: items.filter(i => i.grupo === 'aboutUs_intro'),
          aboutUs_grid: items.filter(i => i.grupo === 'aboutUs_grid'),
          aboutUs_last: items.filter(i => i.grupo === 'aboutUs_last')
        };

        return forkJoin({
          aboutUs_intro: forkJoin(grouped.aboutUs_intro.map(addImageUrl)),
          aboutUs_grid: forkJoin(grouped.aboutUs_grid.map(addImageUrl)),
          aboutUs_last: forkJoin(grouped.aboutUs_last.map(addImageUrl))
        });
      })
    );
  }
}
